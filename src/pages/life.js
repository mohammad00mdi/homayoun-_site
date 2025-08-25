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
  const [mainPageScroll, setMainPageScroll] = useState(0);
  const containerRef = useRef(null); // اضافه شده: ref برای کل کانتینر

  const handleNavigation = (path, direction = "left") => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  const openMenu = () => {
    // ذخیره موقعیت اسکرول فعلی
    setMainPageScroll(window.scrollY);
    // اسکرول به پایین صفحه
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    // بازگشت به موقعیت اسکرول قبلی
    setTimeout(() => {
      window.scrollTo({ top: mainPageScroll, behavior: 'smooth' });
    }, 100);
  };

  const setSectionRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setCurrentSection(index);
      const newOpacity = Math.max(0, 1 - index * 0.3);
      setBackgroundOpacity(newOpacity);
    }
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
    hidden: { opacity: 0, y: -20 },
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

  const menuItems = [
    { title: "Home", path: "/", direction: "right" },
    { title: "Concerts", path: "/concert", direction: "right" },
    { title: "Biography", path: "/life", direction: "right" },
  ];

  useEffect(() => {
    const handleWheel = (e) => {
      if (isMenuOpen) return;
      
      if (e.deltaY > 50 && currentSection < sectionRefs.current.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < -50 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e) => {
      if (isMenuOpen) return;
      
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
 // اضافه شده: isMenuOpen به dependency اضافه شد

  const concertsData = [
    {
      titel: "Introduction",
      image: "/photo_2025-08-23_02-25-24.jpg",
      description:"Homayoun Shajarian (born 21 May 1975) is an illustrious Iranian vocalist, multi-instrumentalist, and one of the foremost figures in contemporary Persian classical music. Possessing a tenor voice of crystalline clarity and steeped in the mastery of traditional vocal techniques, he carries forward the immortal legacy of his father, the great Maestro Mohammad-Reza Shajarian, while tracing his own distinct path through the realms of Persian classical and fusion music.",
      description2:"Across three decades, Homayoun has captivated audiences from the storied concert halls of Tehran to the world's most prestigious stages, weaving the refined poetry and āvāz (improvised vocal style) of Persian tradition with bold, modern arrangements. His artistry forms a bridge between generations, breathing renewed life into an ancient heritage and earning him recognition as a cultural emissary of Iranian music on the global stage.",
    },
    {
      titel: "Early Life and Musical Education",
      image: "/photo_2025-08-23_02-24-58.jpg",
      description:"Born in Tehran into a family where music was not merely an art but a way of life, Homayoun seemed destined to follow a path paved in melody. He is the son of Mohammad-Reza Shajarian – the unrivaled master of Persian classical singing – and Farkhondeh Golafshan, a dedicated teacher whose guidance and artistry shaped his early years. He began his training almost as soon as he could speak. At five, under his father's encouragement, he took up the tombak (Persian goblet drum) with master Nasser Farhangfar. By the age of ten, he was studying the intricate vocal repertoire (āvāz) side by side with his older sisters, guided by the patient and exacting hand of their father.",
    },
    {
      titel: "",
      image: "/photo_2025-08-23_02-25-17.jpg",
      description:"Those early lessons were as much about the soul as about the voice. Homayoun absorbed the cadences of Persian ghazals, the mysticism of Sufi verse, and the discipline required to inhabit both. In his teens, he entered the Tehran Conservatory of Music, choosing the kamāncheh (spike fiddle) as his principal instrument under the mentorship of virtuoso Ardeshir Kamkar. Alongside his formal studies, his dedication to the art of singing was later recognized with the awarding of a First-class Artistic Certificate in Āvāz – the highest honor from Iran's Ministry of Culture, equivalent to a doctorate degree in the field.",
      description2:"This wide-ranging musical education – spanning percussion, strings, and voice – endowed him with a deep command of rhythm and melody. More than skill, however, it gave him reverence for the spiritual essence of Persian music, where each note is a breath of the soul, and every performance an act of devotion. This foundation would later allow him to innovate without severing the roots that anchored his art.",
    },
    {
      titel: "Personal Life and Family Legacy",
      image: "/photo_2025-08-23_02-25-21.jpg",
      description:"Homayoun's life is intertwined with a lineage that has shaped Persian music for generations. He grew up alongside three sisters – Farzaneh, Afsaneh, and Mojgan – and a brother, Rayan, all nurtured in the same environment of song, poetry, and discipline. Under their father's tutelage, the siblings would sing together, memorizing gushehs (melodic motifs) and verses of the great Persian poets. His eldest sister, Mojgan, emerged as an accomplished vocalist and setār player, mentored by the same masters who once guided their father. Afsaneh's marriage to the late Parviz Meshkatian – a towering santur virtuoso and composer – further entwined the family with the great names of Persian classical music.",
    },
    {
      titel: "",
      image: "/photo_2025-08-23_02-25-14.jpg",
      description:"In his own family life, Homayoun balances his art with fatherhood. He has a daughter, Yasmine Shajarian (born 2007), for whom he has expressed boundless love and pride. He has often spoken of his wish to pass on to her the same reverence for Persian culture and music that he inherited from his parents. Though Yasmine remains largely away from the public eye, she stands as a symbol of the next chapter in the Shajarian legacy – a living thread between the past and the future.",
    },
    {
      titel: "",
      image: "/photo_2025-08-23_02-25-07.jpg",
      description:"A moment of profound transition came in October 2020 with the passing of Maestro Mohammad-Reza Shajarian. His departure was mourned by millions; it was as though a part of the nation's soul had been stilled. Yet even in grief, there was continuity. The elder Shajarian had, during his lifetime, publicly expressed his faith in Homayoun's vision, urging him to 'follow his own path… and never overstep the bounds of modernity.' It was a blessing to innovate while preserving the dignity of tradition – a principle that remains at the heart of Homayoun's artistic journey.The Shajarian family's influence on Persian music is vast and enduring. Mohammad-Reza Shajarian, born in 1940, was not only the voice of a nation but also a guardian of its musical heritage, preserving the radif repertoire and elevating it to new artistic heights. Internationally lauded – from UNESCO's Mozart Medal to NPR's list of '50 Great Voices' – he was affectionately hailed in Iran as the 'King of Song.' Homayoun, both son and student, inherited this legacy through blood and through years of close apprenticeship. Today, he stands at the heart of it – a bridge between eras, carrying the voice of tradition into the language of the present. In him, those who loved his father hear an echo of that cherished timbre, and new generations discover a modern artist who speaks with the timeless soul of Iran. ",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning ? (
        <motion.div
          key="concerts-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-screen h-screen overflow-y-auto scrollbar-hide snap-y snap-mandatory relative"
          ref={containerRef} // اضافه شده: ref برای کانتینر اصلی
        >
          <motion.div
            className="fixed inset-0 w-full h-full z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: backgroundOpacity }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/life-image.jpg"
              alt="singer"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            
            {/* گیف روی عکس پس‌زمینه */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 z-10 opacity-50 object-cover w-full h-full mix-blend-overlay"
            >
              <source src="/WhatsApp Video 2025-08-23 at 03.59.10.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>

          <section
            ref={setSectionRef(0)}
            className="relative w-screen h-screen bg-transparent text-white overflow-hidden snap-start z-10"
          >
            <div className="absolute bottom-20 left-12 z-50">
              <h1 className="text-4xl font-serif">biography</h1>
            </div>

            <div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-50"
              onClick={() => scrollToSection(1)}
            >
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center">
                <motion.div
                  className="w-1 h-2 bg-white rounded-full mt-1"
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              </div>
              <span className="mt-2 text-xs uppercase">Scroll to explore</span>
            </div>
          </section>

          {/* دکمه منو - اضافه شده */}
          <div onClick={openMenu}>
            <Menu />
          </div>

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
                      onClick={() => handleNavigation("/concert")}
                      className="font-din font-bold text-[14px] leading-[22px] tracking-[3px] text-center uppercase opacity-25 hover:opacity-100 transition-opacity duration-200 cursor-pointer text-white"
                    >
                      biography
                    </button>

                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gray-500 rounded-full opacity-60 items-center justify-center"></div>
                      <span className="text-[10px] font-bold text-white">
                        03
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

          <footer className="fixed right-[60px] bottom-[40px] z-40 
                                 flex flex-col items-end text-white text-[12px] leading-5 space-y-3 text-right">
                
                <p className="text-slate-400 text-[11px] w-full text-right">
                  www.hmmyounisjalilian.com
                </p>
          
                  <div className="flex w-full justify-end gap-4 flex-row-reverse">
                    
                    <div className="flex items-center gap-2 text-[11px] text-slate-300">
                      <Link href="#" className="hover:text-white">FA</Link>
                      <Link href="#" className="hover:text-white">EN</Link>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <a href="#" aria-label="Twitter" className="opacity-75 hover:opacity-100 transition">
                        <Image src="/images/icons/twiter-icon.png" alt="Twitter" width={12} height={12} />
                      </a>
                      <a href="#" aria-label="Instagram" className="opacity-75 hover:opacity-100 transition">
                        <Image src="/images/icons/instagram-icon.png" alt="Instagram" width={12} height={12} />
                      </a>
                      <a href="#" aria-label="Facebook" className="opacity-75 hover:opacity-100 transition">
                        <Image src="/images/icons/facebook-icon.png" alt="Facebook" width={12} height={12} />
                      </a>
                    </div>
                  </div>
          
                <div className="flex w-full justify-end items-center gap-3 text-[11px] text-slate-300">
                  <Link href="/cookie-settings" className="hover:text-white transition">Cookie Settings</Link>
                  <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
                  <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </div>
              </footer>

          {concertsData.map((concert, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <section
                key={index}
                ref={setSectionRef(index + 1)}
                className="relative h-screen snap-start overflow-hidden z-10 bg-transparent flex justify-center items-center px-8"
              >
                <div className="w-full max-w-5xl flex items-center justify-center gap-12">
                  {isEven ? (
                    <>
                      <div className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={concert.image}
                          alt={`concert ${index + 1}`}
                          width={350}
                          height={350}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-white bg-black bg-opacity-40 backdrop-blur-sm p-6 rounded-lg max-w-lg">
                        {concert.titel && (
                          <h2 className="font-bold text-2xl mb-4">
                            {concert.titel}
                          </h2>
                        )}
                        <p className="text-gray-200 text-sm leading-relaxed mb-3">
                          {concert.description}
                        </p>
                        {concert.description2 && (
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {concert.description2}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-white bg-black bg-opacity-40 backdrop-blur-sm p-6 rounded-lg max-w-lg">
                        {concert.titel && (
                          <h2 className="font-bold text-2xl mb-4">
                            {concert.titel}
                          </h2>
                        )}
                        <p className="text-gray-200 text-sm leading-relaxed mb-3">
                          {concert.description}
                        </p>
                        {concert.description2 && (
                          <p className="text-gray-200 text-sm leading-relaxed">
                            {concert.description2}
                          </p>
                        )}
                      </div>
                      <div className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src={concert.image}
                          alt={`concert ${index + 1}`}
                          width={350}
                          height={350}
                          className="object-cover"
                        />
                      </div>
                    </>
                  )}
                </div>
              </section>
            );
          })}

          {/* بخش منوی جدید با تصویر در سمت چپ - اضافه شده */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="menu-content"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col md:flex-row overflow-y-auto"
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

                  <div className="w-full max-w-md space-y-8">
                    {menuItems.map((item, i) => (
                      <motion.div
                        key={item.title}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={menuItemVariants}
                        className="overflow-hidden flex items-center gap-5 justify-end group relative"
                      >
                        {/* خط در ابتدا */}
                        <motion.div
                          className="h-px bg-gray-600 ml-auto group-hover:bg-white transition-colors duration-300"
                          initial={{ scaleX: 0.5, width: "20px" }}
                          whileHover={{ scaleX: 1, width: "100px" }}
                          transition={{ duration: 0.3 }}
                          style={{ originX: 1 }}
                        />

                        {/* آیتم منو */}
                        <button
                          onClick={() => handleNavigation(item.path, "up")}
                          className="text-xl font-light text-gray-400 hover:text-white transition-colors duration-300 py-3 relative z-10"
                        >
                          {item.title}
                        </button>

                        {/* دایره شماره صفحه (با فاصله از منو) */}
                        <div className="relative flex-shrink-0 ml-6 z-0">
                          <div
                            className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center 
                              group-hover:bg-white transition-colors duration-300"
                          >
                            <span className="text-xs text-gray-400 group-hover:text-black transition-colors duration-300">
                              {i < 9 ? `0${i + 1}` : i + 1}
                            </span>
                          </div>
                        </div>
                      </motion.div>
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