import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../services/settingsService';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsManager,
});

function SettingsManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('general');

  const { data: settings, isLoading } = useQuery({ queryKey: ['adminSettings'], queryFn: settingsService.getStoreSettings });
  
  const updateMutation = useMutation({
    mutationFn: settingsService.updateStoreSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      toast.success('تم حفظ الإعدادات بنجاح');
    }
  });

  if (isLoading || !settings) return <p>جاري التحميل...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">الإعدادات والمحتوى</h1>
      
      <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto">
        {['general', 'payment', 'home', 'about', 'contact'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-bold whitespace-nowrap rounded-t-xl ${activeTab === tab ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
          >
            {tab === 'general' ? 'إعدادات المتجر' : tab === 'payment' ? 'بيانات الدفع' : tab === 'home' ? 'الرئيسية' : tab === 'about' ? 'من نحن' : 'تواصل معنا'}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
        {activeTab === 'general' && (
          <div className="space-y-4 max-w-xl">
            <div>
              <label className="block font-bold mb-2">اسم المتجر</label>
              <input type="text" value={settings.storeName} onChange={e => updateMutation.mutate({ storeName: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-2" />
            </div>
            <div>
              <label className="block font-bold mb-2">رقم الواتساب</label>
              <input type="text" dir="ltr" value={settings.whatsapp} onChange={e => updateMutation.mutate({ whatsapp: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-2 text-left" />
            </div>
            <div>
              <label className="block font-bold mb-2">حساب الانستجرام</label>
              <input type="text" dir="ltr" value={settings.instagram} onChange={e => updateMutation.mutate({ instagram: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-2 text-left" />
            </div>
          </div>
        )}
        
        {activeTab !== 'general' && (
          <p className="text-muted-foreground">الواجهة قيد التطوير...</p>
        )}
      </div>
    </div>
  );
}
