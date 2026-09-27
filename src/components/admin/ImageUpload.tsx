import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, label = 'صورة', className = '' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('يرجى رفع ملف صورة صالح');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
      return;
    }

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      toast.success('تم رفع الصورة بنجاح');
    } catch (error: any) {
      toast.error(error.message || 'حدث خطأ أثناء رفع الصورة');
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className={`${className}`}>
      <label className="block text-sm font-bold text-foreground mb-2">{label}</label>
      
      {value ? (
        <div className="relative rounded-2xl overflow-hidden border border-border group bg-[#F8F4EE] aspect-square w-full max-w-sm mx-auto sm:mx-0">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 bg-white rounded-full text-foreground hover:text-primary transition-colors"
              title="تغيير الصورة"
              disabled={isUploading}
            >
              <Upload className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-2 bg-white rounded-full text-red-500 hover:text-red-600 transition-colors"
              title="حذف الصورة"
              disabled={isUploading}
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors flex flex-col items-center justify-center aspect-square w-full max-w-sm mx-auto sm:mx-0 ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-[#F8F4EE]'
          } ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isUploading ? (
            <Loader2 className="size-10 text-primary mb-4 animate-spin" />
          ) : (
            <ImageIcon className="size-10 text-muted-foreground mb-4" />
          )}
          <p className="font-bold text-sm text-foreground mb-1">
            {isUploading ? 'جاري الرفع...' : 'اضغط أو اسحب الصورة هنا'}
          </p>
          {!isUploading && <p className="text-xs text-muted-foreground">PNG, JPG حتى 5MB</p>}
        </div>
      )}
      
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}
