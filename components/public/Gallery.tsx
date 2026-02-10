"use client";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

type Item = { id: string; url: string };

export default function Gallery() {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState<Item | null>(null);
  useEffect(() => {
    const mock = Array.from({ length: 8 }).map((_, i) => ({ id: String(i), url: `https://picsum.photos/seed/${i}/800/600` }));
    setItems(mock);
  }, []);
  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <button key={g.id} className="group relative overflow-hidden rounded-2xl" onClick={() => setOpen(g)}>
            <img src={g.url} alt="Plato" className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
          </button>
        ))}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)}>
        {open && (
          <div className="space-y-2">
            <img src={open.url} alt="Zoom" className="w-full rounded-xl" />
          </div>
        )}
      </Modal>
    </section>
  );
}