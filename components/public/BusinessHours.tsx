"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";

type BusinessHour = {
  id: string;
  day_index: number;
  is_closed: boolean;
  open_time: string;
  close_time: string;
};

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function BusinessHours() {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHours = async () => {
      const { data } = await supabase.from("site_settings").select("value").eq("key", "business_hours").single();
      if (data?.value) {
        setHours(data.value);
      }
      setLoading(false);
    };
    fetchHours();
  }, []);

  if (loading) return null;
  if (hours.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Horarios de Atención</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
        {hours.map((h) => (
          <div key={h.id} className="flex justify-between w-full max-w-xs">
            <span className="text-neutral-500">{DAYS[h.day_index]}</span>
            <span className="font-medium text-neutral-800">
              {h.is_closed ? "Cerrado" : `${h.open_time} - ${h.close_time}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
