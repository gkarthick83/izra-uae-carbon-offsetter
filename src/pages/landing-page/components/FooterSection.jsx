import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const FooterSection = ({ currentLanguage }) => {
  const content = {
    en: {
      tagline: "Offsetting Carbon, Restoring Nature",
      quickLinks: "Quick Links",
      forSponsors: "For Sponsors",
      forSellers: "For Sellers",
      forBuyers: "For Buyers",
      forInvestors: "For Investors",
      contact: "Contact Us",
      followUs: "Follow Us",
      copyright: `© ${new Date()?.getFullYear()} IZRA UAE. All rights reserved.`,
      links: {
        home: "Home",
        plantTrees: "Plant Trees",
        marketplace: "Marketplace",
        about: "About Us",
        faq: "FAQ",
        terms: "Terms of Service",
        privacy: "Privacy Policy"
      }
    },
    ar: {
      tagline: "تعويض الكربون، استعادة الطبيعة",
      quickLinks: "روابط سريعة",
      forSponsors: "للرعاة",
      forSellers: "للبائعين",
      forBuyers: "للمشترين",
      forInvestors: "للمستثمرين",
      contact: "اتصل بنا",
      followUs: "تابعنا",
      copyright: `© ${new Date()?.getFullYear()} IZRA الإمارات. جميع الحقوق محفوظة.`,
      links: {
        home: "الرئيسية",
        plantTrees: "ازرع الأشجار",
        marketplace: "السوق",
        about: "من نحن",
        faq: "الأسئلة الشائعة",
        terms: "شروط الخدمة",
        privacy: "سياسة الخصوصية"
      }
    }
  };

  const text = content?.[currentLanguage];

  const socialLinks = [
    { icon: "Twitter", url: "#", label: "Twitter" },
    { icon: "Linkedin", url: "#", label: "LinkedIn" },
    { icon: "Instagram", url: "#", label: "Instagram" },
    { icon: "Facebook", url: "#", label: "Facebook" }
  ];

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 lg:py-16">
      <div className="container-safe">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="space-y-4">
            <Link to="/landing-page" className="flex items-center gap-3 no-underline">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Leaf" size={24} color="#FFFFFF" />
              </div>
              <span className="text-2xl font-bold text-foreground">IZRA</span>
            </Link>
            <p className="text-sm md:text-base text-muted-foreground">
              {text?.tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-smooth"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">
              {text?.quickLinks}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/landing-page" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.links?.home}
                </Link>
              </li>
              <li>
                <Link to="/plant-tree-sponsorship" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.links?.plantTrees}
                </Link>
              </li>
              <li>
                <Link to="/carbon-credit-marketplace" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.links?.marketplace}
                </Link>
              </li>
              <li>
                <Link to="/learn-about-izra" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.links?.about}
                </Link>
              </li>
              <li>
                <Link to="/tokenomics" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {currentLanguage === 'en' ? 'Tokenomics' : 'الاقتصاد الرمزي'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">
              {text?.forSponsors}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sponsor-dashboard" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {currentLanguage === 'en' ? 'Sponsor Dashboard' : 'لوحة الراعي'}
                </Link>
              </li>
              <li>
                <Link to="/seller-portal" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.forSellers}
                </Link>
              </li>
              <li>
                <Link to="/buyer-dashboard" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.forBuyers}
                </Link>
              </li>
              <li>
                <Link to="/investor-dashboard" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  {text?.forInvestors}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-bold text-foreground mb-4">
              {text?.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Icon name="Mail" size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="mailto:info@izra.ae" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  info@izra.ae
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Phone" size={18} className="text-primary mt-1 flex-shrink-0" />
                <a href="tel:+97144567890" className="text-sm md:text-base text-muted-foreground hover:text-primary transition-smooth no-underline">
                  +971 4 456 7890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={18} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-sm md:text-base text-muted-foreground">
                  {currentLanguage === 'en' ?'Dubai, United Arab Emirates' :'دبي، الإمارات العربية المتحدة'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              {text?.copyright}
            </p>
            <div className="flex gap-4">
              <a href="#terms" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-smooth no-underline">
                {text?.links?.terms}
              </a>
              <a href="#privacy" className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-smooth no-underline">
                {text?.links?.privacy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;