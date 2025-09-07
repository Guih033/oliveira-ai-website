import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Brain, Zap, Target, Users, ArrowRight, CheckCircle, 
  TrendingUp, Award, Globe, Sparkles, ChevronRight,
  Building, Utensils, ShoppingCart, Home as HomeIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [language, setLanguage] = useState('pt');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'pt';
    setLanguage(savedLang);
    setIsVisible(true);
  }, []);

  const content = {
    pt: {
      hero: {
        title: "Automação e IA sob medida para acelerar seus resultados",
        subtitle: "Transformamos processos complexos em soluções inteligentes que eliminam retrabalho e aumentam a eficiência da sua empresa.",
        cta: "Agende sua avaliação gratuita",
        stats: [
          { value: "+30%", label: "Eficiência média" },
          { value: "50+", label: "Projetos entregues" },
          { value: "24/7", label: "Suporte dedicado" }
        ]
      },
      services: {
        title: "Do diagnóstico à integração completa",
        subtitle: "Construímos agentes, automações e fluxos que eliminam retrabalho",
        items: [
          {
            icon: Target,
            title: "Diagnóstico IA",
            description: "Identificamos oportunidades de automação específicas para seu negócio"
          },
          {
            icon: Zap,
            title: "Desenvolvimento",
            description: "Criamos soluções personalizadas com foco em ROI mensurado"
          },
          {
            icon: Users,
            title: "Integração",
            description: "Implementamos e treinamos sua equipe para máxima adoção"
          }
        ]
      },
      method4d: {
        title: "Método Oliveira 4D",
        subtitle: "Nossa metodologia comprovada para transformação digital",
        steps: [
          { phase: "Descobrir", description: "Mapeamos seus processos e identificamos gargalos" },
          { phase: "Desenhar", description: "Criamos a arquitetura da solução ideal" },
          { phase: "Desenvolver", description: "Construímos e testamos cada componente" },
          { phase: "Depurar", description: "Otimizamos performance e garantimos qualidade" }
        ]
      },
      industries: {
        title: "Especialistas em setores específicos",
        items: [
          { icon: Building, title: "Construção Civil", description: "Automação de orçamentos e gestão de obras" },
          { icon: HomeIcon, title: "Serviços Residenciais", description: "CRM inteligente e agendamento automático" },
          { icon: Utensils, title: "Restaurantes", description: "Gestão de pedidos e controle de estoque" },
          { icon: ShoppingCart, title: "Supermercados", description: "Análise preditiva e otimização de preços" }
        ]
      },
      social: {
        title: "Resultados que falam por si",
        testimonials: [
          {
            text: "A automação reduziu nosso tempo de orçamento em 60%. Agora conseguimos responder clientes em minutos.",
            author: "CEO, Construtora Regional",
            metric: "60% menos tempo"
          },
          {
            text: "O sistema de agendamento inteligente aumentou nossa capacidade sem contratar mais pessoas.",
            author: "Fundador, Serviços Domésticos",
            metric: "+40% capacidade"
          }
        ]
      },
      cta: {
        title: "Pronto para começar?",
        subtitle: "Conte-nos sobre seu desafio e descubra como a IA pode transformar seu negócio",
        button: "Iniciar conversa"
      }
    },
    en: {
      hero: {
        title: "Custom AI & automation to accelerate your results",
        subtitle: "We transform complex processes into intelligent solutions that remove busywork and boost your company's efficiency.",
        cta: "Book your free assessment",
        stats: [
          { value: "+30%", label: "Average efficiency" },
          { value: "50+", label: "Projects delivered" },
          { value: "24/7", label: "Dedicated support" }
        ]
      },
      services: {
        title: "From assessment to complete integration",
        subtitle: "We build agents, automations and flows that remove busywork",
        items: [
          {
            icon: Target,
            title: "AI Assessment",
            description: "We identify automation opportunities specific to your business"
          },
          {
            icon: Zap,
            title: "Development",
            description: "We create custom solutions focused on measurable ROI"
          },
          {
            icon: Users,
            title: "Integration",
            description: "We implement and train your team for maximum adoption"
          }
        ]
      },
      method4d: {
        title: "Oliveira 4D Method",
        subtitle: "Our proven methodology for digital transformation",
        steps: [
          { phase: "Discover", description: "We map your processes and identify bottlenecks" },
          { phase: "Design", description: "We create the ideal solution architecture" },
          { phase: "Develop", description: "We build and test each component" },
          { phase: "Debug", description: "We optimize performance and ensure quality" }
        ]
      },
      industries: {
        title: "Specialists in specific sectors",
        items: [
          { icon: Building, title: "Construction", description: "Budget automation and project management" },
          { icon: HomeIcon, title: "Residential Services", description: "Smart CRM and automatic scheduling" },
          { icon: Utensils, title: "Restaurants", description: "Order management and inventory control" },
          { icon: ShoppingCart, title: "Supermarkets", description: "Predictive analysis and price optimization" }
        ]
      },
      social: {
        title: "Results that speak for themselves",
        testimonials: [
          {
            text: "Automation reduced our quoting time by 60%. Now we can respond to clients in minutes.",
            author: "CEO, Regional Construction",
            metric: "60% less time"
          },
          {
            text: "The smart scheduling system increased our capacity without hiring more people.",
            author: "Founder, Home Services",
            metric: "+40% capacity"
          }
        ]
      },
      cta: {
        title: "Ready to start?",
        subtitle: "Tell us about your challenge and discover how AI can transform your business",
        button: "Start conversation"
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-green-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-green-900/90"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Badge className="mb-6 bg-white/10 text-white border-white/20 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'IA Responsável • Resultados Mensuráveis' : 'Responsible AI • Measurable Results'}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="gradient-text">{currentContent.hero.title}</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              {currentContent.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <Link to={createPageUrl('Contact')}>
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 glow-primary text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200">
                  {currentContent.hero.cta}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link to={createPageUrl('Cases')}>
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full">
                  {language === 'pt' ? 'Ver casos de sucesso' : 'View success stories'}
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {currentContent.hero.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              {currentContent.services.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentContent.services.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.services.items.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-gray-800 hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Method 4D Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {currentContent.method4d.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentContent.method4d.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.method4d.steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 text-white transform group-hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                  <div className="text-4xl font-bold mb-4">{index + 1}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.phase}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
                {index < currentContent.method4d.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              {currentContent.industries.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.industries.items.map((industry, index) => (
              <Link key={index} to={createPageUrl('Industries')} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-none bg-white dark:bg-gray-800 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <industry.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {industry.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {currentContent.social.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {currentContent.social.testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none bg-gray-50 dark:bg-gray-700 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-2xl text-blue-600 mb-4">"{testimonial.text}"</div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600 dark:text-gray-400">
                      — {testimonial.author}
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {testimonial.metric}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {currentContent.cta.subtitle}
          </p>
          
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 glow-primary text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200">
              {currentContent.cta.button}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}