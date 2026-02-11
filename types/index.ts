export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
};

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  image_url: string | null;
  available: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
};

export type BusinessHour = {
  id: string;
  day_of_week: number;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
};