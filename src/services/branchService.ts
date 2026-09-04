import { AdminBranch } from '../types/admin';
import { LocalStorageService } from './baseService';

const branchStorage = new LocalStorageService<AdminBranch>('loleta_admin_branches');

branchStorage.seed([
  {
    id: '1',
    name: 'الفرع الرئيسي',
    city: 'صنعاء',
    region: 'حدة',
    address: 'شارع حدة بجوار مول العرب',
    phone: '778293948',
    workingHours: '9:00 ص - 10:00 م',
    order: 1,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]);

export const branchService = {
  getAll: async () => branchStorage.getAll().sort((a,b) => a.order - b.order),
  getById: async (id: string) => branchStorage.getById(id),
  create: async (branch: Omit<AdminBranch, 'id' | 'createdAt' | 'updatedAt'>) => {
    return branchStorage.create({
      ...branch,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  },
  update: async (id: string, updates: Partial<AdminBranch>) => {
    return branchStorage.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },
  delete: async (id: string) => branchStorage.delete(id)
};
