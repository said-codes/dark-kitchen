"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ImageUpload from "../ui/ImageUpload";
import { useToast } from "../ui/Toast";

type GalleryItem = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  image_url: string;
};

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editing, setEditing] = useState<Partial<GalleryItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const { notify } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("gallery_items").select("*").order("created_at", { ascending: false });
    setItems(data || []);
  };

  const save = async () => {
    if (!editing?.image_url || !editing?.title) {
      notify({ message: "Imagen y título requeridos", type: "error" });
      return;
    }

    const payload = {
      id: editing.id,
      title: editing.title,
      description: editing.description || null,
      price: editing.price || null,
      image_url: editing.image_url
    };

    const { error } = await supabase.from("gallery_items").upsert(payload);
    if (!error) {
      notify({ message: "Guardado", type: "success" });
      setEditing(null);
      setIsNew(false);
      load();
    } else {
      notify({ message: "Error al guardar", type: "error" });
    }
  };

  const remove = async (id: string) => {
    await supabase.from("gallery_items").delete().eq("id", id);
    load();
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Galería (Items destacados)</h2>
        <Button onClick={() => { setEditing({}); setIsNew(true); }}>Nuevo Item</Button>
      </div>

      {(isNew || editing) && (
        <div className="rounded-2xl border p-4 bg-neutral-50 space-y-4">
           <h3 className="font-medium">{isNew ? "Nuevo Item" : "Editar Item"}</h3>
           <div className="grid gap-4 sm:grid-cols-2">
             <div className="space-y-4">
               <Input 
                 label="Título" 
                 value={editing?.title || ""} 
                 onChange={(e) => setEditing({ ...editing, title: e.target.value })} 
               />
               <Input 
                 label="Descripción (Opcional)" 
                 value={editing?.description || ""} 
                 onChange={(e) => setEditing({ ...editing, description: e.target.value })} 
               />
               <Input 
                 type="number"
                 label="Precio (Opcional)" 
                 value={String(editing?.price || "")} 
                 onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} 
               />
             </div>
             <div>
                <label className="text-sm font-medium mb-2 block">Imagen</label>
                {editing?.image_url && (
                  <img src={editing.image_url} alt="Preview" className="h-32 w-full object-cover rounded-xl mb-2" />
                )}
                <ImageUpload bucket="gallery" onUploaded={(url) => setEditing({ ...editing, image_url: url })} />
             </div>
           </div>
           <div className="flex gap-2">
             <Button onClick={save}>Guardar</Button>
             <Button variant="ghost" onClick={() => { setEditing(null); setIsNew(false); }}>Cancelar</Button>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.id} className="group relative overflow-hidden rounded-2xl border bg-white">
            <img src={g.image_url} alt={g.title} className="h-40 w-full object-cover" />
            <div className="p-3">
               <div className="font-bold truncate">{g.title}</div>
               {g.price && <div className="text-sm text-[var(--color-primary)]">${g.price.toLocaleString()}</div>}
            </div>
            <div className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex gap-2">
              <Button variant="secondary" onClick={() => { setEditing(g); setIsNew(false); }}>Editar</Button>
              <Button variant="secondary" onClick={() => remove(g.id)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
