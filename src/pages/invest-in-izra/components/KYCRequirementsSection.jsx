import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KYCRequirementsSection = ({ currentLanguage }) => {
  const content = {
    en: {
      title: "KYC Requirements",
      subtitle: "Verification Process for Investors",
      intro: "To comply with UAE financial regulations and ensure platform security, all investors must complete KYC verification before purchasing IZRA tokens.",
      requirements: [
        {
          icon: "User",
          title: "Personal Information",
          items: ["Full legal name", "Date of birth", "Nationality", "Residential address"]
        },
        {
          icon: "FileText",
          title: "Identity Verification",
          items: ["Government-issued ID (Passport/Emirates ID)", "Proof of address (utility bill/bank statement)", "Selfie verification"]
        },
        {
          icon: "Briefcase",
          title: "Financial Information",
          items: ["Source of funds declaration", "Investment experience", "Risk tolerance assessment"]
        },
        {
          icon: "Award",
          title: "Accredited Investor (Optional)",
          items: ["Income verification ($200k+ annually)", "Net worth documentation ($1M+)", "Professional certifications"]
        }
      ],
      process: {
        title: "Verification Process",
        steps: [
          { number: "1", title: "Create Account", description: "Register on IZRA platform with email verification" },
          { number: "2", title: "Submit Documents", description: "Upload required identification and financial documents" },
          { number: "3", title: "Verification Review", description: "Our team reviews your submission (24-48 hours)" },
          { number: "4", title: "Start Investing", description: "Once approved, purchase IZRA tokens immediately" }
        ]
      },
      cta: "Begin KYC Verification"
    },
    ar: {
      title: "متطلبات التحقق من الهوية",
      subtitle: "عملية التحقق للمستثمرين",
      intro: "للامتثال للوائح المالية في الإمارات وضمان أمان المنصة، يجب على جميع المستثمرين إكمال التحقق من الهوية قبل شراء رموز إزرع.",
      requirements: [
        {
          icon: "User",
          title: "المعلومات الشخصية",
          items: ["الاسم القانوني الكامل", "تاريخ الميلاد", "الجنسية", "عنوان السكن"]
        },
        {
          icon: "FileText",
          title: "التحقق من الهوية",
          items: ["هوية صادرة عن الحكومة (جواز السفر/الهوية الإماراتية)", "إثبات العنوان (فاتورة خدمات/كشف حساب بنكي)", "التحقق من الصورة الشخصية"]
        },
        {
          icon: "Briefcase",
          title: "المعلومات المالية",
          items: ["إعلان مصدر الأموال", "الخبرة الاستثمارية", "تقييم تحمل المخاطر"]
        },
        {
          icon: "Award",
          title: "المستثمر المعتمد (اختياري)",
          items: ["التحقق من الدخل (200 ألف دولار + سنويًا)", "توثيق صافي الثروة (1 مليون دولار +)", "الشهادات المهنية"]
        }
      ],
      process: {
        title: "عملية التحقق",
        steps: [
          { number: "1", title: "إنشاء حساب", description: "التسجيل في منصة إزرع مع التحقق من البريد الإلكتروني" },
          { number: "2", title: "تقديم المستندات", description: "تحميل وثائق الهوية والمالية المطلوبة" },
          { number: "3", title: "مراجعة التحقق", description: "يراجع فريقنا طلبك (24-48 ساعة)" },
          { number: "4", title: "ابدأ الاستثمار", description: "بمجرد الموافقة، اشترِ رموز إزرع على الفور" }
        ]
      },
      cta: "ابدأ التحقق من الهوية"
    }
  };

  const text = content?.[currentLanguage];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container-safe">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {text?.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {text?.subtitle}
          </p>
          <p className="text-base text-foreground">
            {text?.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {text?.requirements?.map((req, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-sm border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={req?.icon} size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {req?.title}
              </h3>
              <ul className="space-y-2">
                {req?.items?.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-xl p-8 shadow-sm border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            {text?.process?.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {text?.process?.steps?.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-foreground">{step?.number}</span>
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {step?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button
              variant="default"
              size="lg"
              iconName="ArrowRight"
              iconPosition="right"
            >
              {text?.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KYCRequirementsSection;