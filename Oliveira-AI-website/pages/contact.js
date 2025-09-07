
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Lead } from '@/entities/Lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Send, CheckCircle, Calendar, Globe, Shield, Info, Loader2 } from 'lucide-react';
import { CRM_ENDPOINT_URL, RECAPTCHA_V3_SITE_KEY } from '@/components/utils/config';
import { parseAndPersistUTMs, getContextMeta, pushGTMEvent } from '@/components/utils/marketing';

export default function Contact() {
  const [language, setLanguage] = useState('pt');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [throttleError, setThrottleError] = useState(null);
  const [honeypotValue, setHoneypotValue] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    corporateEmail: "",
    company: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    location: "",
    role: "",
    interestArea: "",
    estimatedBudget: "",
    timeline: "",
    preferredLanguage: "PT-BR",
    preferredContact: "email",
    phone: "",
    challenge: "",
    consent: false
  });

  const [errors, setErrors] = useState({});

  // US states for autosuggest
  const usStates = useMemo(() => [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
    "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
    "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
  ], []);

  // Load language + fire GTM view event
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'pt';
    setLanguage(savedLang);
    // The previous code was setting preferred_language from localStorage.
    // Given the new fields and data structure, preferredLanguage is selected
    // via a dropdown and defaults to "PT-BR". We might want to persist it
    // from the user's browser language if it aligns with EN/ES/PT-BR.
    // For now, adhering to the outline's default "PT-BR"
    // setFormData(prev => ({ ...prev, preferredLanguage: savedLang === 'pt' ? 'PT-BR' : 'EN' }));
    pushGTMEvent('lead_form_view', { page: 'Contact' });
  }, []);

  // Persist UTMs
  const utm = useMemo(() => parseAndPersistUTMs(90), []);
  const contextMeta = useMemo(() => getContextMeta(), []);

  // Load reCAPTCHA v3 if configured
  useEffect(() => {
    if (!RECAPTCHA_V3_SITE_KEY) return;
    const id = "recaptcha-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_V3_SITE_KEY}`;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  // Validation helpers
  const isCorporateEmail = (email) => {
    const blocklist = ["gmail.com","yahoo.com","hotmail.com","outlook.com","live.com","icloud.com","aol.com","proton.me","protonmail.com","yandex.com","zoho.com"];
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return false;
    const domain = email.split("@")[1]?.toLowerCase() || "";
    return !blocklist.includes(domain);
  };

  const validURL = (value) => {
    if (!value) return true; // Empty value is valid
    try {
      new URL(value.startsWith("http") ? value : `https://${value}`);
      return true;
    } catch {
      return false;
    }
  };

  const formatPhoneE164 = (value, preferredLang, locationText) => {
    if (!value) return "";
    const cleaned = value.replace(/[^\d+]/g, ""); // Remove non-digit, keep '+'
    if (cleaned.startsWith("+")) return cleaned; // Already international format

    // naive defaults: US if location includes valid US state, BR if PT-BR
    const isUS = usStates.some(s => (locationText || "").toUpperCase().includes(s));
    const isBR = preferredLang === "PT-BR" || /BR|Brasil|Brazil/i.test(locationText || "");

    // Add country code if it looks like a national number
    if (isUS && cleaned.length === 10) return `+1${cleaned}`; // US: 10 digits
    if (isBR && (cleaned.length === 10 || cleaned.length === 11)) return `+55${cleaned}`; // BR: 10 or 11 digits

    return cleaned; // fallback to cleaned number without country code
  };

  const validate = (data) => {
    const e = {};
    // names
    if (!data.fullName || data.fullName.trim().length < 3) {
      e.fullName = language === 'pt' ? "Mínimo de 3 caracteres." : "Minimum 3 characters.";
    }
    // email
    if (!data.corporateEmail) {
      e.corporateEmail = language === 'pt' ? "Obrigatório." : "Required.";
    } else if (!isCorporateEmail(data.corporateEmail)) {
      e.corporateEmail = language === 'pt'
        ? "Use um email corporativo (evite Gmail/Yahoo/Hotmail)."
        : "Please use a corporate email (avoid Gmail/Yahoo/Hotmail).";
    }
    // company
    if (!data.company) e.company = language === 'pt' ? "Obrigatório." : "Required.";
    // website
    if (data.companyWebsite && !validURL(data.companyWebsite)) {
      e.companyWebsite = language === 'pt' ? "URL inválida." : "Invalid URL.";
    }
    // required selects
    ["industry","companySize","role","interestArea","estimatedBudget","timeline","preferredLanguage"].forEach(k => {
      if (!data[k]) e[k] = language === 'pt' ? "Obrigatório." : "Required.";
    });
    // challenge
    if (!data.challenge || data.challenge.trim().length < 20) {
      e.challenge = language === 'pt' ? "Descreva com pelo menos 20 caracteres." : "Please write at least 20 characters.";
    }
    // consent
    if (!data.consent) {
      e.consent = language === 'pt' ? "Você precisa concordar." : "You must agree.";
    }
    // phone if selected
    if (data.preferredContact === "phone" && !data.phone) {
      e.phone = language === 'pt' ? "Obrigatório quando contato por telefone." : "Required when contact is Phone.";
    }
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setError(null);
    setThrottleError(null);
    pushGTMEvent('lead_form_submit_attempt', {
      industry: formData.industry,
      companySize: formData.companySize,
      estimatedBudget: formData.estimatedBudget,
      timeline: formData.timeline,
      preferredLanguage: formData.preferredLanguage
    });

    // honeypot
    if (honeypotValue) {
      setError(language === 'pt' ? "Erro de validação." : "Validation error.");
      pushGTMEvent('lead_form_error', { reason: 'honeypot' });
      return;
    }

    // throttle (10s)
    const lastTs = Number(localStorage.getItem("lead_last_submit_ts") || 0);
    if (Date.now() - lastTs < 10000) {
      setThrottleError(language === 'pt' ? "Aguarde alguns segundos antes de enviar novamente." : "Please wait a few seconds before re-submitting.");
      pushGTMEvent('lead_form_error', { reason: 'throttle' });
      return;
    }

    // format conditional phone
    const normalizedPhone = formData.preferredContact === "phone"
      ? formatPhoneE164(formData.phone, formData.preferredLanguage, formData.location)
      : "";

    const dataToValidate = { ...formData, phone: normalizedPhone };
    const v = validate(dataToValidate);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      pushGTMEvent('lead_form_error', { reason: 'validation', fields: Object.keys(v) });
      return;
    }

    setIsSubmitting(true);

    // reCAPTCHA v3 (optional)
    let token = null;
    try {
      if (RECAPTCHA_V3_SITE_KEY && window.grecaptcha) {
        await window.grecaptcha.ready(async () => {
          token = await window.grecaptcha.execute(RECAPTCHA_V3_SITE_KEY, { action: 'lead_submit' });
          setRecaptchaToken(token); // Store token, though not directly used after submission
        });
      }
    } catch (e) {
      console.error("reCAPTCHA error:", e);
      // ignore; proceed without token if it fails for some reason
    }

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: formData.fullName,
      corporateEmail: formData.corporateEmail,
      company: formData.company,
      companyWebsite: formData.companyWebsite,
      industry: formData.industry,
      companySize: formData.companySize,
      location: formData.location,
      role: formData.role,
      interestArea: formData.interestArea,
      estimatedBudget: formData.estimatedBudget,
      timeline: formData.timeline,
      preferredLanguage: formData.preferredLanguage,
      preferredContact: formData.preferredContact,
      phone: normalizedPhone,
      challenge: formData.challenge,
      consent: formData.consent,
      utm,
      context: { ...contextMeta },
      status: "new",
      recaptchaToken: token // Include reCAPTCHA token in payload
    };

    try {
      // Save inside app DB (if Lead.create interacts with a local DB)
      await Lead.create({
        ...payload,
        // legacy compatibility for Lead entity if it expects specific fields
        name: payload.fullName,
        email: payload.corporateEmail,
        source: 'website_contact'
      });

      // POST to Apps Script (Sheets/Calendar/Contacts)
      if (CRM_ENDPOINT_URL) {
        await fetch(CRM_ENDPOINT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      localStorage.setItem("lead_last_submit_ts", String(Date.now()));
      pushGTMEvent('lead_form_submit_success', {
        industry: payload.industry,
        companySize: payload.companySize,
        estimatedBudget: payload.estimatedBudget,
        timeline: payload.timeline,
        preferredLanguage: payload.preferredLanguage
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err); // Log the actual error
      setError(language === 'pt'
        ? "Não foi possível enviar agora. Tente novamente em instantes."
        : "We couldn't submit right now. Please try again shortly."
      );
      pushGTMEvent('lead_form_error', { reason: 'network_or_backend', details: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined })); // Clear error for this field on change
  };

  // Labels and options (PT/EN)
  const t = {
    pt: {
      title: "Vamos conversar sobre seu projeto",
      subtitle: "Agende uma avaliação gratuita e descubra como a IA pode transformar seu negócio",
      successTitle: "Recebemos sua mensagem.",
      successDesc: "Responderemos em até 24 horas. Confira seu email (e spam).",
      button: "Enviar mensagem",
      sending: "Enviando...",
      emailHelp: "Use seu email corporativo para agilizar a qualificação.",
      challengeHelp: "Ex.: reduzir tarefas manuais no faturamento; integrar CRM com IA; chatbot multilíngue 24/7.",
      budgetHelp: "Usado só para dimensionar a proposta. Não compartilhamos com terceiros.",
      quickResp: "Resposta em até 24h",
      freeBadge: "Avaliação gratuita",
      placeholders: {
        challenge: "Descreva seu desafio principal e objetivos de negócio...",
        website: "ex.: empresa.com ou https://empresa.com"
      },
      labels: {
        fullName: "Nome completo*",
        corporateEmail: "Email corporativo*",
        company: "Empresa*",
        companyWebsite: "Site da empresa",
        industry: "Setor*",
        companySize: "Tamanho da empresa*",
        location: "Localização (Estado/País)",
        role: "Seu cargo*",
        interestArea: "Interesse principal*",
        estimatedBudget: "Orçamento estimado*",
        timeline: "Quando deseja implementar?*",
        preferredLanguage: "Idioma preferido*",
        preferredContact: "Preferência de contato",
        phone: "Telefone",
        challenge: "Descreva seu desafio*",
        consent: "Concordo em ser contactado e com a Política de Privacidade"
      },
      opts: {
        industry: [
          ["construction","Construção"],
          ["residential_services","Serviços Residenciais"],
          ["restaurants","Restaurantes"],
          ["supermarkets","Supermercados"],
          ["other","Outros"]
        ],
        companySize: [["1-10","1–10"],["11-50","11–50"],["51-200","51–200"],["201-1k","201–1k"],["1k+","1k+"]],
        role: [["ceo_founder","CEO/Founder"],["coo_operations","COO/Operações"],["cto_it","CTO/IT"],["marketing_sales","Marketing/Vendas"],["other","Outros"]],
        interestArea: [["ai_agents","AI Agents"],["workflow_automation","Automação de Fluxos (n8n/Make)"],["website_creation","Criação de Websites"],["ai_training","Treinamento/Educação em IA"]],
        estimatedBudget: [["lt_10k","< $10k"],["10_30k","$10–30k"],["30_50k","$30–50k"],["gt_50k","> $50k"]],
        timeline: [["0_3","0–3 meses"],["3_6","3–6 meses"],["6_12","6–12 meses"],["gt_12",">12 meses"]],
        preferredLanguage: [["EN","EN"],["PT-BR","PT-BR"],["ES","ES"]],
        preferredContact: [["email","Email"],["phone","Telefone"],["google_meet","Google Meet"]] // Reordered for email default
      }
    },
    en: {
      title: "Let's talk about your project",
      subtitle: "Schedule a free assessment and discover how AI can transform your business",
      successTitle: "We’ve received your message.",
      successDesc: "We’ll reply within 24 hours. Please check your email (and spam).",
      button: "Send message",
      sending: "Sending...",
      emailHelp: "Use your corporate email to speed up qualification.",
      challengeHelp: "E.g., reduce manual billing tasks; integrate CRM with AI to qualify leads; multilingual 24/7 chatbot.",
      budgetHelp: "Used only to size the proposal. We don’t share with third parties.",
      quickResp: "Reply within 24h",
      freeBadge: "Free assessment",
      placeholders: {
        challenge: "Describe your main challenge and business goals...",
        website: "e.g., company.com or https://company.com"
      },
      labels: {
        fullName: "Full name*",
        corporateEmail: "Corporate email*",
        company: "Company*",
        companyWebsite: "Company website",
        industry: "Industry*",
        companySize: "Company size*",
        location: "Location (State/Country)",
        role: "Your role*",
        interestArea: "Main interest*",
        estimatedBudget: "Estimated budget*",
        timeline: "Implementation timeline*",
        preferredLanguage: "Preferred language*",
        preferredContact: "Preferred contact",
        phone: "Phone",
        challenge: "Describe your challenge*",
        consent: "I agree to be contacted and to the Privacy Policy"
      },
      opts: {
        industry: [
          ["construction","Construction"],
          ["residential_services","Residential Services"],
          ["restaurants","Restaurants"],
          ["supermarkets","Supermarkets"],
          ["other","Other"]
        ],
        companySize: [["1-10","1–10"],["11-50","11–50"],["51-200","51–200"],["201-1k","201–1k"],["1k+","1k+"]],
        role: [["ceo_founder","CEO/Founder"],["coo_operations","COO/Operations"],["cto_it","CTO/IT"],["marketing_sales","Marketing/Sales"],["other","Other"]],
        interestArea: [["ai_agents","AI Agents"],["workflow_automation","Workflow Automation (n8n/Make)"],["website_creation","Website Creation"],["ai_training","AI Training/Education"]],
        estimatedBudget: [["lt_10k","< $10k"],["10_30k","$10–30k"],["30_50k","$30–50k"],["gt_50k","> $50k"]],
        timeline: [["0_3","0–3 months"],["3_6","3–6 months"],["6_12","6–12 months"],["gt_12",">12 months"]],
        preferredLanguage: [["EN","EN"],["PT-BR","PT-BR"],["ES","ES"]],
        preferredContact: [["email","Email"],["phone","Phone"],["google_meet","Google Meet"]]
      }
    }
  }[language === 'pt' ? 'pt' : 'en']; // Use 'en' for any non-'pt' language

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full border-none shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">{t.successTitle}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{t.successDesc}</p>
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              {language === 'pt' ? 'Enviar nova mensagem' : 'Send new message'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div id="contact" className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {throttleError && (
          <Alert className="mb-6">
            <AlertDescription>{throttleError}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">{language === 'pt' ? 'Formulário de Contato' : 'Contact Form'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.labels.fullName}</Label>
                    <Input
                      id="fullName"
                      aria-label={t.labels.fullName}
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      aria-invalid={!!errors.fullName}
                      required
                    />
                    {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
                  </div>

                  {/* Corporate Email */}
                  <div className="space-y-2">
                    <Label htmlFor="corporateEmail">{t.labels.corporateEmail}</Label>
                    <Input
                      id="corporateEmail"
                      type="email"
                      aria-label={t.labels.corporateEmail}
                      autoComplete="email"
                      value={formData.corporateEmail}
                      onChange={(e) => handleChange('corporateEmail', e.target.value)}
                      aria-invalid={!!errors.corporateEmail}
                      required
                    />
                    <p className="text-xs text-gray-500">{t.emailHelp}</p>
                    {errors.corporateEmail && <p className="text-xs text-red-600">{errors.corporateEmail}</p>}
                  </div>

                  {/* Company */}
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.labels.company}</Label>
                    <Input
                      id="company"
                      aria-label={t.labels.company}
                      autoComplete="organization"
                      value={formData.company}
                      onChange={(e) => handleChange('company', e.target.value)}
                      aria-invalid={!!errors.company}
                      required
                    />
                    {errors.company && <p className="text-xs text-red-600">{errors.company}</p>}
                  </div>

                  {/* Company Website */}
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">{t.labels.companyWebsite}</Label>
                    <Input
                      id="companyWebsite"
                      aria-label={t.labels.companyWebsite}
                      inputMode="url"
                      autoComplete="url"
                      placeholder={t.placeholders.website}
                      value={formData.companyWebsite}
                      onChange={(e) => handleChange('companyWebsite', e.target.value)}
                      aria-invalid={!!errors.companyWebsite}
                    />
                    {errors.companyWebsite && <p className="text-xs text-red-600">{errors.companyWebsite}</p>}
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="industry-select">{t.labels.industry}</Label>
                    <Select value={formData.industry} onValueChange={(v) => handleChange('industry', v)}>
                      <SelectTrigger id="industry-select" aria-label={t.labels.industry} aria-invalid={!!errors.industry}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.industry.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.industry && <p className="text-xs text-red-600">{errors.industry}</p>}
                  </div>

                  {/* Company Size */}
                  <div className="space-y-2">
                    <Label htmlFor="company-size-select">{t.labels.companySize}</Label>
                    <Select value={formData.companySize} onValueChange={(v) => handleChange('companySize', v)}>
                      <SelectTrigger id="company-size-select" aria-label={t.labels.companySize} aria-invalid={!!errors.companySize}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.companySize.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.companySize && <p className="text-xs text-red-600">{errors.companySize}</p>}
                  </div>

                  {/* Location with autosuggest */}
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.labels.location}</Label>
                    <Input
                      id="location"
                      aria-label={t.labels.location}
                      list="us-states"
                      autoComplete="address-level1"
                      value={formData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                    />
                    <datalist id="us-states">
                      {usStates.map(s => <option key={s} value={s} />)}
                    </datalist>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role-select">{t.labels.role}</Label>
                    <Select value={formData.role} onValueChange={(v) => handleChange('role', v)}>
                      <SelectTrigger id="role-select" aria-label={t.labels.role} aria-invalid={!!errors.role}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.role.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.role && <p className="text-xs text-red-600">{errors.role}</p>}
                  </div>

                  {/* Interest Area */}
                  <div className="space-y-2">
                    <Label htmlFor="interest-area-select">{t.labels.interestArea}</Label>
                    <Select value={formData.interestArea} onValueChange={(v) => handleChange('interestArea', v)}>
                      <SelectTrigger id="interest-area-select" aria-label={t.labels.interestArea} aria-invalid={!!errors.interestArea}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.interestArea.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.interestArea && <p className="text-xs text-red-600">{errors.interestArea}</p>}
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="budget-select">{t.labels.estimatedBudget}</Label>
                    <Select value={formData.estimatedBudget} onValueChange={(v) => handleChange('estimatedBudget', v)}>
                      <SelectTrigger id="budget-select" aria-label={t.labels.estimatedBudget} aria-invalid={!!errors.estimatedBudget}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.estimatedBudget.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">{t.budgetHelp}</p>
                    {errors.estimatedBudget && <p className="text-xs text-red-600">{errors.estimatedBudget}</p>}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label htmlFor="timeline-select">{t.labels.timeline}</Label>
                    <Select value={formData.timeline} onValueChange={(v) => handleChange('timeline', v)}>
                      <SelectTrigger id="timeline-select" aria-label={t.labels.timeline} aria-invalid={!!errors.timeline}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.timeline.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.timeline && <p className="text-xs text-red-600">{errors.timeline}</p>}
                  </div>

                  {/* Preferred Language */}
                  <div className="space-y-2">
                    <Label htmlFor="preferred-language-select">{t.labels.preferredLanguage}</Label>
                    <Select value={formData.preferredLanguage} onValueChange={(v) => handleChange('preferredLanguage', v)}>
                      <SelectTrigger id="preferred-language-select" aria-label={t.labels.preferredLanguage} aria-invalid={!!errors.preferredLanguage}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.preferredLanguage.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    {errors.preferredLanguage && <p className="text-xs text-red-600">{errors.preferredLanguage}</p>}
                  </div>

                  {/* Preferred Contact */}
                  <div className="space-y-2">
                    <Label htmlFor="preferred-contact-select">{t.labels.preferredContact}</Label>
                    <Select value={formData.preferredContact} onValueChange={(v) => handleChange('preferredContact', v)}>
                      <SelectTrigger id="preferred-contact-select" aria-label={t.labels.preferredContact}><SelectValue placeholder="—" /></SelectTrigger>
                      <SelectContent>
                        {t.opts.preferredContact.map(([val, label]) => <SelectItem key={val} value={val}>{label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Phone (conditional) */}
                  {formData.preferredContact === 'phone' && (
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t.labels.phone}</Label>
                      <Input
                        id="phone"
                        aria-label={t.labels.phone}
                        inputMode="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        required={formData.preferredContact === 'phone'}
                      />
                      {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                    </div>
                  )}

                  {/* Challenge - full width */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="challenge">{t.labels.challenge}</Label>
                    <Textarea
                      id="challenge"
                      aria-label={t.labels.challenge}
                      rows={5}
                      placeholder={t.placeholders.challenge}
                      value={formData.challenge}
                      onChange={(e) => handleChange('challenge', e.target.value)}
                      aria-invalid={!!errors.challenge}
                      required
                    />
                    <p className="text-xs text-gray-500">{t.challengeHelp}</p>
                    {errors.challenge && <p className="text-xs text-red-600">{errors.challenge}</p>}
                  </div>

                  {/* Consent - full width */}
                  <div className="flex items-start gap-3 md:col-span-2">
                    <Checkbox id="consent" checked={formData.consent} onCheckedChange={(v) => handleChange('consent', Boolean(v))} aria-invalid={!!errors.consent} />
                    <Label htmlFor="consent" className="leading-snug">
                      {t.labels.consent}
                    </Label>
                  </div>
                  {errors.consent && <p className="text-xs text-red-600 md:col-span-2 -mt-4">{errors.consent}</p>}

                  {/* Honeypot (hidden) */}
                  <input
                    type="text"
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    name="website_url_hp" // A common name for honeypot field
                  />

                  {/* Hidden meta fields (for POST to Apps Script if needed) */}
                  <input type="hidden" name="utm_source" value={utm.source || ""} />
                  <input type="hidden" name="utm_medium" value={utm.medium || ""} />
                  <input type="hidden" name="utm_campaign" value={utm.campaign || ""} />
                  <input type="hidden" name="utm_content" value={utm.content || ""} />
                  <input type="hidden" name="gclid" value={utm.gclid || ""} />

                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
                    >
                      {isSubmitting ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t.sending}</>) : (<><Send className="w-5 h-5 mr-2" />{t.button}</>)}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Side info */}
          <div className="space-y-8">
            <Card className="border-none shadow-xl bg-white dark:bg-gray-800">
              <CardContent className="p-8 text-center">
                <Calendar className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                <div className="text-lg font-semibold">{t.quickResp}</div>
                <div className="inline-flex items-center gap-2 mt-3 text-sm px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                  <Shield className="w-4 h-4" />
                  {t.freeBadge}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  {language === 'pt'
                    ? "Seguimos padrões de privacidade e segurança; seus dados são usados apenas para contato."
                    : "We follow privacy and security best practices; your data is used only to contact you."}
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-xl bg-gradient-to-br from-blue-600 to-green-500 text-white">
              <CardContent className="p-8">
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6" />
                  <div>
                    <div className="font-semibold mb-1">{language === 'pt' ? "Idiomas" : "Languages"}</div>
                    <div className="text-sm opacity-90">PT/EN/ES</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-4">
                  <Info className="w-6 h-6" />
                  <div>
                    <div className="font-semibold mb-1">{language === 'pt' ? "Método 4D" : "4D Method"}</div>
                    <div className="text-sm opacity-90">{language === 'pt' ? "Descobrir • Desenhar • Desenvolver • Depurar" : "Discover • Design • Develop • Debug"}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
