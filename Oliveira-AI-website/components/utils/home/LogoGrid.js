import React from 'react';

export default function LogoGrid() {
  const [language, setLanguage] = React.useState('pt');
  const [failed, setFailed] = React.useState({});

  React.useEffect(() => {
    setLanguage(localStorage.getItem('language') || 'pt');
  }, []);

  const logos = [
    { alt: 'AWS', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { alt: 'Slack', src: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png' },
    { alt: 'Notion', src: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg' },
    { alt: 'Google Cloud', src: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Google_Cloud_logo.svg' },
    { alt: 'PostgreSQL', src: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg' }
  ];

  const title = language === 'pt' ? 'Prova Social' : 'Social Proof';
  const subtitle = language === 'pt'
    ? 'Clientes, parceiros e tecnologias que integramos'
    : 'Clients, partners and technologies we integrate';

  return (
    <section aria-labelledby="logo-grid" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 id="logo-grid" className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center">
          {logos.map((logo, idx) => (
            <div key={logo.alt} className="h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center p-3">
              {!failed[idx] ? (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-10 max-w-[140px] opacity-80 hover:opacity-100 transition-opacity"
                  onError={() => setFailed(prev => ({ ...prev, [idx]: true }))}
                />
              ) : (
                <span className="text-sm font-medium text-gray-500">{logo.alt}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}