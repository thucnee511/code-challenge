interface Props {
  src: string;
  alt: string;
}

export const Image = ({ src, alt }: Props) => {
  return (
    <div className="block size-full overflow-hidden bg-gray-200">
      <img className="size-full object-cover" src={src} alt={alt} />
    </div>
  );
};
