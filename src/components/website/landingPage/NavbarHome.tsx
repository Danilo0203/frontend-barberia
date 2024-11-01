"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ModeToggle } from "@/components/website/ModeToggle";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Productos", href: "#productos" },
  { label: "Galería", href: "#galeria" },
  { label: "Ubicación", href: "#ubicacion" },
];

export const NavbarHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const handleClick = useCallback(
    (href: string) => {
      const sectionId = href.slice(1);
      isScrollingRef.current = true;
      setActiveSection(sectionId);
      scrollToSection(sectionId);
      setIsOpen(false);

      // Actualizar el hash en la URL
      window.history.pushState(null, "", href);
    },
    [scrollToSection],
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);

      if (isScrollingRef.current) {
        // No actualizar activeSection durante el desplazamiento suave
        return;
      }

      const sections = menuItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });
      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Llamar una vez al montar para establecer la sección activa inicial

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeSection]);

  // Manejar el evento popstate para navegación con botones del navegador
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.slice(1);
        setActiveSection(sectionId);
        scrollToSection(sectionId);
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Desplazarse a la sección inicial si hay un hash en la URL
    if (window.location.hash) {
      const initialSection = window.location.hash.slice(1);
      setActiveSection(initialSection);
      scrollToSection(initialSection);
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [scrollToSection]);

  useEffect(() => {
    const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
    if (activeLink && indicatorRef.current && navRef.current) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      indicatorRef.current.style.width = `${linkRect.width}px`;
      indicatorRef.current.style.transform = `translateX(${linkRect.left - navRect.left}px)`;
    }
  }, [activeSection]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background py-6 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/img/logo/logo.png"
              alt="Logo Barberia Juanes"
              width={100}
              height={100}
              priority
            />
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center">
            <div ref={navRef} className="relative flex gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item.href);
                  }}
                  className={`relative py-2 text-sm font-semibold transition-colors hover:text-primary ${
                    activeSection === item.href.slice(1)
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <span
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </div>
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="md:hidden">
              <ModeToggle />
            </div>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined}>
              <VisuallyHidden>
                <SheetTitle>Menu</SheetTitle>
              </VisuallyHidden>
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item.href);
                    }}
                    className={`relative py-2 text-sm font-semibold transition-colors hover:text-primary ${
                      activeSection === item.href.slice(1)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.slice(1) && (
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary transition-all duration-300 ease-in-out" />
                    )}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
