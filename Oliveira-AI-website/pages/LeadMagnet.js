import React, { useEffect, useMemo, useState } from 'react';
import { Lead } from '@/entities/Lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CRM_ENDPOINT_URL } from '@/components/utils/config';
import { parseAndPersistUTMs, getContextMeta, pushGTMEvent } from '@/components/utils/marketing';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LeadMagnet() {
  const [language, setLanguage] = useState('pt');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', industry: '', preferredLanguage: 'PT-BR' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const utm = useMemo(() => parseAndPersistUTMs(90), []);
  const context = useMemo(() => getContextMeta(), []);

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'pt';
    setLanguage(saved);
    pushGTMEvent('lead_magnet_view', { page: 'LeadMagnet' });
  }, []);

  const isCorporateEmail = (email) => {
    const block = ["gmail.com","yahoo.com","hotmail.com","outlook.com","live.com","icloud.com","aol.com","proton.me","protonmail.com"];
    const ok = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
    const domain = email.split('@')[1]?.toLowerCase() || '';
    return ok && !block.includes(domain);
  };

  const t = {
    pt: {
      title: "Faça o download gratuito",
      subtitle: "Receba o ebook/quiz e descubra oportunidades de IA para o seu negócio.",
      name: "Nome",
      email: "Email corporativo",
      company: "Empresa",
      industry: "Setor",
      lang: "Idioma",
      submit: "Receber agora",
      emailHelp: "Use seu email corporativo para agilizar a qualificação.",
      industries: [
        ["construction","Construção"],["residential_services","Serviços Residenciais"],
        ["restaurants","Restaurantes"],["supermarkets","Supermercados"],["other","Outros"]
      ],
      langs: [["EN","EN"],["PT-BR","PT-BR"],["ES","ES"]]
    },
    en: {
      title: "Download for free",
      subtitle: "Get the ebook/quiz and discover AI opportunities for your business.",
      name: "Name",
      email: "Corporate email",
      company: "Company",
      industry: "Industry",
      lang: "Language",
      submit: "Get it now",
      emailHelp: "Use your corporate email to speed up qualification.",
      industries: [
        ["construction","Construction"],["residential_services","Residential Services"],
        ["restaurants","Restaurants"],["supermarkets","Supermarkets"],["other","Other"]
      ],
      langs: [["EN","EN"],["PT-BR","PT-BR"],["ES","ES"]]
    }
  }[language === 'pt' ? 'pt' : 'en'];

  const validate = () => {
    const e = {};
    if (!form.name || form.name.trim().length < 2) e.name = 'Required';
    if (!isCorporateEmail(form.email)) e.email = language === 'pt' ? 'Use email corporativo.' : 'Use corporate email.';
    if (!form.company) e.company = 'Required';
    if (!form.industry) e.industry = 'Required';
    if (!form.preferredLanguage) e.preferredLanguage = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: form.name,
      corporateEmail: form.email,
      company: form.company,
      industry: form.industry,
      preferredLanguage: form.preferredLanguage,
      status: "new",
      utm,
      context,
      source: "lead_magnet"
    };

    await Lead.create({ ...payload, name: payload.fullName, email: payload.corporateEmail });

    if (CRM_ENDPOINT_URL) {
      await fetch(CRM_ENDPOINT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    }

    pushGTMEvent('lead_form_submit_success', { source: 'lead_magnet', industry: payload.industry, preferredLanguage: payload.preferredLanguage });
    navigate(createPageUrl('ThankYou'));
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-14">
      <div className="max-w-3xl mx-auto px-4">
        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">
              {t.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{t.subtitle}</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.name}</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} autoComplete="name" />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.email}</label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} autoComplete="email" />
                <p className="text-xs text-gray-500">{t.emailHelp}</p>
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.company}</label>
                <Input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} autoComplete="organization" />
                {errors.company && <p className="text-xs text-red-600">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.industry}</label>
                <Select value={form.industry} onValueChange={v => setForm({ ...form, industry: v })}>
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    {t.industries.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.industry && <p className="text-xs text-red-600">{errors.industry}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">{t.lang}</label>
                <Select value={form.preferredLanguage} onValueChange={v => setForm({ ...form, preferredLanguage: v })}>
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    {t.langs.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600">
                  {submitting ? (language === 'pt' ? 'Enviando...' : 'Sending...') : (language === 'pt' ? 'Receber agora' : 'Get it now')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
