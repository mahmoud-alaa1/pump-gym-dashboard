"use client";
import { type ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "@front/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@front/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@front/components/ui/drawer";

interface ResponsiveModalProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  minWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "fit";
  height?: "auto" | "90vh" | "80vh" | "70vh" | "full";
  scrollable?: boolean;
}

export function ResponsiveModal({
  trigger,
  title,
  description,
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  minWidth = "md",
  height = "auto",
  scrollable = true,
}: ResponsiveModalProps) {
  const [mounted, setMounted] = useState(false);

  const [internalOpen, setInternalOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setMounted(true);
  }, []);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const onOpenChange = controlledOnOpenChange || setInternalOpen;

  const getMinWidthClass = () => {
    const widthMap = {
      sm: "min-w-sm",
      md: "min-w-md",
      lg: "min-w-lg",
      xl: "min-w-xl",
      "2xl": "min-w-2xl",
      fit: "w-fit max-w-[90vw]",
    };
    return widthMap[minWidth];
  };

  const getHeightClass = () => {
    const heightMap = {
      auto: "h-auto",
      "90vh": "h-[90dvh]",
      "80vh": "h-[80dvh]",
      "70vh": "h-[70dvh]",
      full: "h-full",
    };
    return heightMap[height];
  };

  if (!mounted || isDesktop === undefined) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className={`overflow-x-hidden ${getMinWidthClass()}
                     ${scrollable ? `${getHeightClass()} overflow-y-auto` : ""}
                    `}
        >
          <DialogHeader>
            <DialogTitle className="sr-only text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription className="sr-only text-center">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent onInteractOutside={(e) => e.preventDefault()}>
        <div
          className={`relative flex flex-col overflow-x-hidden p-4  ${getHeightClass()} ${
            scrollable ? "overflow-y-auto" : ""
          }`}
        >
          <DrawerHeader className="shrink-0">
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
            {description && (
              <DrawerDescription className="sr-only">
                {description}
              </DrawerDescription>
            )}
          </DrawerHeader>

          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
