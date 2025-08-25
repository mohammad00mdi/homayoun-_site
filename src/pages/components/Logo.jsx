// components/Logo.jsx
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" aria-label="خانه">
      <Image
        src="/logo.png"
        alt="لوگو"
        width={97}      // عرض پیش‌فرض
        height={93}     // ارتفاع پیش‌فرض
        className="w-[97px] h-[93px]" // سایز دقیق، Tailwind قفل می‌کنه
        priority
      />
    </Link>
  );
}
