import { Separator } from "@/frontend/components/ui/separator";
import { SidebarTrigger } from "@/frontend/components/ui/sidebar";
import pumpImage from "@/assets/pump.webp";
import { useEffect, useRef } from "react";

export default function MainLayoutHeader() {
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        header.current?.classList.add("bg-black");
      } else {
        header.current?.classList.remove("bg-black");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={header}
      className="flex sticky top-0 transition justify-between p-4 mb-4 items-center  shrink-0  gap-2 ease-linear "
    >
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="-ms-1" />
        <Separator
          orientation="horizontal"
          className="me-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <img
        src={pumpImage}
        alt="Pump Gym"
        className="size-20 pointer-events-none "
      />
    </header>
  );
}
