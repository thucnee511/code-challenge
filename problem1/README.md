# Problem 1 — sum_to_n functions

This file documents the three implementations of the same problem located in `problem1/index.js`:

- `sum_to_n_a(n)` — arithmetic formula (constant time)
- `sum_to_n_b(n)` — recursive implementation
- `sum_to_n_c(n)` — iterative loop

All three compute the sum of integers from 1 to `n` (inclusive). Examples: `sum_to_n(3) -> 6`, `sum_to_n(5) -> 15`.

## Function contracts

- Input: `n` — expected a non-negative integer (JavaScript `Number`).
- Output: the numeric sum of integers from 1 to `n`. For `n === 0`, returns `0`.

If `n` is not a non-negative integer (negative, non-integer, or non-number), the behavior follows JavaScript semantics for arithmetic and loops — consider validating inputs before calling in production code.

## Implementations

### sum_to_n_a(n)

Source: arithmetic closed-form formula:

```js
var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};
```

- Description: Uses the Gauss formula for the sum of the first `n` natural numbers.
- Time complexity: O(1)
- Space complexity: O(1)
- Pros: Fast and safe for large `n` within numeric limits.
- Cons: If `n` is not an integer, it returns the algebraic expression (e.g. `n = 3.5` produces 7). If `n` is extremely large, floating-point precision may cause issues.

### sum_to_n_b(n)

Source: simple recursion:

```js
var sum_to_n_b = function (n) {
  return n === 0 ? 0 : n + sum_to_n_b(n - 1);
};
```

- Description: Recursively reduces `n` until base case `0`.
- Time complexity: O(n) — each call reduces `n` by 1.
- Space complexity: O(n) — recursion depth uses the call stack.
- Pros: Clear and idiomatic recursion for teaching/illustration.
- Cons: May cause a stack overflow for large `n` (call depth equals `n`). Slower than the formula and loop versions due to function call overhead.

### sum_to_n_c(n)

Source: iterative loop:

```js
var sum_to_n_c = function (n) {
  var sum = 0;
  for (var i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
```

- Description: Iteratively accumulates the sum in a loop.
- Time complexity: O(n)
- Space complexity: O(1)
- Pros: Safe from recursion depth problems and straightforward. Good performance for moderate `n`.
- Cons: Slower than the closed-form formula for large `n` because it does O(n) additions.

## Examples

```js
sum_to_n_a(5); // 15
sum_to_n_b(5); // 15
sum_to_n_c(5); // 15

sum_to_n_a(0); // 0
sum_to_n_b(0); // 0
sum_to_n_c(0); // 0
```

## Edge cases and recommendations

- Negative `n`: None of the functions explicitly handle negative values. Behavior will differ:
  - `sum_to_n_a(-3)` returns `(-3 * -2)/2 = 3` (mathematical value, but probably unexpected).
  - `sum_to_n_b(-1)` results in infinite recursion (never reaches base case) and will eventually throw a RangeError (call stack overflow).
  - `sum_to_n_c(-1)` the loop doesn't run and returns `0`.

- Non-integer `n`: `sum_to_n_a` will compute a fractional algebraic result; `sum_to_n_b` and `sum_to_n_c` will behave according to loop/recursion semantics (may loop many times or produce unexpected behavior). Prefer validating `n` with `Number.isInteger(n) && n >= 0`.

### Recommended production-safe wrapper

If you plan to use these functions in production, validate input first and prefer the closed-form `sum_to_n_a` for performance:

```js
function sumToN(n) {
  if (!Number.isInteger(n) || n < 0) throw new TypeError('n must be a non-negative integer');
  return (n * (n + 1)) / 2;
}
```

## Tests

Add a few unit tests to cover:

- `n = 0`
- small positive integers (1..10)
- large integer (e.g., 100000) to compare performance/behavior
- invalid inputs (negative numbers, non-integers, non-number types)

Example (Node + assert):

```js
const assert = require('assert');
assert.strictEqual(sum_to_n_a(5), 15);
assert.strictEqual(sum_to_n_b(5), 15);
assert.strictEqual(sum_to_n_c(5), 15);
```
