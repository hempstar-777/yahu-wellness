import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'de', name: t('languages.de') },
    { code: 'pt', name: t('languages.pt') },
    { code: 'zh', name: t('languages.zh') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'ru', name: t('languages.ru') },
    { code: 'hi', name: t('languages.hi') },
    { code: 'ja', name: t('languages.ja') },
    { code: 'ko', name: t('languages.ko') },
    { code: 'it', name: t('languages.it') },
    { code: 'nl', name: t('languages.nl') },
    { code: 'pl', name: t('languages.pl') },
    { code: 'tr', name: t('languages.tr') },
    { code: 'sw', name: t('languages.sw') },
    { code: 'am', name: t('languages.am') },
    { code: 'ro', name: t('languages.ro') },
  ];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={i18n.language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
