import { supabase } from '../lib/supabase';
import type { AdminStoreSettings, AdminPaymentMethod } from '../types/admin';

export const settingsService = {
  getStoreSettings: async (): Promise<AdminStoreSettings & { id: string }> => {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 'global')
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      storeName: data.store_name || '',
      logo: data.logo || '',
      favicon: data.favicon || '',
      whatsapp: data.whatsapp || '',
      phone: data.phone || '',
      email: data.email || '',
      instagram: data.instagram || '',
      address: data.address || '',
      currency: data.currency || '',
      copyright: data.copyright || '',
      aboutText: data.about_text || '',
      homeHeroTitle: data.home_hero_title || '',
      homeHeroSubtitle: data.home_hero_subtitle || ''
    };
  },

  updateStoreSettings: async (updates: Partial<AdminStoreSettings>) => {
    const row: Record<string, any> = {};
    if (updates.storeName !== undefined) row.store_name = updates.storeName;
    if (updates.logo !== undefined) row.logo = updates.logo;
    if (updates.favicon !== undefined) row.favicon = updates.favicon;
    if (updates.whatsapp !== undefined) row.whatsapp = updates.whatsapp;
    if (updates.phone !== undefined) row.phone = updates.phone;
    if (updates.email !== undefined) row.email = updates.email;
    if (updates.instagram !== undefined) row.instagram = updates.instagram;
    if (updates.address !== undefined) row.address = updates.address;
    if (updates.currency !== undefined) row.currency = updates.currency;
    if (updates.copyright !== undefined) row.copyright = updates.copyright;
    if (updates.aboutText !== undefined) row.about_text = updates.aboutText;
    if (updates.homeHeroTitle !== undefined) row.home_hero_title = updates.homeHeroTitle;
    if (updates.homeHeroSubtitle !== undefined) row.home_hero_subtitle = updates.homeHeroSubtitle;
    
    row.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('store_settings')
      .update(row)
      .eq('id', 'global')
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },

  getPaymentMethods: async (): Promise<AdminPaymentMethod[]> => {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    return (data || []).map(row => ({
      id: row.id,
      name: row.name,
      logo: row.logo || undefined,
      accountNumber: row.account_number,
      accountType: row.account_type || undefined,
      isVisible: row.is_visible
    }));
  },

  updatePaymentMethod: async (id: string, updates: Partial<AdminPaymentMethod>) => {
    const row: Record<string, any> = {};
    if (updates.name !== undefined) row.name = updates.name;
    if (updates.logo !== undefined) row.logo = updates.logo;
    if (updates.accountNumber !== undefined) row.account_number = updates.accountNumber;
    if (updates.accountType !== undefined) row.accountType = updates.accountType;
    if (updates.isVisible !== undefined) row.is_visible = updates.isVisible;

    const { data, error } = await supabase
      .from('payment_methods')
      .update(row)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }
};
