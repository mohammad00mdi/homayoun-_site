"use client";

export default function MenuButton({ onClick, open }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-1.5"
      aria-label="Menu"
      aria-expanded={open}
      aria-controls="main-menu-panel"
    >
      <span className="block w-6 h-[2px] bg-white" />
      <span className="block w-6 h-[2px] bg-white" />
      <span className="block w-6 h-[2px] bg-white" />
    </button>
  );
}
