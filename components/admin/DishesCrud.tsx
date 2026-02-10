"use client";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { supabase } from "../../lib/supabase/client";
import type { Dish, Category } from "../../types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import ImageUpload from "../ui/ImageUpload";
import { useToast } from "../ui/Toast";

const dishSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  description: z.string().min(2),
  price: z.number().min(0),
  category_id: z.string(),
  image_url: z.string().url().nullable().optional(),
  available: z.boolean().optional().default(true),
  featured: z.boolean().optional().default(false),
  order: z.number().int().min(0).optional().default(0)
});

export default function DishesCrud() {
  const [items, setItems] = useState<Dish[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Dish> | null>(null);
  const { notify } = useToast();
  useEffect(() => {
    supabase.from("categories").select("*").order("order", { ascending: true }).then(({ data }) => setCats(data || []));
    supabase.from("dishes").select("*").order("order", { ascending: true }).then(({ data }) => setItems(data || []));
  }, []);
  const onSave = async () => {
    try {
      const parsed = dishSchema.parse({
        id: editing?.id,
        name: editing?.name,
        description: editing?.description,
        price: Number(editing?.price || 0),
        category_id: String(editing?.category_id),
        image_url: editing?.image_url ?? null,
        available: Boolean(editing?.available ?? true),
        featured: Boolean(editing?.featured ?? false),
        order: Number(editing?.order || 0)
      });
      const { error } = await supabase.from("dishes").upsert(parsed, { onConflict: "id" });
      if (error) throw error;
      notify({ message: "Guardado", type: "success" });
      setOpen(false);
      const { data } = await supabase.from("dishes").select("*").order("order", { ascending: true });
      setItems(data || []);
    } catch (e) {
      notify({ message: "Datos inválidos", type: "error" });
    }
  };
  const onDelete = async (id: string) => {
    const { error } = await supabase.from("dishes").delete().eq("id", id);
    if (!error) {
      setItems((x) => x.filter((i) => i.id !== id));
      notify({ message: "Eliminado", type: "success" });
    }
  };
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Platillos</h2>
        <Button onClick={() => { setEditing({ available: true, featured: false, order: 0 }); setOpen(true); }}>Nuevo</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <div key={d.id} className="rounded-2xl border p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm text-neutral-600">{d.description}</div>
              </div>
              <div className="text-[var(--color-primary)] font-bold">${d.price.toFixed(0)}</div>
            </div>
            <div className="mt-2 text-xs text-neutral-500">{d.available ? "Disponible" : "No disponible"}</div>
            <div className="mt-3 flex gap-2">
              <Button variant="ghost" onClick={() => { setEditing(d); setOpen(true); }}>Editar</Button>
              <Button variant="ghost" onClick={() => onDelete(d.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={editing?.id ? "Editar plato" : "Nuevo plato"}>
        <div className="space-y-3">
          <Input id="name" label="Nombre" value={editing?.name ?? ""} onChange={(e) => setEditing({ ...editing!, name: e.target.value })} />
          <Input id="description" label="Descripción" value={editing?.description ?? ""} onChange={(e) => setEditing({ ...editing!, description: e.target.value })} />
          <Input id="price" type="number" label="Precio" value={String(editing?.price ?? "")} onChange={(e) => setEditing({ ...editing!, price: Number(e.target.value) })} />
          <div>
            <label className="text-sm font-medium">Categoría</label>
            <select className="mt-1 w-full rounded-2xl border p-2" value={editing?.category_id ?? ""} onChange={(e) => setEditing({ ...editing!, category_id: e.target.value })}>
              <option value="" disabled>Selecciona</option>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={Boolean(editing?.available)} onChange={(e) => setEditing({ ...editing!, available: e.target.checked })} />
              Disponible
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={Boolean(editing?.featured)} onChange={(e) => setEditing({ ...editing!, featured: e.target.checked })} />
              Destacado
            </label>
          </div>
          <Input id="order" type="number" label="Orden" value={String(editing?.order ?? 0)} onChange={(e) => setEditing({ ...editing!, order: Number(e.target.value) })} />
          <ImageUpload bucket="dish-images" onUploaded={(url) => setEditing({ ...editing!, image_url: url })} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={onSave}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}