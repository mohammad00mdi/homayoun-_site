import Image from "next/image";

const photos = [
  "/images/icons/facebook-icon.png",
  "/images/icons/instagram-icon.png",
  "/images/icons/twiter-icon.png",

];

export default function PhotoStrip() {
  return (
    <section className="py-12 md:py-20 border-y border-white/10 bg-black/20">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map((src, i) => (
          <div key={i} className="aspect-[4/5] overflow-hidden bg-white/5">
            <Image
              src={src}
              alt={`photo ${i + 1}`}
              width={600}
              height={750}
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
