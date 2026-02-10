"use client";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import type { Dish, Category } from "../../types";
import { motion } from "framer-motion";
import Card from "../ui/Card";

export default function Menu() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<string | "all">("all");
  useEffect(() => {
    supabase.from("categories").select("*").order("order", { ascending: true }).then(({ data }) => setCategories(data || []));
    supabase.from("dishes").select("*").order("order", { ascending: true }).then(({ data }) => setDishes(data || []));
  }, []);
  const filtered = useMemo(() => (active === "all" ? dishes : dishes.filter((d) => d.category_id === active)), [dishes, active]);
  return (
    <section id="menu" className="mx-auto max-w-6xl px-4">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm ${active === "all" ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
          onClick={() => setActive("all")}
        >
          Todos
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`rounded-full px-4 py-2 text-sm ${active === c.id ? "bg-neutral-900 text-white" : "bg-neutral-100"}`}
            onClick={() => setActive(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {filtered.map((dish, i) => (
          <motion.div
            key={dish.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card hover>
              <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-neutral-100" />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{dish.name}</h3>
                  <span className="text-[var(--color-primary)] font-bold">${dish.price.toFixed(0)}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{dish.description}</p>
                <div className="mt-3 text-xs text-neutral-500">{dish.available ? "Disponible" : "No disponible"}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}