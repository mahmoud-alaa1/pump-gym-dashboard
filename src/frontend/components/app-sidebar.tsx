"use client";

import * as React from "react";
import { IdCardLanyard, LogOut, User, Users, UserStar } from "lucide-react";

import { NavMain } from "@/frontend/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/frontend/components/ui/sidebar";
import useAuth from "../modules/auth/store/useAuth";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const auth = useAuth();
  const data = React.useMemo(() => {
    return {
      navMain: [
        {
          title: "العملاء",
          url: "/clients",
          icon: Users,
        },
        ...(auth.user?.role === "ADMIN"
          ? [
              {
                title: "الموظفين",
                url: "/employees",
                icon: IdCardLanyard,
              },
              {
                title: "المدربين",
                url: "/trainers",
                icon: UserStar,
              },
            ]
          : []),
      ],
    };
  }, [auth]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip={auth.user?.name ?? "مستخدم غير معروف"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              {auth.user && (
                <div className=" grid grid-cols-[auto_1fr] items-center gap-3">
                  <div className=" size-fit bg-muted rounded-full">
                    <User />
                  </div>
                  <div className="text-sm space-y-2 font-medium leading-none">
                    <div>{auth.user.name}</div>
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => auth.logout()}
              tooltip={"تسجيل الخروج"}
            >
              <LogOut />
              <span>تسجيل الخروج</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
