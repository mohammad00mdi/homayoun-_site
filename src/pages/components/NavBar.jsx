import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex justify-center w-full">
      <div className="flex w-full max-w-6xl py-4 items-center">
        <nav className="hidden md:flex flex-1 justify-between items-center">
          {/* منو (راستِ نوار در RTL چون اولین فرزند است) */}
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">
              <Image src="/images/icons/Container (1).png" alt="" width={38} height={27} />
            </Link>

            <Link
              href="/life"
              className="font-din font-bold text-[14px] leading-[22px] tracking-[3px] text-center uppercase opacity-15 hover:opacity-100 transition-opacity duration-200"
            >
              خانه
            </Link>

            <Link href="#" className="hover:opacity-80">
              <Image src="/images/icons/Container.png" alt="" width={32} height={24} />
            </Link>
          </div>

          {/* لوگو (چپِ نوار در RTL چون دومین فرزند است) */}
          <Logo />
        </nav>
      </div>
    </div>
  );
}
