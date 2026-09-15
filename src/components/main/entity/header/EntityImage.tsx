export function EntityImage({
  entity,
  imageUrl,
}: {
  entity: string;
  imageUrl: string;
}) {
  return (
    <img
      className="w-[30%] shrink-0 h-auto self-start rounded border"
      src={imageUrl}
      alt={entity}
    />
  );
}
