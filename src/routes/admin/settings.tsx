import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../../services/settingsService';
import { toast } from 'sonner';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsManager,
});

function SettingsManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('general');
  const [deletePaymentId, setDeletePaymentId] = useState<string | null>(null);

  const { data: settings, isLoading: settingsLoading } = useQuery({ queryKey: ['adminSettings'], queryFn: settingsService.getStoreSettings });
  const { data: payments, isLoading: paymentsLoading } = useQuery({ queryKey: ['adminPayments'], queryFn: settingsService.getPaymentMethods });
  
  const updateSettingsMutation = useMutation({
    mutationFn: settingsService.updateStoreSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      toast.success('تم حفظ الإعدادات بنجاح');
    }
  });

  const updatePaymentMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: any }) => settingsService.updatePaymentMethod(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPayments'] });
      toast.success('تم التحديث بنجاح');
    }
  });

  if (settingsLoading || !settings) return <div className="p-8 text-center text-muted-foreground">جاري التحميل...</div>;

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold text-foreground">الإعدادات والمحتوى</h1>
      
      <div className="flex gap-2 border-b border-border pb-2 overflow-x-auto scrollbar-hide">
        {['general', 'payment', 'home', 'about', 'contact'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-bold whitespace-nowrap rounded-t-xl transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'bg-[#F8F4EE] text-muted-foreground hover:bg-primary/10'}`}
          >
            {tab === 'general' ? 'إعدادات المتجر' : tab === 'payment' ? 'بيانات الدفع' : tab === 'home' ? 'الرئيسية' : tab === 'about' ? 'من نحن' : 'تواصل معنا'}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-border shadow-sm">
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block font-bold text-sm mb-2">اسم المتجر</label>
              <input type="text" value={settings.storeName || ''} onChange={e => updateSettingsMutation.mutate({ storeName: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">العملة</label>
              <input type="text" value={settings.currency || ''} onChange={e => updateSettingsMutation.mutate({ currency: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">نص حقوق النشر (الفوتر)</label>
              <input type="text" value={settings.copyright || ''} onChange={e => updateSettingsMutation.mutate({ copyright: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">طرق الدفع المتاحة</h2>
              <button className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold hover:bg-primary/20 transition-colors">
                <Plus className="size-4" /> إضافة حساب
              </button>
            </div>
            
            {paymentsLoading ? (
              <p>جاري تحميل بيانات الدفع...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {payments?.map(payment => (
                  <div key={payment.id} className="border border-border rounded-xl p-4 bg-[#F8F4EE] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <input 
                        type="text" 
                        value={payment.name || ''}
                        onChange={e => updatePaymentMutation.mutate({ id: payment.id, updates: { name: e.target.value } })}
                        className="font-bold bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:bg-white px-2 py-1 outline-none transition-all w-2/3"
                      />
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input 
                          type="checkbox" 
                          checked={payment.isVisible}
                          onChange={e => updatePaymentMutation.mutate({ id: payment.id, updates: { isVisible: e.target.checked } })}
                          className="rounded text-primary focus:ring-primary"
                        />
                        <span>مفعل</span>
                      </label>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">رقم الحساب</label>
                      <input 
                        type="text" 
                        value={payment.accountNumber || ''}
                        onChange={e => updatePaymentMutation.mutate({ id: payment.id, updates: { accountNumber: e.target.value } })}
                        dir="ltr"
                        className="w-full font-mono bg-white rounded-lg px-3 py-2 border border-border text-left outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground block mb-1">نوع الحساب (اختياري)</label>
                      <input 
                        type="text" 
                        value={payment.accountType || ''}
                        onChange={e => updatePaymentMutation.mutate({ id: payment.id, updates: { accountType: e.target.value } })}
                        className="w-full bg-white rounded-lg px-3 py-2 border border-border outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block font-bold text-sm mb-2">رقم الواتساب (لإتمام الطلبات)</label>
              <input type="text" dir="ltr" value={settings.whatsapp || ''} onChange={e => updateSettingsMutation.mutate({ whatsapp: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none text-left" placeholder="مثال: 967700000000" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">رقم الهاتف العام</label>
              <input type="text" dir="ltr" value={settings.phone || ''} onChange={e => updateSettingsMutation.mutate({ phone: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none text-left" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">حساب الانستجرام</label>
              <input type="text" dir="ltr" value={settings.instagram || ''} onChange={e => updateSettingsMutation.mutate({ instagram: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none text-left" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">البريد الإلكتروني</label>
              <input type="email" dir="ltr" value={settings.email || ''} onChange={e => updateSettingsMutation.mutate({ email: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none text-left" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">العنوان (المدينة - الشارع)</label>
              <textarea value={settings.address || ''} onChange={e => updateSettingsMutation.mutate({ address: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none" rows={3} />
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <label className="block font-bold text-sm mb-2">العنوان الرئيسي (Hero Title)</label>
              <input type="text" value={settings.homeHeroTitle || ''} onChange={e => updateSettingsMutation.mutate({ homeHeroTitle: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="مثال: لوليتا ستور، حيث الأناقة" />
            </div>
            <div>
              <label className="block font-bold text-sm mb-2">النص الفرعي (Hero Subtitle)</label>
              <textarea value={settings.homeHeroSubtitle || ''} onChange={e => updateSettingsMutation.mutate({ homeHeroSubtitle: e.target.value })} className="w-full bg-[#F8F4EE] rounded-xl px-4 py-3 border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none" rows={3} placeholder="اكتب وصفاً جذاباً يظهر في أول صفحة..." />
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <label className="block font-bold text-sm mb-2">نص (من نحن)</label>
              <p className="text-xs text-muted-foreground mb-3">هذا النص سيظهر في صفحة "عن المتجر".</p>
              <textarea 
                value={settings.aboutText || ''} 
                onChange={e => updateSettingsMutation.mutate({ aboutText: e.target.value })} 
                className="w-full bg-[#F8F4EE] rounded-xl px-4 py-4 border border-border focus:ring-2 focus:ring-primary/20 outline-none resize-none leading-relaxed min-h-[250px]" 
                placeholder="اكتب قصة متجرك ورؤيتك هنا..." 
              />
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={!!deletePaymentId}
        title="حذف وسيلة الدفع"
        message="هل أنت متأكد من حذف حساب الدفع هذا؟"
        onConfirm={() => setDeletePaymentId(null)}
        onCancel={() => setDeletePaymentId(null)}
      />
    </div>
  );
}
