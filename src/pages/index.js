import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Logo from './components/Logo';

// تعریف exitVariants
const exitVariants = {
  left: { x: "-100%", opacity: 0 },
  right: { x: "100%", opacity: 0 },
  up: { y: "-100%", opacity: 0 },
  down: { y: "100%", opacity: 0 }
};

export default function LifePage() {
  const sectionRefs = useRef([]);
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState("left");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mainPageScroll, setMainPageScroll] = useState(0);
  const containerRef = useRef(null);
  const menuContentRef = useRef(null); // رفرنس جدید برای محتوای منو

  const handleNavigation = (path, direction = "left") => {
    setTransitionDirection(direction);
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(path);
    }, 1000);
  };

  const openMenu = () => {
    setMainPageScroll(window.scrollY);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

    // تابع جدید برای مدیریت اسکرول همزمان
    const handleMenuScroll = (e) => {
      if (isMenuOpen && menuContentRef.current) {
        // محاسبه میزان اسکرول منو
        const menuScrollTop = menuContentRef.current.scrollTop;
        const menuScrollHeight = menuContentRef.current.scrollHeight;
        const menuClientHeight = menuContentRef.current.clientHeight;
        
        // محاسبه موقعیت نسبی اسکرول (بین 0 تا 1)
        const scrollPercentage = menuScrollTop / (menuScrollHeight - menuClientHeight);
        
        // محاسبه موقعیت اسکرول صفحه اصلی بر اساس موقعیت اسکرول منو
        const mainPageScrollPosition = scrollPercentage * (document.body.scrollHeight - window.innerHeight);
        
        // اعمال اسکرول به صفحه اصلی
        window.scrollTo({
          top: mainPageScrollPosition,
          behavior: 'auto' // از 'auto' به جای 'smooth' برای همگام سازی بهتر
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    
    // اضافه کردن event listener برای اسکرول منو
    if (menuContentRef.current) {
      menuContentRef.current.addEventListener("scroll", handleMenuScroll);
    }

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      
      // حذف event listener هنگام unmount
      if (menuContentRef.current) {
        menuContentRef.current.removeEventListener("scroll", handleMenuScroll);
      }
    };
  }, [currentSection, isMenuOpen]);

  return (
    <AnimatePresence mode="wait">
      {!isTransitioning ? (
        <motion.div
          key="life-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={exitVariants[transitionDirection]}
          transition={{
            duration: 1,
            ease: [0.6, 0.05, 0.28, 0.91],
          }}
          className="relative min-h-dvh snap-y snap-mandatory"
          ref={containerRef}
        >
          {/* محتوای صفحه اصلی */}
          <motion.div
            className="fixed inset-0 w-full h-full z-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: backgroundOpacity }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/main-photo.png"
              alt="singer"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            
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
            className="relative w-screen h-screen bg-transparent text-white overflow-hidden snap-start z-20"
          >
            <div className="absolute bottom-20 left-12 z-50">
              <h1 className="text-4xl font-serif">Homayoun Shajarian</h1>
            </div>
          </section>
          <div className="fixed inset-x-0 top-0 z-50 flex justify-center w-full">
            <div className="flex w-full max-w-6xl py-4 items-center">
              <nav className="hidden md:flex flex-1 justify-between items-center">
                <div className="flex items-center gap-4">
                  <Link href="/" className="hover:opacity-80">
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
                      Home
                    </button>

                    <div className="relative w-5 h-5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gray-500 rounded-full opacity-60 items-center justify-center"></div>
                      <span className="text-[10px] font-bold text-white">
                        01
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
            {/* یو آر ال (بالای همه) */}
            <p className="text-slate-400 text-[11px] w-full text-right">
              www.hmmyounisjalilian.com
            </p>

            {/* آیکون‌ها + زبان‌ها */}
            <div className="flex w-full justify-end gap-4 flex-row-reverse">
              {/* زبان‌ها */}
              <div className="flex items-center gap-2 text-[11px] text-slate-300">
                <Link href="#" className="hover:text-white">
                  FA
                </Link>

                <Link href="#" className="hover:text-white">
                  EN
                </Link>
              </div>

              {/* آیکون‌های سوشال */}
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

            {/* لینک‌های سیاست‌ها */}
            <div className="flex w-full justify-end items-center gap-3 text-[11px] text-slate-300">
              <Link
                href="/cookie-settings"
                className="hover:text-white transition"
              >
                Cookie Settings
              </Link>

              <Link
                href="/cookie-policy"
                className="hover:text-white transition"
              >
                Cookie Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </div>
          </footer>

          {/* دکمه منو */}
          <div onClick={openMenu}>
            <Menu />
          </div>

          {/* بخش منوی جدید با تصویر در سمت چپ */}                                                                      
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="menu-content"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={menuVariants}
                className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col md:flex-row overflow-y-auto"
                ref={menuContentRef} // اضافه کردن رفرنس به محتوای منو
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

          <Footer />
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
