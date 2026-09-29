import { supabase } from "../lib/supabase";
import type { AdminProduct } from "../types/admin";

// Helper: convert DB row (snake_case) to AdminProduct (camelCase)
function toProduct(row: any): AdminProduct {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    mainImage: row.main_image || "",
    additionalImages: row.additional_images || [],
    shortDescription: row.short_description || "",
    fullDescription: row.full_description || "",
    price: Number(row.price),
    quantity: row.quantity,
    type: row.type,
    brandId: row.brand_id || undefined,
    isNew: row.is_new,
    isBestseller: row.is_bestseller,
    showInFeatured: row.show_in_featured,
    hasOffer: row.has_offer,
    oldPrice: row.old_price ? Number(row.old_price) : undefined,
    offerBadge: row.offer_badge || "",
    isVisible: row.is_visible,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Helper: convert AdminProduct (camelCase) to DB row (snake_case)
function toRow(product: Partial<AdminProduct>): Record<string, any> {
  const row: Record<string, any> = {};
  if (product.name !== undefined) row.name = product.name;
  if (product.slug !== undefined) row.slug = product.slug;
  if (product.mainImage !== undefined) row.main_image = product.mainImage;
  if (product.additionalImages !== undefined) row.additional_images = product.additionalImages;
  if (product.shortDescription !== undefined) row.short_description = product.shortDescription;
  if (product.fullDescription !== undefined) row.full_description = product.fullDescription;
  if (product.price !== undefined) row.price = product.price;
  if (product.quantity !== undefined) row.quantity = product.quantity;
  if (product.type !== undefined) row.type = product.type;
  if (product.brandId !== undefined) row.brand_id = product.brandId || null;
  if (product.isNew !== undefined) row.is_new = product.isNew;
  if (product.isBestseller !== undefined) row.is_bestseller = product.isBestseller;
  if (product.showInFeatured !== undefined) row.show_in_featured = product.showInFeatured;
  if (product.hasOffer !== undefined) row.has_offer = product.hasOffer;
  if (product.oldPrice !== undefined) row.old_price = product.oldPrice;
  if (product.offerBadge !== undefined) row.offer_badge = product.offerBadge;
  if (product.isVisible !== undefined) row.is_visible = product.isVisible;
  return row;
}

export const productService = {
  getAll: async (): Promise<AdminProduct[]> => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data || []).map(toProduct);
  },

  getById: async (id: string): Promise<AdminProduct | undefined> => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error) return undefined;
    return toProduct(data);
  },

  create: async (
    product: Omit<AdminProduct, "id" | "createdAt" | "updatedAt">,
  ): Promise<AdminProduct> => {
    const row = toRow(product);
    const { data, error } = await supabase.from("products").insert(row).select().single();
    if (error) throw error;
    return toProduct(data);
  },

  update: async (id: string, updates: Partial<AdminProduct>): Promise<AdminProduct | undefined> => {
    const row = toRow(updates);
    row.updated_at = new Date().toISOString();
    const { data, error } = await supabase
      .from("products")
      .update(row)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return toProduct(data);
  },

  delete: async (id: string): Promise<boolean> => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return true;
  },
};
