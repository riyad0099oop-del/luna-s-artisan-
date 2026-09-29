import { supabase } from "../lib/supabase";
import type { AdminBranch } from "../types/admin";

function toBranch(row: any): AdminBranch {
  return {
    id: row.id,
    name: row.name,
    city: row.city || "",
    region: row.region || "",
    address: row.address || "",
    phone: row.phone || "",
    workingHours: row.working_hours || "",
    mapLink: row.map_link || "",
    latitude: row.latitude,
    longitude: row.longitude,
    order: row.display_order,
    isVisible: row.is_visible,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(branch: Partial<AdminBranch>): Record<string, any> {
  const row: Record<string, any> = {};
  if (branch.name !== undefined) row.name = branch.name;
  if (branch.city !== undefined) row.city = branch.city;
  if (branch.region !== undefined) row.region = branch.region;
  if (branch.address !== undefined) row.address = branch.address;
  if (branch.phone !== undefined) row.phone = branch.phone;
  if (branch.workingHours !== undefined) row.working_hours = branch.workingHours;
  if (branch.mapLink !== undefined) row.map_link = branch.mapLink;
  if (branch.latitude !== undefined) row.latitude = branch.latitude;
  if (branch.longitude !== undefined) row.longitude = branch.longitude;
  if (branch.order !== undefined) row.display_order = branch.order;
  if (branch.isVisible !== undefined) row.is_visible = branch.isVisible;
  return row;
}

export const branchService = {
  getAll: async (): Promise<AdminBranch[]> => {
    const { data, error } = await supabase
      .from("branches")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) throw error;
    return (data || []).map(toBranch);
  },

  getById: async (id: string): Promise<AdminBranch | undefined> => {
    const { data, error } = await supabase.from("branches").select("*").eq("id", id).single();
    if (error) return undefined;
    return toBranch(data);
  },

  create: async (
    branch: Omit<AdminBranch, "id" | "createdAt" | "updatedAt">,
  ): Promise<AdminBranch> => {
    const row = toRow(branch);
    const { data, error } = await supabase.from("branches").insert(row).select().single();
    if (error) throw error;
    return toBranch(data);
  },

  update: async (id: string, updates: Partial<AdminBranch>): Promise<AdminBranch | undefined> => {
    const row = toRow(updates);
    row.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from("branches")
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toBranch(data);
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("branches").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
