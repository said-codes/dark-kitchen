"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Button from "../ui/Button";
import Input from "../ui/Input";
import ImageUpload from "../ui/ImageUpload";
import { useToast } from "../ui/Toast";

export default function SiteSettingsManager() {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const { notify } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("site_settings").select("*");
    if (data) {
      const map: Record<string, any> = {};
      data.forEach((s) => (map[s.key] = s.value));
      setSettings(map);
    }
  };

  const save = async (key: string, value: any) => {
    const { error } = await supabase.from("site_settings").upsert({ key, value });
    if (!error) {
      setSettings((prev) => ({ ...prev, [key]: value }));
      notify({ message: "Guardado", type: "success" });
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Configuración General</h2>
      <div className="rounded-2xl border p-4 space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Imagen de Fondo Hero</label>
          {settings.hero_bg && (
             <img src={settings.hero_bg} alt="Hero BG" className="h-32 w-full object-cover rounded-xl mb-2" />
          )}
          <ImageUpload bucket="assets" onUploaded={(url) => save("hero_bg", url)} />
        </div>
        
        <Input 
          label="Título Hero" 
          value={settings.hero_title || ""} 
          onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
          onBlur={() => save("hero_title", settings.hero_title)}
        />
        
        <Input 
          label="WhatsApp Number" 
          value={settings.whatsapp || ""} 
          onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
          onBlur={() => save("whatsapp", settings.whatsapp)}
        />
      </div>
    </section>
  );
}
