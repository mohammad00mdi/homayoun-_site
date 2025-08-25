// MenuImage.jsx
"use client";

import Image from "next/image";

export default function MenuImage({
  src = "/menu-photo.png",
  alt = "menu background",
  onClose,
}) {
  return (
    <div className="relative order-1 md:order-1">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover object-center"
      />

      {/* دکمه بستن – موبایل: بالا-راست | دسکتاپ: وسطِ عمودیِ لبهٔ راست */}
        <button
        aria-label="بستن"
        title="بستن"
        onClick={onClose}
        className={[
            "group absolute flex items-center gap-3 flex-row-reverse",
            "top-10 right-6",
            "md:right-12 md:top-[75%] md:-translate-y-1/2",
            "p-3 -m-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
            "text-white/80 hover:text-white transition"
        ].join(" ")}
        >

        {/* آیکن X */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          className="opacity-80 group-hover:opacity-100 shrink-0"
        >
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* متن «بستن منو» — کنار آیکن، فقط روی دسکتاپ نمایش داده شود */}
        <span className="hidden md:inline-block text-[12px] leading-5 opacity-70 group-hover:opacity-100 select-none">
          بستن منو
        </span>
      </button>
    </div>
  );
}
