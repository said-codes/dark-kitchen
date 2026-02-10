"use client";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { supabase } from "../../lib/supabase/client";
import DishesCrud from "./DishesCrud";
import CategoriesManager from "./CategoriesManager";
import BusinessHoursEditor from "./BusinessHoursEditor";
import GalleryManager from "./GalleryManager";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Panel Admin</h1>
          <p className="text-sm text-neutral-600">{email}</p>
        </div>
        <Button onClick={() => supabase.auth.signOut()}>Salir</Button>
      </div>
      <div className="grid gap-8">
        <DishesCrud />
        <CategoriesManager />
        <BusinessHoursEditor />
        <GalleryManager />
      </div>
    </div>
  );
}