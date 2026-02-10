"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import ImageUpload from "../ui/ImageUpload";
import Button from "../ui/Button";

type Item = { id: string; url: string; path: string };

export default function GalleryManager() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    load();
  }, []);
  const load = async () => {
    const { data } = await supabase.storage.from("gallery").list(undefined, { limit: 100 });
    const out: Item[] = (data || []).map((d) => {
      const { data: pub } = supabase.storage.from("gallery").getPublicUrl(d.name);
      return { id: d.id as any, url: pub.publicUrl, path: d.name };
    });
    setItems(out);
  };
  const onUploaded = async (_url: string) => {
    await load();
  };
  const remove = async (path: string) => {
    await supabase.storage.from("gallery").remove([path]);
    await load();
  };
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Galería</h2>
      <ImageUpload bucket="gallery" onUploaded={onUploaded} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((g) => (
          <div key={g.path} className="group relative overflow-hidden rounded-2xl">
            <img src={g.url} alt="Foto" className="h-40 w-full object-cover" />
            <div className="absolute inset-0 hidden items-center justify-center bg-black/40 group-hover:flex">
              <Button variant="secondary" onClick={() => remove(g.path)}>Eliminar</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}