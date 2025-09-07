import React from 'react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  const [language, setLanguage] = React.useState('pt');
  React.useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'pt');
  }, []);

  const t = {
    pt: {
      title: "Obrigado! Verifique seu email.",
      desc: "Enviamos o material para seu email. Aproveite para agendar sua avaliação gratuita.",
      cta: "Agendar call"
    },
    en: {
      title: "Thank you! Check your email.",
      desc: "We’ve sent the material to your email. Now, book your free assessment.",
      cta: "Book a call"
    }
  }[language === 'pt' ? 'pt' : 'en'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3">{t.desc}</p>
        <Link to={`${createPageUrl('Contact')}#contact`}>
          <Button className="mt-6 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
            {t.cta}
          </Button>
        </Link>
      </div>
    </div>
  );
}
