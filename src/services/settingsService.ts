import { AdminStoreSettings, AdminPaymentMethod } from '../types/admin';
import { LocalStorageService } from './baseService';

const settingsStorage = new LocalStorageService<AdminStoreSettings & { id: string }>('loleta_admin_settings');
const paymentStorage = new LocalStorageService<AdminPaymentMethod>('loleta_admin_payments');

settingsStorage.seed([
  {
    id: 'global',
    storeName: 'Loleta Store',
    logo: '/loleta-logo.jpg',
    favicon: '/favicon.ico',
    whatsapp: '967782939488',
    phone: '967782939488',
    email: 'info@loleta.com',
    instagram: 'loleta.store',
    address: 'صنعاء - اليمن',
    currency: 'ر.س',
    copyright: 'جميع الحقوق محفوظة لمتجر لوليتا 2026',
  }
]);

paymentStorage.seed([
  { id: '1', name: 'بنك الكريمي (حساب يمني)', accountNumber: '3002115602', isVisible: true },
  { id: '2', name: 'بنك الكريمي (حساب سعودي)', accountNumber: '3102006916', isVisible: true },
  { id: '3', name: 'جيب', accountNumber: '9331126', isVisible: true },
]);

export const settingsService = {
  getStoreSettings: async () => {
    return settingsStorage.getById('global')!;
  },
  updateStoreSettings: async (updates: Partial<AdminStoreSettings>) => {
    return settingsStorage.update('global', updates);
  },
  getPaymentMethods: async () => paymentStorage.getAll(),
  updatePaymentMethod: async (id: string, updates: Partial<AdminPaymentMethod>) => paymentStorage.update(id, updates)
};
