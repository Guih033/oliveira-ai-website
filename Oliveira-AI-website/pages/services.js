import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Target, Zap, Users, Cog, ArrowRight, CheckCircle,
  Brain, Bot, Workflow, Database, Shield, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Services() {
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'pt';
    setLanguage(savedLang);
  }, []);

  const content = {
    pt: {
      hero: {
        title: "Soluções IA que transformam seu negócio",
        subtitle: "Do diagnóstico à implementação, oferecemos serviços completos para automatizar processos e acelerar resultados."
      },
      consulting: {
        title: "Diagnóstico e Consultoria",
        description: "Identificamos oportunidades específicas de IA e automação para seu negócio",
        services: [
          { icon: Target, title: "Auditoria de Processos", description: "Mapeamento completo dos fluxos de trabalho atuais" },
          { icon: Brain, title: "Estratégia IA", description: "Roadmap personalizado de implementação" },
          { icon: CheckCircle, title: "ROI Analysis", description: "Projeção detalhada de retorno sobre investimento" }
        ]
      },
      development: {
        title: "Desenvolvimento de Soluções",
        description: "Construímos agentes inteligentes e automações sob medida",
        services: [
          { icon: Bot, title: "Agentes IA", description: "Chatbots e assistentes virtuais personalizados" },
          { icon: Workflow, title: "Automação de Processos", description: "Fluxos automatizados entre sistemas" },
          { icon: Database, title: "Integração de Dados", description: "Conectamos todas suas fontes de informação" }
        ]
      },
      implementation: {
        title: "Implementação e Suporte",
        description: "Garantimos adoção completa com treinamento e suporte contínuo",
        services: [
          { icon: Users, title: "Treinamento de Equipe", description: "Capacitação completa para uso das soluções" },
          { icon: Shield, title: "Segurança e Compliance", description: "Implementação seguindo melhores práticas" },
          { icon: Clock, title: "Suporte 24/7", description: "Monitoramento e manutenção contínua" }
        ]
      },
      partnership: {
        title: "Parceria Estratégica",
        description: "Relacionamento de longo prazo para evolução contínua",
        benefits: [
          "Atualizações automáticas das soluções",
          "Acesso prioritário a novas tecnologias",
          "Consultoria estratégica mensal",
          "Desconto em novos projetos",
          "Relatórios de performance detalhados"
        ]
      },
      process: {
        title: "Nosso Processo",
        steps: [
          { phase: "Descobrir", description: "Workshop de 2 dias para entender seus desafios", duration: "1 semana" },
          { phase: "Desenhar", description: "Prototipagem e arquitetura da solução", duration: "2 semanas" },
          { phase: "Desenvolver", description: "Construção e testes rigorosos", duration: "4-8 semanas" },
          { phase: "Depurar", description: "Implementação e otimização", duration: "2 semanas" }
        ]
      },
      cta: {
        title: "Pronto para transformar seu negócio?",
        subtitle: "Agende uma conversa gratuita e descubra como a IA pode acelerar seus resultados",
        button: "Solicitar proposta"
      }
    },
    en: {
      hero: {
        title: "AI Solutions that transform your business",
        subtitle: "From assessment to implementation, we offer complete services to automate processes and accelerate results."
      },
      consulting: {
        title: "Assessment and Consulting",
        description: "We identify specific AI and automation opportunities for your business",
        services: [
          { icon: Target, title: "Process Audit", description: "Complete mapping of current workflows" },
          { icon: Brain, title: "AI Strategy", description: "Personalized implementation roadmap" },
          { icon: CheckCircle, title: "ROI Analysis", description: "Detailed return on investment projection" }
        ]
      },
      development: {
        title: "Solution Development",
        description: "We build intelligent agents and custom automations",
        services: [
          { icon: Bot, title: "AI Agents", description: "Custom chatbots and virtual assistants" },
          { icon: Workflow, title: "Process Automation", description: "Automated flows between systems" },
          { icon: Database, title: "Data Integration", description: "We connect all your information sources" }
        ]
      },
      implementation: {
        title: "Implementation and Support",
        description: "We ensure complete adoption with training and continuous support",
        services: [
          { icon: Users, title: "Team Training", description: "Complete training for solution usage" },
          { icon: Shield, title: "Security & Compliance", description: "Implementation following best practices" },
          { icon: Clock, title: "24/7 Support", description: "Continuous monitoring and maintenance" }
        ]
      },
      partnership: {
        title: "Strategic Partnership",
        description: "Long-term relationship for continuous evolution",
        benefits: [
          "Automatic solution updates",
          "Priority access to new technologies",
          "Monthly strategic consulting",
          "Discount on new projects",
          "Detailed performance reports"
        ]
      },
      process: {
        title: "Our Process",
        steps: [
          { phase: "Discover", description: "2-day workshop to understand your challenges", duration: "1 week" },
          { phase: "Design", description: "Prototyping and solution architecture", duration: "2 weeks" },
          { phase: "Develop", description: "Construction and rigorous testing", duration: "4-8 weeks" },
          { phase: "Debug", description: "Implementation and optimization", duration: "2 weeks" }
        ]
      },
      cta: {
        title: "Ready to transform your business?",
        subtitle: "Schedule a free conversation and discover how AI can accelerate your results",
        button: "Request proposal"
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {currentContent.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            {currentContent.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {currentContent.consulting.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentContent.consulting.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.consulting.services.map((service, index) => (
              <Card key={index} className="border-none bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Development Services */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {currentContent.development.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentContent.development.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.development.services.map((service, index) => (
              <Card key={index} className="border-none bg-gray-50 dark:bg-gray-700 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    <service.icon className="w-8 h-8 text-green-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {currentContent.implementation.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentContent.implementation.description}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {currentContent.implementation.services.map((service, index) => (
              <Card key={index} className="border-none bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    <service.icon className="w-8 h-8 text-purple-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                {currentContent.partnership.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                {currentContent.partnership.description}
              </p>
              
              <ul className="space-y-4">
                {currentContent.partnership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-green-500 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">
                {language === 'pt' ? 'Parceria Premium' : 'Premium Partnership'}
              </h3>
              <p className="mb-6">
                {language === 'pt' 
                  ? 'Evolução contínua com suporte especializado'
                  : 'Continuous evolution with specialized support'
                }
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                {language === 'pt' ? 'Saber mais' : 'Learn more'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {currentContent.process.title}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentContent.process.steps.map((step, index) => (
              <Card key={index} className="border-none bg-white dark:bg-gray-800 text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.phase}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{step.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {step.duration}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {currentContent.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {currentContent.cta.subtitle}
          </p>
          
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200">
              {currentContent.cta.button}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
