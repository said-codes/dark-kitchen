"use client";
import { useRef, useState } from "react";
import Button from "./Button";
import { supabase } from "../../lib/supabase/client";

type Props = {
  bucket: "dish-images" | "gallery" | "assets";
  onUploaded: (url: string) => void;
};

export default function ImageUpload({ bucket, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const onPick = () => inputRef.current?.click();
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    const path = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (!error) {
      const { data: pub } = supabase.storage.from(bucket).getPublicUrl(data.path);
      onUploaded(pub.publicUrl);
    }
    setLoading(false);
  };
  return (
    <div className="space-y-2">
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} />
      {preview && <img src={preview} alt="Preview" className="h-32 w-32 rounded-2xl object-cover" />}
      <Button type="button" onClick={onPick} disabled={loading}>{loading ? "Subiendo..." : "Subir imagen"}</Button>
    </div>
  );
}