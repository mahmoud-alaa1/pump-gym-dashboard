import { AppSidebar } from "@front/components/app-sidebar";

import { Separator } from "@front/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@front/components/ui/sidebar";
import { Outlet } from "react-router";

import pumpImage from "@/assets/pump.webp";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between p-4  items-center  shrink-0  gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ms-1" />
            <Separator
              orientation="horizontal"
              className="me-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <img src={pumpImage} alt="Pump Gym" className="size-20" />
        </header>

        <main className="p-4">
          <Outlet />
        </main>
        {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
        </div> */}
        <footer className="text-center p-5">
          جيم بامب &copy; {new Date().getFullYear()}
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
