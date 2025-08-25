// Hero.jsx
import Image from "next/image";
import NavBar from "./NavBar";
import Menu from "./Menu";

export default function Hero({
  title = "زندگی‌نامه",
  imageSrc = "/life-image.jpg",
  imageAlt = "همایون در صحنه",
  showScroll = true,              // ⬅️ جدید: نمایش/عدم‌نمایش راهنمای اسکرول
  scrollHref = "#intro",          // ⬅️ جدید: مقصد لینک اسکرول
  scrollText = "اسکرول کنید",     // ⬅️ جدید: متن لینک
}) {
  return (
    <section className="relative w-screen h-[170svh] md:h-[190svh]">
      <div className="sticky top-0 h-dvh w-screen overflow-hidden">
        <NavBar />

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[40%_center] grayscale-[20%]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <Menu />

        {/* تیتر پایین */}
        <div className="absolute inset-x-0 bottom-16 z-20">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-left text-[26px] md:text-[48px] font-extralight tracking-[0.1em] text-white mb-2">
              {title}
            </h1>
          </div>
        </div>

        {/* راهنمای اسکرول (شرطی) */}
        {showScroll && (
          <div className="absolute bottom-6 inset-x-0 z-20">
            <div className="mx-auto max-w-6xl px-6">
              <div className="flex justify-center">
                <a
                  href={scrollHref}
                  className="group inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white"
                  aria-label={scrollText}
                >
                  {scrollText}
                  <span className="block h-4 w-px bg-slate-400 group-hover:h-6 transition-all" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
