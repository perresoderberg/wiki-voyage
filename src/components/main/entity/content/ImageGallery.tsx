import { useRef } from "react";
import type { CommonsSearchResult } from "../../../../types/commons";

export function ImageGallery({
  images,
}: {
  images: CommonsSearchResult | null;
}) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  function stopScrolling() {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }

  function startScrolling(direction: "left" | "right") {
    stopScrolling();

    function scroll() {
      if (!galleryRef.current) return;

      const amount = direction === "left" ? -10 : 10;

      galleryRef.current.scrollLeft += amount;

      animationRef.current = requestAnimationFrame(scroll);
    }

    animationRef.current = requestAnimationFrame(scroll);
  }

  if (!images || images.images.length === 0) {
    return <div>No images were found.</div>;
  }

  return (
    <div className="flex items-stretch gap-2">
      {/* Left hover area */}
      <div
        className="flex w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-100 hover:bg-sky-100"
        onMouseEnter={() => startScrolling("left")}
        onMouseLeave={stopScrolling}
      >
        <span className="text-2xl">‹</span>
      </div>

      {/* Image row */}
      <div
        ref={galleryRef}
        className="flex min-w-0 gap-4 overflow-x-auto items-center bg-gray-100"
      >
        {images.images.map((image) => (
          <article
            key={image.title}
            className="w-64 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-white transition-transform hover:scale-110"
          >
            <a
              href={image.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-700 hover:underline"
            >
              <img
                src={image.thumbnailUrl ?? image.imageUrl}
                alt={image.title}
                className="h-auto w-full "
              />
            </a>
          </article>
        ))}
      </div>

      {/* Right hover area */}
      <div
        className="flex w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-gray-100 hover:bg-sky-100"
        onMouseEnter={() => startScrolling("right")}
        onMouseLeave={stopScrolling}
      >
        <span className="text-2xl">›</span>
      </div>
    </div>
  );
}
