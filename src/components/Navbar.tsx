"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🌸</span>
            <span
              className="font-serif text-2xl font-bold text-gray-900 tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Flo<span className="text-pink-500">ría</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Inicio" },
              { href: "/tienda", label: "Tienda" },
              { href: "/#categorias", label: "Categorías" },
              { href: "/#nosotros", label: "Nosotros" },
              { href: "/#contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-pink-500 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleCart}
              className="relative p-2 text-gray-600 hover:text-pink-500 transition-colors"
              aria-label="Carrito de compras"
            >
              <CartSVG />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? <XSvg /> : <MenuSvg />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4 pt-2 animate-fadeIn">
            {[
              { href: "/", label: "Inicio" },
              { href: "/tienda", label: "Tienda" },
              { href: "/#categorias", label: "Categorías" },
              { href: "/#nosotros", label: "Nosotros" },
              { href: "/#contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function CartSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 7H4L5 9z"
      />
    </svg>
  );
}

function MenuSvg() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XSvg() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
