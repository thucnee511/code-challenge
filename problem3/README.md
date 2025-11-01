# Code Review — Computational Inefficiencies and Anti-Patterns

## Problems & Inefficiencies

### 1. Redundant Filtering + Incorrect Logic
```ts
balances.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {  // lhsPriority is undefined
     if (balance.amount <= 0) {
       return true;
     }
  }
  return false
})
```

**Issues:**
- Uses an undefined variable `lhsPriority` instead of `balancePriority`.
- The logic is reversed: it *keeps* balances with `amount <= 0` instead of *excluding* them.
- The filter always recomputes `getPriority` even though it’s recomputed again in the sort step.

**Fix:**
Filter should:
- Exclude invalid balances (≤ 0).
- Compute priority once efficiently.

---

### 2. Repeated expensive `getPriority` calls
`getPriority` is called multiple times during filtering and sorting.  
This means **O(n log n)** sorting becomes **O(n log n × 2)** extra work.

**Fix:**
Precompute and cache priorities before sorting (e.g. via `map` or `useMemo`).

---

### 3. `useMemo` dependency misuse
```ts
useMemo(() => { ... }, [balances, prices]);
```
- `prices` isn’t used inside the memo’s computation, so it **causes unnecessary recalculation**.
- `balances` might not be memoized itself, so this memo is ineffective.

**Fix:** Only depend on `balances`.

---

### 4. Type errors and inconsistent interfaces
- `WalletBalance` doesn’t have a `blockchain` field, but it’s referenced repeatedly.
- `formattedBalances` is typed implicitly and never used in rendering.
- `rows` expects `FormattedWalletBalance`, but it maps `sortedBalances` instead of `formattedBalances`.

**Fix:**
Add the `blockchain` property in the interface and maintain consistent mapping types.

---

### 5. Unstable keys in list rendering
```tsx
key={index}
```
- Using array index as key can cause React reconciliation inefficiency when list order changes (e.g., sorting).

**Fix:**
Use a stable unique identifier, such as `currency` or `blockchain`.

---

### 6. Formatting logic inefficiency
```ts
formatted: balance.amount.toFixed()
```
- `.toFixed()` without an argument defaults to 0 decimals — likely unintended.
- This conversion happens every render; should be memoized or formatted only once.

---

### 7. Excessive mapping
Balances are mapped multiple times:
1. filter/sort (`sortedBalances`)
2. format (`formattedBalances`)
3. render (`rows`)

Each pass loops the full array — that’s **3× O(n)** passes.

**Fix:** Combine transformations into a single `.map()` inside `useMemo`.

---

### 8. Inline function definitions causing unnecessary re-renders
`getPriority` is defined inside the component — it’s redefined on every render.

**Fix:** Either:
- Define it outside the component, or
- Wrap with `useCallback`.

---

## Refactored Version

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis': return 100;
    case 'Ethereum': return 50;
    case 'Arbitrum': return 30;
    case 'Zilliqa':
    case 'Neo': return 20;
    default: return -99;
  }
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter(b => b.amount > 0 && getPriority(b.blockchain) > -99)
      .map(b => ({
        ...b,
        formatted: b.amount.toFixed(2),
        priority: getPriority(b.blockchain),
      }))
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            key={balance.currency}
            className={classes.row}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      })}
    </div>
  );
};
```

---

## Summary of Improvements

| Issue | Fix |
|-------|-----|
| Redundant filter/sort passes | Combined into one memoized pipeline |
| Undefined variable (`lhsPriority`) | Corrected and simplified |
| Unused dependency in `useMemo` | Removed unnecessary dependencies |
| Inline function redefinitions | Moved `getPriority` outside component |
| Multiple `.map()` passes | Reduced to a single transformation |
| Unstable React keys | Replaced `index` with stable identifier |
| Inconsistent types | Unified interfaces with `blockchain` |
| Inefficient formatting | Added `.toFixed(2)` and memoized |
