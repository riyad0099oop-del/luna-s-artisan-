import { AdminBrand } from '../types/admin';
import { LocalStorageService } from './baseService';

const brandStorage = new LocalStorageService<AdminBrand>('loleta_admin_brands');

brandStorage.seed([
  {
    id: 'bioderma',
    name: 'Bioderma',
    slug: 'bioderma',
    logo: '/bioderma-logo.png',
    shortDescription: 'ماركة فرنسية طبية',
    order: 1,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'byphasse',
    name: 'Byphasse',
    slug: 'byphasse',
    logo: '/byphasse-logo.png',
    shortDescription: 'للعناية بالشعر والبشرة',
    order: 2,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]);

export const brandService = {
  getAll: async () => brandStorage.getAll().sort((a,b) => a.order - b.order),
  getById: async (id: string) => brandStorage.getById(id),
  create: async (brand: Omit<AdminBrand, 'createdAt' | 'updatedAt'>) => {
    return brandStorage.create({
      ...brand,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },
  update: async (id: string, updates: Partial<AdminBrand>) => {
    return brandStorage.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },
  delete: async (id: string) => brandStorage.delete(id)
};
