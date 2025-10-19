import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground space-y-4">
          <p>
            {t('home.footerInspired')}
          </p>
          <p>
            {t('home.footerMission')}
          </p>
          <p className="text-xs">
            {t('home.footerDisclaimer')}
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/vip-benefits" className="hover:underline">VIP Program</Link>
            <span>•</span>
            <Link to="/courses" className="hover:underline">Courses</Link>
            <span>•</span>
            <Link to="/donate" className="hover:underline">Donate</Link>
            <span>•</span>
            <a href="mailto:support@spiritualfreedom.app" className="hover:underline">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
