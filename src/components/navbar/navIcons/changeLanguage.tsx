'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { Button } from 'antd';
import { IoLanguage } from "react-icons/io5";

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params?.locale as string || 'en';

  const toggleLanguage = () => {
    const newLocale = currentLocale === 'en' ? 'ar' : 'en';
    // Remove the current locale from the pathname
    const newPathname = pathname.replace(`/${currentLocale}`, '');
    // Add the new locale
    router.push(`/${newLocale}${newPathname}`);
  };

  return (
    <Button 
      type="text"
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-1"
      icon={<IoLanguage className="text-lg" />}
    >
      {currentLocale === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

export default ChangeLanguage;
