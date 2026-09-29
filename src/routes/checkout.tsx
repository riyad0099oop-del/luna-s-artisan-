import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  MapPin,
  Store,
  ChevronRight,
  CheckCircle2,
  Copy,
  ShoppingBag,
  Edit2,
  Wallet,
  User,
  Phone,
  FileText,
  CreditCard,
  Receipt,
  Navigation,
} from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

interface CheckoutData {
  customer: {
    name: string;
    phone: string;
  };
  delivery: {
    method: "home_delivery" | "store_pickup" | null;
    latitude: number | null;
    longitude: number | null;
  };
  payment: {
    transferReference: string;
  };
  notes: string;
}

const STEPS = [
  { id: 1, title: "بياناتك" },
  { id: 2, title: "الاستلام" },
  { id: 3, title: "الدفع" },
  { id: 4, title: "المراجعة" },
];

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, totalItems } = useCart();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      navigate({ to: "/" });
    }
  }, [items, navigate]);

  const [step, setStep] = useState(1);
  const [data, setData] = useState<CheckoutData>({
    customer: { name: "", phone: "" },
    delivery: { method: null, latitude: null, longitude: null },
    payment: { transferReference: "" },
    notes: "",
  });
  const [isLocating, setIsLocating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const updateData = (section: keyof CheckoutData, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    // Validation
    if (step === 1) {
      if (!data.customer.name.trim()) {
        toast.error("يرجى إدخال الاسم", { style: { fontFamily: "Tajawal" } });
        return;
      }
      if (!data.customer.phone.trim()) {
        toast.error("يرجى إدخال رقم الهاتف", { style: { fontFamily: "Tajawal" } });
        return;
      }
    }

    if (step === 2) {
      if (!data.delivery.method) {
        toast.error("يرجى اختيار طريقة الاستلام", { style: { fontFamily: "Tajawal" } });
        return;
      }
      if (
        data.delivery.method === "home_delivery" &&
        (!data.delivery.latitude || !data.delivery.longitude)
      ) {
        toast.error("يرجى تحديد موقعك للتوصيل للمنزل", { style: { fontFamily: "Tajawal" } });
        return;
      }
    }

    if (step < 4) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateData("delivery", "latitude", position.coords.latitude);
          updateData("delivery", "longitude", position.coords.longitude);
          setIsLocating(false);
          toast.success("تم تحديد موقعك بنجاح", {
            style: {
              background: "#F8F4EE",
              color: "#9E3443",
              border: "1px solid #F3E4E2",
              borderRadius: "1rem",
              fontWeight: "bold",
              fontFamily: "Tajawal",
            },
          });
        },
        (error) => {
          setIsLocating(false);
          toast.error("تعذر تحديد الموقع، يرجى التأكد من صلاحيات الموقع", {
            style: { fontFamily: "Tajawal" },
          });
        },
      );
    } else {
      setIsLocating(false);
      toast.error("الموقع غير مدعوم في متصفحك", { style: { fontFamily: "Tajawal" } });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("تم نسخ الرقم", {
      style: {
        background: "#F8F4EE",
        color: "#9E3443",
        border: "1px solid #F3E4E2",
        borderRadius: "1rem",
        fontWeight: "bold",
        fontFamily: "Tajawal",
      },
    });
  };

  const handleConfirmOrder = () => {
    // In a real app, send data to backend or prepare WhatsApp link here
    console.log("Order Data ready to be sent:", data, items);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div
        className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-background"
        dir="rtl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card p-8 rounded-3xl shadow-soft max-w-md w-full text-center border border-border"
        >
          <div className="w-20 h-20 bg-[#F3E4E2] text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10" />
          </div>
          <h2 className="text-2xl font-bold mb-4">طلبك جاهز للإرسال!</h2>
          <p className="text-muted-foreground mb-8">
            تم تجهيز طلبك بنجاح، سيتم ربط هذه الخطوة لاحقاً لإرسال الطلب عبر الواتساب.
          </p>
          <button
            onClick={() => navigate({ to: "/" })}
            className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-primary-deep w-full transition-all"
          >
            العودة للرئيسية
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background" dir="rtl">
      <div className="max-w-2xl mx-auto">
        {/* Stepper */}
        <div className="mb-10 px-2">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-muted rounded-full z-0" />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 h-1 bg-primary rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    step >= s.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-white text-muted-foreground border-2 border-muted"
                  }`}
                >
                  {step > s.id ? <CheckCircle2 className="size-5" /> : s.id}
                </div>
                <span
                  className={`text-xs font-bold mt-1 ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-soft p-6 md:p-8 border border-border min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-8 text-primary">
                  <User className="size-6" />
                  <h2 className="text-2xl font-bold">بيانات العميل</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      الاسم الكامل
                    </label>
                    <input
                      type="text"
                      value={data.customer.name}
                      onChange={(e) => updateData("customer", "name", e.target.value)}
                      placeholder="أدخلي اسمك الكامل"
                      className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={data.customer.phone}
                      onChange={(e) => updateData("customer", "phone", e.target.value)}
                      placeholder="05X XXX XXXX"
                      dir="ltr"
                      className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-right"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-8 text-primary">
                  <MapPin className="size-6" />
                  <h2 className="text-2xl font-bold">طريقة الاستلام</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="font-bold text-foreground mb-4">كيف ترغبين في استلام طلبك؟</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => updateData("delivery", "method", "home_delivery")}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                        data.delivery.method === "home_delivery"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-white text-muted-foreground hover:bg-black/5"
                      }`}
                    >
                      <MapPin className="size-8 mb-3" />
                      <span className="font-bold">توصيل للمنزل</span>
                    </button>

                    <button
                      onClick={() => updateData("delivery", "method", "store_pickup")}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${
                        data.delivery.method === "store_pickup"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-white text-muted-foreground hover:bg-black/5"
                      }`}
                    >
                      <Store className="size-8 mb-3" />
                      <span className="font-bold">استلام من المحل</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {data.delivery.method === "home_delivery" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[#F8F4EE] rounded-2xl p-6 border border-border">
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                          <Navigation className="size-5 text-primary" />
                          الموقع الجغرافي
                        </h3>
                        {data.delivery.latitude ? (
                          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-border">
                            <div className="flex items-center gap-3 text-green-600">
                              <CheckCircle2 className="size-5" />
                              <span className="font-bold">تم تحديد الموقع بنجاح</span>
                            </div>
                            <button
                              onClick={handleGetLocation}
                              className="text-sm font-bold text-primary hover:underline"
                            >
                              تحديث الموقع
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={handleGetLocation}
                            disabled={isLocating}
                            className="w-full bg-white border border-border text-foreground py-3 rounded-xl font-bold shadow-sm hover:border-primary/50 transition-all flex items-center justify-center gap-2"
                          >
                            {isLocating ? "جاري تحديد الموقع..." : "تحديد موقعي الآن"}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8">
                  <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <FileText className="size-4" />
                    ملاحظات على الطلب{" "}
                    <span className="text-muted-foreground font-normal">(اختياري)</span>
                  </label>
                  <textarea
                    value={data.notes}
                    onChange={(e) => setData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="أضيفي أي ملاحظة خاصة بطلبك..."
                    rows={3}
                    className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-8 text-primary">
                  <Wallet className="size-6" />
                  <h2 className="text-2xl font-bold">الدفع</h2>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Kuraimi Card */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-border shrink-0 overflow-hidden shadow-sm">
                        <img
                          src="/kuraimi.jpg"
                          alt="بنك الكريمي"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                        <CreditCard className="size-6 text-primary hidden" />
                      </div>
                      <h3 className="font-bold text-lg">بنك الكريمي</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">حساب يمني</p>
                          <p className="font-bold" dir="ltr">
                            3002115602
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy("3002115602")}
                          className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Copy className="size-4" />
                          نسخ
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-border">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">حساب سعودي</p>
                          <p className="font-bold" dir="ltr">
                            3102006916
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy("3102006916")}
                          className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Copy className="size-4" />
                          نسخ
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Jeep Card */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-border shrink-0 overflow-hidden shadow-sm bg-white">
                        <img
                          src="/jeep.jpg"
                          alt="جيب"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                        <Wallet className="size-6 text-primary hidden" />
                      </div>
                      <h3 className="font-bold text-lg">جيب</h3>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">رقم الحساب</p>
                        <p className="font-bold" dir="ltr">
                          9331126
                        </p>
                      </div>
                      <button
                        onClick={() => handleCopy("9331126")}
                        className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/5 px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <Copy className="size-4" />
                        نسخ
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <Receipt className="size-4" />
                    رقم الحوالة أو الإيداع{" "}
                    <span className="text-muted-foreground font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={data.payment.transferReference}
                    onChange={(e) => updateData("payment", "transferReference", e.target.value)}
                    placeholder="أدخلي رقم الحوالة أو الإيداع إن وجد"
                    className="w-full bg-[#F8F4EE] border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-8 text-primary">
                  <CheckCircle2 className="size-6" />
                  <h2 className="text-2xl font-bold">مراجعة الطلب</h2>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border relative">
                    <button
                      onClick={() => setStep(1)}
                      className="absolute top-4 left-4 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-bold"
                    >
                      <Edit2 className="size-4" />
                      تعديل
                    </button>
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                      <User className="size-4" /> بيانات العميل
                    </h3>
                    <p className="text-foreground">
                      <span className="text-muted-foreground inline-block w-16">الاسم:</span>{" "}
                      {data.customer.name}
                    </p>
                    <p className="text-foreground mt-1">
                      <span className="text-muted-foreground inline-block w-16">الهاتف:</span>{" "}
                      <span dir="ltr">{data.customer.phone}</span>
                    </p>
                  </div>

                  {/* Delivery Info */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border relative">
                    <button
                      onClick={() => setStep(2)}
                      className="absolute top-4 left-4 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-bold"
                    >
                      <Edit2 className="size-4" />
                      تعديل
                    </button>
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                      <MapPin className="size-4" /> طريقة الاستلام
                    </h3>
                    {data.delivery.method === "home_delivery" ? (
                      <>
                        <p className="text-foreground font-bold">توصيل للمنزل</p>
                        {data.delivery.latitude && (
                          <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                            <CheckCircle2 className="size-4" /> تم تحديد الموقع
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-foreground font-bold">استلام من المحل</p>
                    )}
                  </div>

                  {/* Payment & Notes */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border relative">
                    <button
                      onClick={() => setStep(3)}
                      className="absolute top-4 left-4 text-primary hover:bg-primary/10 p-2 rounded-full transition-colors flex items-center gap-1 text-sm font-bold"
                    >
                      <Edit2 className="size-4" />
                      تعديل
                    </button>
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-primary">
                      <Wallet className="size-4" /> بيانات الدفع
                    </h3>
                    {data.payment.transferReference && (
                      <p className="text-foreground">
                        <span className="text-muted-foreground">رقم الحوالة:</span>{" "}
                        {data.payment.transferReference}
                      </p>
                    )}
                    {!data.payment.transferReference && (
                      <p className="text-sm text-muted-foreground">لم يتم إدخال رقم حوالة</p>
                    )}

                    {data.notes && (
                      <>
                        <h3 className="font-bold mb-2 mt-4 flex items-center gap-2 text-primary border-t border-border/50 pt-4">
                          <FileText className="size-4" /> ملاحظات الطلب
                        </h3>
                        <p className="text-sm text-foreground bg-white p-3 rounded-xl border border-border">
                          {data.notes}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Cart Items */}
                  <div className="bg-[#F8F4EE] rounded-2xl p-5 border border-border">
                    <h3 className="font-bold mb-4 flex items-center gap-2 text-primary">
                      <ShoppingBag className="size-4" /> تفاصيل المنتجات
                    </h3>
                    <div className="space-y-4">
                      {items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 bg-white p-3 rounded-xl border border-border"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-lg object-cover bg-[#F4EEE6]"
                          />
                          <div className="flex-1 py-1">
                            <p className="font-bold text-sm line-clamp-1">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.quantity} × {item.product.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                      <div>
                        <p className="text-muted-foreground text-sm">عدد القطع: {totalItems}</p>
                        <p className="font-bold text-lg mt-1">إجمالي الطلب</p>
                      </div>
                      <p className="text-2xl font-bold text-primary">{subtotal} ريال</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-auto pt-8 flex gap-3">
            {step < 4 ? (
              <button
                onClick={handleNext}
                className="flex-1 bg-primary text-white py-4 rounded-full font-bold shadow-md hover:bg-primary-deep transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {step === 3 ? "مراجعة الطلب" : "التالي"}
              </button>
            ) : (
              <button
                onClick={handleConfirmOrder}
                className="flex-1 bg-primary text-white py-4 rounded-full font-bold shadow-md hover:bg-primary-deep transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                تأكيد وإرسال الطلب
              </button>
            )}

            {step > 1 && (
              <button
                onClick={handlePrev}
                className="px-6 py-4 rounded-full font-bold bg-[#F8F4EE] text-foreground hover:bg-[#E9DDCE] transition-all active:scale-95"
              >
                رجوع
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
