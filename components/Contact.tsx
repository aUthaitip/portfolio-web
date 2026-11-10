'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { ArrowUpRight, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import contactSchema, { type ContactFormData } from '@/schema/contact'
import { googleSheetAPI } from '@/lib/actions/googleSheetAPI'
import { homeData } from '@/data/home'
import type { Profile } from '@/lib/portfolio'
import Reveal from './Reveal'

export default function Contact({ profile }: { profile?: Profile | null }) {
  const { lang, t } = useLanguage()
  const [submitResult, setSubmitResult] = useState<{ success?: boolean; error?: string }>({})
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), mode: 'onBlur' })
  const email = profile?.email || 'Authaitip.131047@gmail.com'
  const onSubmit = async (data: ContactFormData) => {
    setSubmitResult({})
    try {
      const ok = await googleSheetAPI(data)
      if (ok) { setSubmitResult({ success: true }); reset() }
      else setSubmitResult({ error: homeData.contact.sendFailed[lang] })
    } catch { setSubmitResult({ error: homeData.contact.sendFailed[lang] }) }
  }
  return (
    <section id="contact" className="section-contact section-space" aria-labelledby="contact-title">
      <div className="container-custom">
        <Reveal><div className="section-heading"><h2 id="contact-title">{homeData.contact.title[lang]}</h2><span className="section-heading-rule" aria-hidden="true" /></div></Reveal>
        <div className="contact-grid">
          <Reveal>
            <h3 className="contact-subtitle">{homeData.contact.subtitle[lang]}</h3>
            <p className="contact-description">{homeData.contact.description[lang]}</p>
            <dl className="contact-details">
              <div><dt>{homeData.contact.email[lang]}</dt><dd><a href={`mailto:${email}`} className="text-link">{email}<ArrowUpRight aria-hidden="true" /></a></dd></div>
              <div><dt>{homeData.contact.phone[lang]}</dt><dd><a href="tel:+66981972472" className="text-link">+66 98 197 2472<ArrowUpRight aria-hidden="true" /></a></dd></div>
              <div><dt>{homeData.contact.location[lang]}</dt><dd>Bangkok, Thailand</dd></div>
            </dl>
            <div className="contact-social"><a href={profile?.githubUrl || 'https://github.com/aUthaitip'} target="_blank" rel="noopener noreferrer" className="text-link">GitHub<ArrowUpRight aria-hidden="true" /></a>{profile?.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn<ArrowUpRight aria-hidden="true" /></a>}</div>
          </Reveal>
          <Reveal>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="contact-form" aria-label={t('ฟอร์มติดต่อ', 'Contact form')}>
              <div className="form-field" data-invalid={!!errors.name || undefined}>
                <label htmlFor="contact-name">{homeData.contact.yourName[lang]}</label>
                <input id="contact-name" type="text" autoComplete="name" placeholder="John Doe" {...register('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
                {errors.name && <p id="name-error" className="field-error" role="alert">{t(errors.name.message || 'กรุณากรอกชื่อ', 'Please enter your name.')}</p>}
              </div>
              <div className="form-field" data-invalid={!!errors.email || undefined}>
                <label htmlFor="contact-email">{homeData.contact.yourEmail[lang]}</label>
                <input id="contact-email" type="email" autoComplete="email" placeholder="john@example.com" {...register('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                {errors.email && <p id="email-error" className="field-error" role="alert">{t(errors.email.message || 'อีเมลไม่ถูกต้อง', 'Please enter a valid email address.')}</p>}
              </div>
              <div className="form-field" data-invalid={!!errors.message || undefined}>
                <label htmlFor="contact-message">{homeData.contact.message[lang]}</label>
                <textarea id="contact-message" rows={4} placeholder={homeData.contact.messagePlaceholder[lang]} {...register('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                {errors.message && <p id="message-error" className="field-error" role="alert">{t(errors.message.message || 'กรุณากรอกข้อความ', 'Please enter a message.')}</p>}
              </div>
              <div aria-live="polite" aria-atomic="true">
                {submitResult.error && <p className="field-error form-result" role="alert">{submitResult.error}</p>}
                {submitResult.success && <p className="form-result">{homeData.contact.sendSuccess[lang]}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} variant="accent" size="lg" aria-busy={isSubmitting}>
                {isSubmitting ? homeData.contact.sending[lang] : homeData.contact.sendMessage[lang]}
                {!isSubmitting && <Send data-icon="inline-end" aria-hidden="true" />}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
