export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  mainImage: string;
  additionalImages: string[];
  shortDescription: string;
  fullDescription: string;
  price: number;
  quantity: number;
  type: "loleta" | "care";
  brandId?: string;
  isNew: boolean;
  isBestseller: boolean;
  showInFeatured: boolean;
  hasOffer: boolean;
  oldPrice?: number;
  offerBadge?: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBrand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage?: string;
  shortDescription: string;
  fullDescription?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminBranch {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  workingHours: string;
  mapLink?: string;
  latitude?: number;
  longitude?: number;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPaymentMethod {
  id: string;
  name: string;
  logo?: string;
  accountNumber: string;
  accountType?: string;
  isVisible: boolean;
}

export interface AdminStoreSettings {
  storeName: string;
  logo: string;
  favicon: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  address: string;
  currency: string;
  copyright: string;
}
