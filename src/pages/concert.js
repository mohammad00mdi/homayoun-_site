"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./components/Logo";
import { useRouter } from "next/navigation";
import Menu from "./components/Menu";

export default function ConcertsPage() {
  const sectionRefs = useRef([]);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState("left");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path, direction = "left") => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  // تابع برای باز کردن منو
  const openMenu = () => {
    setIsMenuOpen(true);
  };

  // تابع برای بستن منو
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // تنظیم ref برای هر سکشن
  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  // اسکرول به سکشن خاص
  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);

      // کاهش opacity با اسکرول به سکشن‌های بعدی
      const newOpacity = Math.max(0, 1 - index * 0.3);
      setBackgroundOpacity(newOpacity);
    }
  };

  // هندل کردن اسکرول موس و کیبورد
  useEffect(() => {
    const handleWheel = (e) => {
      if (isMenuOpen) return; // اگر منو باز است، اسکرول کار نکند

      if (e.deltaY > 50 && currentSection < sectionRefs.current.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < -50 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e) => {
      if (isMenuOpen) return; // اگر منو باز است، کلیدها کار نکنند

      if (
        e.key === "ArrowDown" &&
        currentSection < sectionRefs.current.length - 1
      ) {
        e.preventDefault();
        scrollToSection(currentSection + 1);
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        e.preventDefault();
        scrollToSection(currentSection - 1);
      } else if (e.key === "Escape" && isMenuOpen) {
        // با کلید ESC منو بسته شود
        closeMenu();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSection, isMenuOpen]);

  // داده‌های کنسرت‌ها
  const concertsData = [
    {
      year: "1991-1998",
      image: "/Rectangle 2 (1).png",
      description:
        "Berlin, London, Los Angeles, Düsseldorf, Oslo, Denmark, Frankfurt, Cologne, Berkeley, Stanford, Vancouver, Paris, Toronto, Rome, Vienna, Portland, Atlanta, New York, Washington, Chicago, Tehran",
      alignment: "end",
    },
    {
      year: "2008",
      image: "/Rectangle 2.png",
      description: "",
      alignment: "start",
    },
    {
      year: "2009",
      image: "/Rectangle 2 (1).png",
      description:
        "Berlin, London, Los Angeles, Düsseldorf, Oslo, Denmark, Frankfurt, Cologne, Berkeley, Stanford, Vancouver, Paris, Toronto, Rome, Vienna, Portland, Atlanta, New York, Washington, Chicago, Tehran",
      alignment: "end",
    },
    {
      year: "2010",
      image: "/Rectangle 2.png",
      description: "",
      alignment: "start",
    },
  ];

  // Variants برای انیمیشن خروج
  const exitVariants = {
    left: { x: "-100%", opacity: 0 },
    right: { x: "100%", opacity: 0 },
    up: { y: "-100%", opacity: 0 },
    down: { y: "100%", opacity: 0 },
  };

  // Variants برای انیمیشن منو
  const menuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  // Variants برای انیمیشن آیتم‌های منو
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // داده‌های منو
  const menuItems = [
    { title: "Home", path: "/", direction: "right" },
    { title: "Concerts", path: "/concert", direction: "right" },
    { title: "Biography", path: "/life", direction: "right" },
    // { title: "Discography", path: "/discography", direction: "right" },
  ];

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning ? (
        <motion.div
          key="concerts-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={exitVariants[transitionDirection]}
          transition={{
            duration: 1,
            ease: [0.6, 0.05, 0.28, 0.91],
          }}
          className="w-screen h-screen overflow-y-auto scrollbar-hide snap-y snap-mandatory relative"
        >
          {/* عکس خواننده در پس‌زمینه که با اسکرول محو می‌شود */}
          <motion.div
            className="fixed inset-0 w-full h-full z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: backgroundOpacity }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/4f4c36680a4d3afbb0c1563bf0fc3d6b28ce2614.jpg"
              alt="singer"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            {/* <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 z-10 opacity-50 object-cover w-full h-full mix-blend-overlay"
            >
              <source
                src="/WhatsApp Video 2025-08-23 at 03.59.10.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}
          </motion.div>

          {/* سکشن اول - هدر */}
          <section
            ref={setSectionRef(0)}
            className="relative w-screen h-screen bg-transparent text-white overflow-hidden snap-start z-10"
          >
            {/* متن پایین سمت چپ */}
            <div className="absolute bottom-20 left-15 z-50">
              <h1 className="text-4xl">Concerts</h1>
            </div>

            {/* دکمه اسکرول */}
            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center cursor-pointer z-50"
              onClick={() => scrollToSection(1)}
            >
              <div className="w-5 h-8 border-2 ml-5 border-white rounded-full flex items-start justify-center">
                <motion.div
                  className="w-1 h-2 bg-white rounded-full mt-1"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className="mt-2 text-xs uppercase">Scroll to explore</span>
            </div>
          </section>

          {/* منوی سال‌ها */}
          {/* منوی سال‌ها و دکمه‌های بالا/پایین */}
          <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-50">
            {/* سال‌ها */}
            {["1991", "1992", "1993", "1994", "1995", "1996"].map(
              (year, index) => (
                <button
                  key={year}
                  className="opacity-50 hover:opacity-100 transition text-white text-xs"
                  onClick={() => scrollToSection(index + 1)}
                >
                  {year}
                </button>
              )
            )}

            {/* دکمه‌های بالا/پایین */}
            <div className="flex gap-1 mt-2">
              <button
                className="p-2 bg-gray-800 rounded-full text-white disabled:opacity-30 text-[10px]"
                onClick={() => scrollToSection(currentSection - 1)}
                disabled={currentSection === 0}
              >
                ▲
              </button>
              <button
                className="p-2 bg-gray-800 rounded-full text-white disabled:opacity-30 text-[10px]"
                onClick={() => scrollToSection(currentSection + 1)}
                disabled={currentSection === sectionRefs.current.length - 1}
              >
                ▼
              </button>
            </div>
          </div>

          {/* منو با قابلیت کلیک */}
          <div onClick={openMenu}>
            <Menu />
          </div>

          {/* لوگو و منو */}
          <div className="fixed inset-x-0 top-0 z-50 flex justify-center w-full">
            <div className="flex w-full max-w-6xl py-4 items-center">
              <nav className="hidden md:flex flex-1 justify-between items-center">
                <div className="flex items-center gap-4">
                  <Link href="#" className="hover:opacity-80">
                    <Image
                      src="/images/icons/Container.png"
                      alt=""
                      width={32}
                      height={24}
                    />
                  </Link>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleNavigation("/life", "right")}
                      className="font-din font-bold text-[14px] leading-[22px] tracking-[3px] text-center uppercase opacity-25 hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white"
                    >
                      Consert
                    </button>

                    {/* دایره خاکستری با دو نوشته */}
                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gray-500 rounded-full opacity-60 items-center justify-center"></div>
                      <span className="text-[10px] font-bold text-white">
                        02
                      </span>
                    </div>
                  </div>

                  <Link href="#" className="hover:opacity-80">
                    <Image
                      src="/images/icons/Container (1).png"
                      alt=""
                      width={38}
                      height={27}
                    />
                  </Link>
                </div>
                <Logo />
              </nav>
            </div>
          </div>

          <footer
            className="fixed right-[60px] bottom-[40px] z-40 
                       flex flex-col items-end text-white text-[12px] leading-5 space-y-3 text-right"
          >
            <p className="text-slate-400 text-[11px] w-full text-right">
              www.hmmyounisjalilian.com
            </p>

            <div className="flex w-full justify-end gap-4 flex-row-reverse">
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <Link href="#" className="hover:text-white">
                  FA
                </Link>
                <Link href="#" className="hover:text-white">
                  EN
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Twitter"
                  className="opacity-75 hover:opacity-100 transition"
                >
                  <Image
                    src="/images/icons/twiter-icon.png"
                    alt="Twitter"
                    width={12}
                    height={12}
                  />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="opacity-75 hover:opacity-100 transition"
                >
                  <Image
                    src="/images/icons/instagram-icon.png"
                    alt="Instagram"
                    width={12}
                    height={12}
                  />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="opacity-75 hover:opacity-100 transition"
                >
                  <Image
                    src="/images/icons/facebook-icon.png"
                    alt="Facebook"
                    width={12}
                    height={12}
                  />
                </a>
              </div>
            </div>

            <div className="flex w-full justify-end items-center gap-3 text-[11px] text-slate-300">
              <Link href="/#" className="hover:text-white transition">
                Cookie Settings
              </Link>
              <Link href="/#" className="hover:text-white transition">
                Cookie Policy
              </Link>
              <Link href="/#" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </div>
          </footer>

          {/* سکشن‌های بلاک‌های کنسرت */}
          {concertsData.map((concert, index) => (
            <section
              key={index}
              ref={setSectionRef(index + 1)}
              className="relative h-screen snap-start overflow-hidden z-10 bg-transparent flex justify-center"
            >
              <div
                className={`relative w-full max-w-3xl h-full flex items-center justify-${concert.alignment}`}
              >
                <div
                  className={`flex flex-col items-${concert.alignment} justify-center gap-6 w-full border-b border-gray-700`}
                >
                  <div className="overflow-hidden bg-opacity-40 backdrop-blur-sm ">
                    <Image
                      src={concert.image}
                      alt={`concert ${index + 1}`}
                      width={350}
                      height={250}
                      className="object-cover w-full"
                    />
                  </div>

                  {/* انیمیشن متن سال */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-end rounded-lg"
                  >
                    <h2 className="font-bold text-2xl text-white">
                      {concert.year}
                    </h2>
                  </motion.div>

                  {concert.description && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="w-full max-w-xs text-end pb-3 rounded-lg"
                    >
                      <p className="text-gray-200 text-sm leading-relaxed">
                        {concert.description}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          ))}

          {/* بخش منوی جدید با تصویر در سمت چپ */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="menu-content"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col md:flex-row"
                onClick={closeMenu}
              >
                {/* دکمه بستن */}
                <button
                  className="absolute top-6 right-6 text-white text-3xl z-60"
                  onClick={closeMenu}
                >
                  ×
                </button>

                {/* منو در سمت چپ */}
                <motion.div
                  className="w-full md:w-1/2 h-full flex flex-col items-center justify-center p-10"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 className="text-5xl font-bold text-white mb-16 text-center">
                    Menu
                  </h2>

                  <div className="w-full max-w-3xl space-y-8">
                    {menuItems.map((item, i) => (
                      <div
                        key={item.title}
                        className="overflow-hidden flex  items-center gap-5 justify-end group relative"
                      >
                        {/* خط در ابتدا */}
                        <div className="h-px bg-gray-600 ml-auto transition-all duration-300 w-[20px] group-hover:w-[100px] group-hover:bg-white" />

                        {/* آیتم منو */}
                        <button
                          onClick={() => handleNavigation(item.path, "up")}
                          className="text-xl font-light text-gray-400 transition-colors duration-300 py-3 relative z-10 group-hover:text-white"
                        >
                          {item.title}
                        </button>

                        {/* دایره شماره صفحه */}
                        <div className="relative flex-shrink-0 ml-6 z-0">
                          <div
                            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center 
                     transition-colors duration-300 group-hover:bg-white"
                          >
                            <span className="text-xs text-gray-400 transition-colors duration-300 group-hover:text-black">
                              {i < 9 ? `0${i + 1}` : i + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* تصویر در سمت راست */}
                <motion.div
                  className="w-full md:w-1/2 h-full relative"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Image
                    src="/menu-photo.png"
                    alt="Artist"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent"></div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        // صفحه لودینگ هنگام انتقال
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-screen h-screen bg-black flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white border-t-transparent rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
