"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import MenuButton from "./MenuButton";
import MenuOverlay from "./MenuOverlay";
import { MENU_ITEMS } from "./menuItems";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const firstLinkRef = useRef(null);

  useEffect(() => setMounted(true), []);

  // قفل اسکرول + ESC + کلاس ریشه
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    if (open) {
      
      root.classList.add("menu-open");
      document.body.style.overflow = "hidden";
      setTimeout(() => firstLinkRef.current?.focus(), 0);
    } else {
      root.classList.remove("menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", onKey);
      root.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [open, mounted]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close  = useCallback(() => setOpen(false), []);

  // Pages Router: امن برای کلاینت
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <>
      {/* دکمه بازکننده در جایگاه فعلی */}
      <div className="absolute top-[530px] inset-x-0 z-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-row-reverse items-center gap-6">
            <MenuButton onClick={toggle} open={open} />
            <p className="text-white text-lg md:text-[24px] select-none">منو</p>
          </div>
        </div>
      </div>

      {mounted && open
        ? createPortal(
            <MenuOverlay
              items={MENU_ITEMS}
              close={close}
              firstLinkRef={firstLinkRef}
              pathname={pathname}
            />,
            document.body
          )
        : null}
    </>
  );
}
