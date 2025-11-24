import { AppSidebar } from "@front/components/app-sidebar";

import { SidebarInset, SidebarProvider } from "@front/components/ui/sidebar";
import { Outlet } from "react-router";
import MainLayoutHeader from "./main-layout-header";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MainLayoutHeader />
        <main className="p-4 ">
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
