"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import type { Dish, Category } from "../../types";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../ui/Card";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

export default function Menu() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<string | "all">("all");
  const [selected, setSelected] = useState<Dish | null>(null);

  useEffect(() => {
    supabase.from("categories").select("*").order("sort_order", { ascending: true }).then(({ data }) => setCategories(data || []));
    supabase.from("dishes").select("*").order("sort_order", { ascending: true }).then(({ data }) => setDishes(data || []));
  }, []);

  const filtered = useMemo(() => (active === "all" ? dishes : dishes.filter((d) => d.category_id === active)), [dishes, active]);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <button
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
            active === "all" ? "bg-neutral-900 text-white shadow-lg scale-105" : "bg-white text-neutral-600 hover:bg-neutral-100"
          }`}
          onClick={() => setActive("all")}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
              active === c.id ? "bg-neutral-900 text-white shadow-lg scale-105" : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
            onClick={() => setActive(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((dish) => (
            <motion.div
              layout
              key={dish.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(dish)}
              className="cursor-pointer"
            >
              <Card hover className="h-full overflow-hidden border-none bg-white/80 backdrop-blur-sm">
                <div className="aspect-video w-full overflow-hidden bg-neutral-100 relative">
                  {dish.image_url ? (
                    <img src={dish.image_url} alt={dish.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-400">
                      <span className="text-4xl">🍽️</span>
                    </div>
                  )}
                  {dish.featured && (
                    <div className="absolute top-2 right-2 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-bold text-neutral-900 shadow-md">
                      Destacado
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-neutral-800 leading-tight">{dish.name}</h3>
                    <span className="shrink-0 text-lg font-bold text-[var(--color-primary)]">
                      ${dish.price.toLocaleString("es-CO")}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-neutral-500">{dish.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal de Detalle */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="space-y-6">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100">
              {selected.image_url ? (
                <img src={selected.image_url} alt={selected.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-200 text-neutral-400">
                  <span className="text-6xl">🍽️</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[var(--color-primary)]">${selected.price.toLocaleString("es-CO")}</span>
                {selected.available ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Disponible</span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Agotado</span>
                )}
              </div>
              <p className="mt-4 text-neutral-600 leading-relaxed">{selected.description}</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button 
                className="w-full" 
                onClick={() => window.open(`https://wa.me/573136467910?text=Hola,%20quisiera%20pedir%20${encodeURIComponent(selected.name)}`, '_blank')}
              >
                Pedir por WhatsApp
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
