import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { brandService } from '../../services/brandService';

export const Route = createFileRoute('/admin/brands')({
  component: BrandsManager,
});

function BrandsManager() {
  const { data: brands = [], isLoading } = useQuery({ queryKey: ['adminBrands'], queryFn: brandService.getAll });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الشركات</h1>
          <p className="text-sm text-muted-foreground mt-1">عرض وتعديل الشركات المتوفرة في المتجر</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors">
          إضافة شركة
        </button>
      </div>
      
      {isLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map(brand => (
            <div key={brand.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="font-bold text-xl">{brand.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{brand.name}</h3>
                <p className="text-sm text-muted-foreground">{brand.shortDescription}</p>
                <div className="mt-2">
                  <span className="text-xs bg-muted px-2 py-1 rounded font-bold">ترتيب: {brand.order}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
