"use client";
import { useEffect, useState } from "react";
import type { Category } from "../../types";
import { supabase } from "../../lib/supabase/client";
import Button from "../ui/Button";

export default function CategoriesManager() {
  const [items, setItems] = useState<Category[]>([]);
  const [name, setName] = useState("");
  useEffect(() => {
    supabase.from("categories").select("*").order("order", { ascending: true }).then(({ data }) => setItems(data || []));
  }, []);
  const move = async (index: number, dir: -1 | 1) => {
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= items.length) return;
    const copy = [...items];
    [copy[index], copy[newIdx]] = [copy[newIdx], copy[index]];
    setItems(copy);
    await Promise.all(copy.map((c, i) => supabase.from("categories").update({ order: i }).eq("id", c.id)));
  };
  const add = async () => {
    if (!name.trim()) return;
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    const { data } = await supabase.from("categories").insert({ name, slug, order: items.length }).select("*").single();
    if (data) setItems((x) => [...x, data as Category]);
    setName("");
  };
  const remove = async (id: string) => {
    await supabase.from("categories").delete().eq("id", id);
    setItems((x) => x.filter((i) => i.id !== id));
  };
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Categorías</h2>
      <div className="flex gap-2">
        <input className="flex-1 rounded-2xl border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nueva categoría" />
        <Button onClick={add}>Agregar</Button>
      </div>
      <div className="space-y-2">
        {items.map((c, i) => (
          <div key={c.id} className="flex items-center justify-between rounded-2xl border p-2">
            <div className="font-medium">{c.name}</div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={() => move(i, -1)}>↑</Button>
              <Button variant="ghost" onClick={() => move(i, 1)}>↓</Button>
              <Button variant="ghost" onClick={() => remove(c.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}