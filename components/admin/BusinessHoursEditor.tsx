"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import Button from "../ui/Button";
import { useToast } from "../ui/Toast";

type BusinessHour = {
  id: string; // "lunes", "martes", etc.
  day_index: number; // 0-6
  is_closed: boolean;
  open_time: string;
  close_time: string;
};

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const DEFAULT_HOURS: BusinessHour[] = DAYS.map((d, i) => ({
  id: d.toLowerCase(),
  day_index: i,
  is_closed: false,
  open_time: "08:00",
  close_time: "20:00"
}));

export default function BusinessHoursEditor() {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const { notify } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const { data } = await supabase.from("site_settings").select("value").eq("key", "business_hours").single();
    if (data?.value) {
      setHours(data.value);
    } else {
      setHours(DEFAULT_HOURS);
    }
  };

  const save = async () => {
    const { error } = await supabase.from("site_settings").upsert({ key: "business_hours", value: hours });
    if (!error) {
      notify({ message: "Horarios guardados", type: "success" });
    } else {
      notify({ message: "Error al guardar", type: "error" });
    }
  };

  const update = (index: number, changes: Partial<BusinessHour>) => {
    setHours(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...changes };
      return copy;
    });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Horarios de Atención</h2>
        <Button onClick={save}>Guardar Todos</Button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {hours.map((h, i) => (
          <div key={h.id} className="rounded-2xl border p-3 bg-white">
            <div className="flex items-center justify-between mb-2">
               <div className="font-bold">{DAYS[h.day_index]}</div>
               <label className="flex items-center gap-2 text-sm cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={h.is_closed} 
                   onChange={(e) => update(i, { is_closed: e.target.checked })} 
                   className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                 />
                 Cerrado
               </label>
            </div>
            
            {!h.is_closed && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-neutral-500 block mb-1">Abre</label>
                  <input 
                    type="time" 
                    value={h.open_time} 
                    onChange={(e) => update(i, { open_time: e.target.value })} 
                    className="w-full rounded-xl border p-2 text-sm" 
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-neutral-500 block mb-1">Cierra</label>
                  <input 
                    type="time" 
                    value={h.close_time} 
                    onChange={(e) => update(i, { close_time: e.target.value })} 
                    className="w-full rounded-xl border p-2 text-sm" 
                  />
                </div>
              </div>
            )}
            {h.is_closed && <div className="text-sm text-neutral-400 italic py-3 text-center">No hay servicio</div>}
          </div>
        ))}
      </div>
    </section>
  );
}
