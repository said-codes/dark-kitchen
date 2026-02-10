"use client";
import { useEffect, useState } from "react";
import type { BusinessHour } from "../../types";
import { supabase } from "../../lib/supabase/client";
import Button from "../ui/Button";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function BusinessHoursEditor() {
  const [items, setItems] = useState<BusinessHour[]>([]);
  useEffect(() => {
    supabase.from("business_hours").select("*").order("day_of_week", { ascending: true }).then(({ data }) => setItems(data || []));
  }, []);
  const save = async (h: BusinessHour) => {
    await supabase.from("business_hours").update(h).eq("id", h.id);
  };
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Horarios</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((h) => (
          <div key={h.id} className="rounded-2xl border p-3">
            <div className="font-medium">{days[h.day_of_week]}</div>
            <div className="mt-2 flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={h.is_closed} onChange={(e) => setItems((x) => x.map((i) => (i.id === h.id ? { ...i, is_closed: e.target.checked } : i)))} />
                Cerrado
              </label>
            </div>
            {!h.is_closed && (
              <div className="mt-2 flex gap-2">
                <input type="time" value={h.open_time ?? "08:00"} onChange={(e) => setItems((x) => x.map((i) => (i.id === h.id ? { ...i, open_time: e.target.value } : i)))} className="rounded-2xl border p-2" />
                <input type="time" value={h.close_time ?? "18:00"} onChange={(e) => setItems((x) => x.map((i) => (i.id === h.id ? { ...i, close_time: e.target.value } : i)))} className="rounded-2xl border p-2" />
              </div>
            )}
            <div className="mt-3">
              <Button onClick={() => save(items.find((i) => i.id === h.id)!)}>Guardar</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}