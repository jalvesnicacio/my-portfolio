"use client";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { Briefcase, Home, Info, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import React from "react";

const navigationMenuItems = [
  { title: "Home", href: "#", icon: Home },
  { title: "About", href: "#about", icon: Info },
  { title: "Portfolio", href: "#portfolio", icon: Briefcase },
];

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsSheetOpen(false);

    // Wait for the sheet to close animation before scrolling
    setTimeout(() => {
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 150);
  };

  return (
    <header className="h-24 bg-white flex-1 ">
      <div className="container mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png" // coloque seu logo dentro de /public/logo.png
            alt="Logo"
            width={53}
            height={45}
            className="mr-3"
          />
          <span className="text-xl font-bold">Jalves Nicacio</span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationMenuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()}`}
                  >
                    <Link
                      href={item.href}
                      passHref
                      className="flex items-center gap-0.5"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Contact como botão */}
          <Button asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <nav className="flex flex-col gap-4">
                {navigationMenuItems.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={(e) => handleMobileLinkClick(e, item.href)}
                  >
                    <item.icon className="inline mr-2 h-5 w-5 mb-1" />
                    {item.title}
                  </a>
                ))}
                <Button asChild className="mt-4 w-full">
                  <a
                    href="#contact"
                    onClick={(e) => handleMobileLinkClick(e, "#contact")}
                  >
                    Contact
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
