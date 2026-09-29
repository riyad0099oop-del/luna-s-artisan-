import { supabase } from "../lib/supabase";
import type { AdminBrand } from "../types/admin";

function toBrand(row: any): AdminBrand {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    logo: row.logo || "",
    coverImage: row.cover_image || "",
    shortDescription: row.short_description || "",
    fullDescription: row.full_description || "",
    order: row.display_order,
    isVisible: row.is_visible,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(brand: Partial<AdminBrand>): Record<string, any> {
  const row: Record<string, any> = {};
  if (brand.name !== undefined) row.name = brand.name;
  if (brand.slug !== undefined) row.slug = brand.slug;
  if (brand.logo !== undefined) row.logo = brand.logo;
  if (brand.coverImage !== undefined) row.cover_image = brand.coverImage;
  if (brand.shortDescription !== undefined) row.short_description = brand.shortDescription;
  if (brand.fullDescription !== undefined) row.full_description = brand.fullDescription;
  if (brand.order !== undefined) row.display_order = brand.order;
  if (brand.isVisible !== undefined) row.is_visible = brand.isVisible;
  return row;
}

export const brandService = {
  getAll: async (): Promise<AdminBrand[]> => {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data || []).map(toBrand);
  },

  getById: async (id: string): Promise<AdminBrand | undefined> => {
    const { data, error } = await supabase.from("brands").select("*").eq("id", id).single();
    if (error) return undefined;
    return toBrand(data);
  },

  create: async (
    brand: Omit<AdminBrand, "id" | "createdAt" | "updatedAt">,
  ): Promise<AdminBrand> => {
    const row = toRow(brand);
    const { data, error } = await supabase.from("brands").insert(row).select().single();
    if (error) throw error;
    return toBrand(data);
  },

  update: async (id: string, updates: Partial<AdminBrand>): Promise<AdminBrand | undefined> => {
    const row = toRow(updates);
    row.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from("brands")
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toBrand(data);
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("brands").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
