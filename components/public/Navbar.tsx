"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 ${scrolled ? "glass" : "bg-transparent"}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">Curumaní Cocina</Link>
        <div className="flex items-center gap-3">
          <Link href="/#menu" className="text-sm">Menú</Link>
          <Link href="/#galeria" className="text-sm">Galería</Link>
          <Link href="/#sobre" className="text-sm">Sobre</Link>
          <Link href="/admin" className="text-sm">Admin</Link>
          <Button>
            <a href="https://wa.me/573136467910?text=Hola%20quiero%20hacer%20un%20pedido" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}