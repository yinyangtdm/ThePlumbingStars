import Image from "next/image";
import type { ServiceImage } from "@/lib/serviceImages";

export function ServiceHeroImage({ image }: { image: ServiceImage }) {
  return (
    <div className="relative aspect-[4/3] w-full max-w-xl mx-auto lg:mx-0 lg:max-w-none rounded-lg overflow-hidden shadow-xl ring-1 ring-white/10">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 480px"
        priority
      />
    </div>
  );
}

export function ServiceExtraImages({ images }: { images: ServiceImage[] }) {
  if (images.length === 0) return null;

  return (
    <section className="py-10 px-4 sm:px-6 bg-white border-b border-gray-100">
      <div
        className={`max-w-4xl mx-auto grid gap-4 ${images.length > 1 ? "sm:grid-cols-2" : ""}`}
      >
        {images.map((image) => (
          <div
            key={image.src}
            className="relative aspect-[16/10] w-full rounded-lg overflow-hidden shadow-md"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 560px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
