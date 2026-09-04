import { AdminProduct } from '../types/admin';
import { LocalStorageService } from './baseService';

const productStorage = new LocalStorageService<AdminProduct>('loleta_admin_products');

productStorage.seed([
  {
    id: '1',
    name: 'سيروم زبدة الشيا',
    slug: 'shea-butter-serum',
    mainImage: '/product-oil.jpg',
    additionalImages: [],
    shortDescription: 'ترطيب عميق وحماية للبشرة',
    fullDescription: 'سيروم غني بزبدة الشيا يوفر ترطيباً عميقاً ويعيد للبشرة نضارتها...',
    price: 32,
    quantity: 15,
    type: 'loleta',
    isNew: true,
    isBestseller: true,
    showInFeatured: true,
    hasOffer: true,
    oldPrice: 45,
    offerBadge: 'خصم مميز',
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'غسول بيوديرما الأزرق',
    slug: 'bioderma-blue',
    mainImage: '/product-soap.jpg',
    additionalImages: [],
    shortDescription: 'غسول للبشرة الدهنية',
    fullDescription: 'ينظف بعمق ويزيل الشوائب...',
    price: 95,
    quantity: 0,
    type: 'care',
    brandId: 'bioderma',
    isNew: false,
    isBestseller: true,
    showInFeatured: false,
    hasOffer: false,
    isVisible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]);

export const productService = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 300));
    return productStorage.getAll();
  },
  getById: async (id: string) => {
    await new Promise(r => setTimeout(r, 200));
    return productStorage.getById(id);
  },
  create: async (product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => {
    await new Promise(r => setTimeout(r, 500));
    const newProduct: AdminProduct = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return productStorage.create(newProduct);
  },
  update: async (id: string, updates: Partial<AdminProduct>) => {
    await new Promise(r => setTimeout(r, 500));
    return productStorage.update(id, { ...updates, updatedAt: new Date().toISOString() });
  },
  delete: async (id: string) => {
    await new Promise(r => setTimeout(r, 400));
    return productStorage.delete(id);
  }
};
