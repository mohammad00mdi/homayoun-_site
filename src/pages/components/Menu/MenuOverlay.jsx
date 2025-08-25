"use client";

import MenuList from "./MenuList";
import MenuImage from "./MenuImage";

export default function MenuOverlay({ items, close, firstLinkRef, pathname }) {
  return (
    <div
      id="main-menu-panel"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[999] bg-black"
    >
      <div className="absolute inset-0" onClick={close} aria-hidden="true" />

      <div className="relative mx-auto h-dvh w-dvw grid grid-cols-1 md:grid-cols-2">
        {/* منو — دسکتاپ ستونِ راست */}
        <div className="relative order-2 md:order-2 bg-black text-white flex items-center justify-center">
          {/* خط عمودی کنار تصویر (سمتِ چپِ منو) */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-px bg-white/15" />
          <MenuList
            items={items}
            close={close}
            firstLinkRef={firstLinkRef}
            pathname={pathname}
          />
        </div>

        {/* تصویر — دسکتاپ ستونِ چپ */}
        <MenuImage onClose={close} />
      </div>
    </div>
  );
}
