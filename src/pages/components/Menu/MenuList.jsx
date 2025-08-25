// MenuList.jsx
"use client";

import Link from "next/link";

export default function MenuList({ items, close, firstLinkRef, pathname }) {
  const cleanPath = (p) => (p || "").replace(/\/$/, "");

  return (
    <nav aria-label="Main" className="w-full max-w-xl px-10 md:px-16">
      {/* لیست + لیبل عمودی زیر آخرین آیتم */}
      <div className="relative">
        <ul className="flex flex-col gap-8 md:gap-10 text-right">
          {items.map((item, idx) => {
            const isActive = cleanPath(pathname) === cleanPath(item.href);
            const showNumber = item.no && item.badge !== false;

            return (
              <li key={item.href} className={`relative ${showNumber ? "pr-10" : "pr-0"}`}>
                {/* ستون اعداد بدون دایره */}
                {showNumber && (
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-xs opacity-60 tabular-nums"
                  >
                    {item.no}
                  </span>
                )}

                {/* دش تزئینی سمت چپ هر ردیف */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-px bg-white/20" />

                <Link
                  href={item.href}
                  onClick={close}
                  ref={idx === 0 ? firstLinkRef : null}
                  className={[
                    "menu-link inline-block outline-none transition-opacity",
                    "hover:opacity-80 focus:opacity-100 focus:ring-2 focus:ring-white/30",
                    isActive ? "rounded-[3px] ring-1 ring-white/60 px-2 py-0.5" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* لیبل عمودی "فصل" — دقیقاً زیر «تماس با ما» */}
        <span
          className="
            pointer-events-none absolute hidden md:block
            right-2 -bottom-6
            origin-right -rotate-90
            text-[11px] leading-4 opacity-60 tracking-widest
          "
        >
          فصل
        </span>
      </div>
    </nav>
  );
}
