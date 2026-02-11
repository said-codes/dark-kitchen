"use client";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { supabase } from "../../lib/supabase/client";
import DishesCrud from "./DishesCrud";
import CategoriesManager from "./CategoriesManager";
import BusinessHoursEditor from "./BusinessHoursEditor";
import GalleryManager from "./GalleryManager";
import SiteSettingsManager from "./SiteSettingsManager";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Panel Admin</h1>
          <p className="text-sm text-neutral-600">Conectado como: {email}</p>
        </div>
        <Button onClick={() => supabase.auth.signOut()}>Cerrar Sesión</Button>
      </div>

      <div className="grid gap-12">
        {/* Configuración General */}
        <div className="space-y-4">
           <h2 className="text-2xl font-bold text-neutral-800 border-l-4 border-[var(--color-primary)] pl-3">Configuración General</h2>
           <SiteSettingsManager />
           <div className="mt-4">
             <BusinessHoursEditor />
           </div>
        </div>

        {/* Gestión del Menú */}
        <div className="space-y-6">
           <div className="border-l-4 border-[var(--color-primary)] pl-3">
             <h2 className="text-2xl font-bold text-neutral-800">Menú / Carta</h2>
             <p className="text-neutral-500">Aquí gestionas los platillos que la gente puede pedir.</p>
           </div>
           <CategoriesManager />
           <DishesCrud />
        </div>

        {/* Galería */}
        <div className="space-y-6">
           <div className="border-l-4 border-[var(--color-primary)] pl-3">
             <h2 className="text-2xl font-bold text-neutral-800">Galería de Fotos</h2>
             <p className="text-neutral-500">Sube fotos destacadas de tus mejores platos para mostrar en la sección de galería.</p>
           </div>
           <GalleryManager />
        </div>
      </div>
    </div>
  );
}
