import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed right-[60px] bottom-[40px] z-40 
                       flex flex-col items-end text-white text-[12px] leading-5 space-y-3 text-right">
      
      {/* یو آر ال (بالای همه) */}
      <p className="text-slate-400 text-[11px] w-full text-right">
        www.hmmyounisjalilian.com
      </p>

        {/* آیکون‌ها + زبان‌ها */}
        <div className="flex w-full justify-end gap-4 flex-row-reverse">
          
                    {/* زبان‌ها */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300">
            <Link href="#" className="hover:text-white">FA</Link>

            <Link href="#" className="hover:text-white">EN</Link>
          </div>
          
          
          {/* آیکون‌های سوشال */}
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


      {/* لینک‌های سیاست‌ها */}
      <div className="flex w-full justify-end items-center gap-3 text-[11px] text-slate-300">
        <Link href="/cookie-settings" className="hover:text-white transition">Cookie Settings</Link>
       
        <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
        <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>

      </div>
    </footer>
  );
}
