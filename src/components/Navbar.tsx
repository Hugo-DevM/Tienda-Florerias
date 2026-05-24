"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 100) setActiveSection("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }
    const sections = ["categorias", "nosotros", "contacto"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/tienda", label: "Tienda" },
    { href: "/#categorias", label: "Categorías" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: scrolled ? "rgba(250,249,247,0.96)" : "rgba(250,249,247,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #E7E5E3" : "1px solid transparent",
        transition: "background 250ms var(--ease-out), border-color 250ms var(--ease-out)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span
              className="font-display text-2xl font-medium text-stone-900 tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Flo<span className="text-brand">ría</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.includes("#") ? link.href.split("#")[1] : null;
              const isActive = sectionId
                ? activeSection === sectionId
                : link.href === "/"
                ? pathname === "/" && !activeSection
                : pathname.startsWith(link.href) && link.href !== "/";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium"
                  style={{
                    color: isActive ? "#7C2D3C" : "#57534E",
                    transition: "color 150ms var(--ease-out)",
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#7C2D3C";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = "#57534E";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand"
                      style={{ transform: "scaleX(1)", transformOrigin: "left" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={toggleCart}
              className="btn-press relative p-2 text-stone-500 hover:text-brand"
              style={{ transition: "color 150ms var(--ease-out)" }}
              aria-label="Carrito"
            >
              <CartSVG />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 bg-brand text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold leading-none"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden btn-press p-2 text-stone-500"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <XSvg /> : <MenuSvg />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden border-t border-stone-100 pb-4 pt-3"
            style={{
              animation: "fadeUp 200ms var(--ease-out) both",
            }}
          >
            {navLinks.map((link) => {
              const sectionId = link.href.includes("#") ? link.href.split("#")[1] : null;
              const isActive = sectionId
                ? activeSection === sectionId
                : link.href === "/"
                ? pathname === "/" && !activeSection
                : pathname.startsWith(link.href) && link.href !== "/";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium rounded"
                  style={{
                    color: isActive ? "#7C2D3C" : "#57534E",
                    background: isActive ? "#FBF5F6" : "transparent",
                    fontFamily: "'Inter', sans-serif",
                    transition: "color 150ms var(--ease-out), background 150ms var(--ease-out)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

function CartSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4L5 9z" />
    </svg>
  );
}

function MenuSvg() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XSvg() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
