import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { branchService } from '../../services/branchService';

export const Route = createFileRoute('/admin/branches')({
  component: BranchesManager,
});

function BranchesManager() {
  const { data: branches = [], isLoading } = useQuery({ queryKey: ['adminBranches'], queryFn: branchService.getAll });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">إدارة الفروع</h1>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary-deep transition-colors">
          إضافة فرع
        </button>
      </div>
      
      {isLoading ? (
        <p>جاري التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {branches.map(branch => (
            <div key={branch.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-2">{branch.name}</h3>
              <p className="text-sm text-muted-foreground">{branch.address}</p>
              <p className="text-sm font-bold mt-2" dir="ltr">{branch.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
