import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Menu, X, Globe, Sun, Moon, ChevronDown,
  Brain, Zap, Target, Users, MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Layout({ children, currentPageName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('pt');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language') || 'pt';
    setIsDarkMode(savedTheme === 'dark');
    setLanguage(savedLang);
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const navigation = {
    pt: [
      { name: 'Home', href: createPageUrl('Home') },
      { name: 'Serviços', href: createPageUrl('Services') },
      { name: 'Indústrias', href: createPageUrl('Industries') },
      { name: 'Cases', href: createPageUrl('Cases') },
      { name: 'Pricing', href: createPageUrl('Pricing') },
      { name: 'Sobre', href: createPageUrl('About') },
      { name: 'Blog', href: createPageUrl('Blog') },
      { name: 'Contato', href: createPageUrl('Contact') }
    ],
    en: [
      { name: 'Home', href: createPageUrl('Home') },
      { name: 'Services', href: createPageUrl('Services') },
      { name: 'Industries', href: createPageUrl('Industries') },
      { name: 'Cases', href: createPageUrl('Cases') },
      { name: 'Pricing', href: createPageUrl('Pricing') },
      { name: 'About', href: createPageUrl('About') },
      { name: 'Blog', href: createPageUrl('Blog') },
      { name: 'Contact', href: createPageUrl('Contact') }
    ]
  };

  const ctaText = {
    pt: 'Agende sua avaliação gratuita',
    en: 'Book your free assessment'
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <style jsx>{`
        :root {
          --primary: #2563EB;
          --secondary: #1F2937;
          --success: #10B981;
          --error: #EF4444;
          --light-bg: #F9FAFB;
        }
        
        .dark {
          --light-bg: #111827;
        }
        
        .glow-primary {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        
        .dark .glow-primary {
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #2563EB, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-200"></div>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold gradient-text">OLIVEIRA</div>
                <div className="text-sm text-gray-500 -mt-1">AI SOLUTIONS</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigation[language].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-800'
                      : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <Globe className="w-4 h-4 mr-2" />
                    {language.toUpperCase()}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => switchLanguage('pt')}>
                    🇧🇷 Português
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchLanguage('en')}>
                    🇺🇸 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleTheme}
                className="hidden md:flex"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* CTA Button */}
              <Link to={createPageUrl('Contact')} className="hidden lg:block">
                <Button className="bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 glow-primary">
                  {ctaText[language]}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t`}>
            <div className="px-4 py-4 space-y-2">
              {navigation[language].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center space-x-4 px-4">
                  <Button variant="ghost" size="sm" onClick={toggleTheme}>
                    {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    Theme
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Globe className="w-4 h-4 mr-2" />
                        {language.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => switchLanguage('pt')}>
                        🇧🇷 Português
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => switchLanguage('en')}>
                        🇺🇸 English
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Link to={createPageUrl('Contact')} className="block px-4">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                    {ctaText[language]}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold gradient-text">OLIVEIRA AI SOLUTIONS</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                {language === 'pt' 
                  ? 'Automação e IA sob medida para acelerar seus resultados. Transformamos processos complexos em soluções inteligentes.'
                  : 'Custom AI & automation to accelerate your results. We transform complex processes into intelligent solutions.'
                }
              </p>
              <div className="flex items-center space-x-4">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  guilherme19taru@gmail.com
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">
                {language === 'pt' ? 'Soluções' : 'Solutions'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={createPageUrl('Services')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Diagnóstico IA' : 'AI Assessment'}
                </Link></li>
                <li><Link to={createPageUrl('Services')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Automação' : 'Automation'}
                </Link></li>
                <li><Link to={createPageUrl('Services')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Integrações' : 'Integrations'}
                </Link></li>
                <li><Link to={createPageUrl('Services')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Consultoria' : 'Consulting'}
                </Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">
                {language === 'pt' ? 'Indústrias' : 'Industries'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link to={createPageUrl('Industries')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Construção Civil' : 'Construction'}
                </Link></li>
                <li><Link to={createPageUrl('Industries')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Restaurantes' : 'Restaurants'}
                </Link></li>
                <li><Link to={createPageUrl('Industries')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Varejo' : 'Retail'}
                </Link></li>
                <li><Link to={createPageUrl('Industries')} className="hover:text-blue-600">
                  {language === 'pt' ? 'Serviços' : 'Services'}
                </Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2024 Oliveira AI Solutions. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}