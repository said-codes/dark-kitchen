"use client";
import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase/client";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string;
};

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [open, setOpen] = useState<GalleryItem | null>(null);

  useEffect(() => {
    // Try to fetch from Supabase 'gallery_items' table
    const fetchGallery = async () => {
      const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setItems(data);
      } else {
        // Fallback to mock if empty
        const mock = Array.from({ length: 8 }).map((_, i) => ({ 
            id: String(i), 
            image_url: `https://picsum.photos/seed/${i + 10}/800/600`,
            title: "Plato Delicioso",
            description: "Descripción breve del plato delicioso.",
            price: 15000 + (i * 1000)
        }));
        setItems(mock);
      }
    };
    fetchGallery();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <section id="galeria" className="mx-auto max-w-6xl px-4 py-12">
      <h2 className="mb-8 text-center text-3xl font-bold text-neutral-800">Galería</h2>
      <motion.div 
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((g) => (
          <motion.button 
            key={g.id} 
            variants={item}
            className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow text-left" 
            onClick={() => setOpen(g)}
          >
            <img src={g.image_url} alt={g.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex flex-col justify-end p-4">
               <p className="text-white font-bold">{g.title}</p>
               {g.price && <p className="text-orange-300 text-sm font-semibold">${g.price.toLocaleString()}</p>}
            </div>
          </motion.button>
        ))}
      </motion.div>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.title}>
        {open && (
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
                <img src={open.image_url} alt={open.title} className="h-full w-full object-cover" />
            </div>
            <div>
               <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold">{open.title}</h3>
                 {open.price && <span className="text-2xl font-bold text-[var(--color-primary)]">${open.price.toLocaleString()}</span>}
               </div>
               {open.description && <p className="mt-2 text-neutral-600">{open.description}</p>}
            </div>
            <div className="flex gap-3 pt-2">
                <button 
                  className="w-full rounded-xl bg-[#25D366] py-3 font-bold text-white transition hover:bg-green-600"
                  onClick={() => window.open(`https://wa.me/573136467910?text=Hola,%20quisiera%20saber%20mas%20sobre%20${encodeURIComponent(open.title)}`, '_blank')}
                >
                  Preguntar por WhatsApp
                </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
