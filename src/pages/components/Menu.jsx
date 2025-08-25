// Menu.jsx
// import Link from "next/link";

// Menu.jsx
export default function Menu() {
  return (
    
      <div className="fixed bottom-40 inset-x-0 z-30 cursor-pointer">
        <div className="absolute bottom-40 left-15">
          <div className="flex flex-row-reverse items-center gap-6">
            <button className="flex flex-col gap-1.5">
              <span className="block w-6 h-[2px] bg-white" />
              <span className="block w-6 h-[2px] bg-white" />
              <span className="block w-6 h-[2px] bg-white" />
            </button>
            <p className="text-white text-lg md:text-[24px]">menu</p>
          </div>
        </div>
      </div>

  );
}
