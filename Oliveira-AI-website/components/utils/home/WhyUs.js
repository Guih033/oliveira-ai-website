import React from 'react';
import { Layers, Workflow, TrendingUp, Headphones, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function WhyUs() {
  const [language, setLanguage] = React.useState('pt');
  React.useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'pt');
  }, []);

  const t = {
    pt: {
      title: 'Por que escolher a Oliveira AI Solutions?',
      bullets: [
        { icon: Layers, text: 'Metodologia Oliveira 4D.' },
        { icon: Workflow, text: 'Automação com n8n/Make e integrações por API.' },
        { icon: TrendingUp, text: 'ROI comprovado e relatórios de performance.' },
        { icon: Headphones, text: 'Suporte contínuo e consultoria estratégica.' },
        { icon: Shield, text: 'IA responsável (ética, privacidade, compliance).' }
      ],
      cta: 'Falar com especialista'
    },
    en: {
      title: 'Why choose Oliveira AI Solutions?',
      bullets: [
        { icon: Layers, text: 'Oliveira 4D methodology.' },
        { icon: Workflow, text: 'Automation with n8n/Make and API integrations.' },
        { icon: TrendingUp, text: 'Proven ROI and performance reports.' },
        { icon: Headphones, text: 'Ongoing support and strategic consulting.' },
        { icon: Shield, text: 'Responsible AI (ethics, privacy, compliance).' }
      ],
      cta: 'Talk to an expert'
    }
  }[language === 'pt' ? 'pt' : 'en'];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">{t.title}</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {t.bullets.map(({ icon: Icon, text }, i) => (
            <div key={i} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-green-500 text-white flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href={`${createPageUrl('Contact')}#contact`}>
            <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
              {t.cta}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}