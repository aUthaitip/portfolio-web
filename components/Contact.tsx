'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import contactSchema, { ContactFormData } from '@/schema/contact'
import { googleSheetAPI } from '@/lib/actions/googleSheetAPI'

import { homeData } from '@/data/home'

export default function Contact() {
  const { lang } = useLanguage()
  const [submitResult, setSubmitResult] = useState<{ success?: boolean; error?: string }>({})

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur', // validate ตอนออกจาก field เห็น error ทันที ไม่ต้องรอ submit
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitResult({})
    const ok = await googleSheetAPI(data)
    if (ok) {
      setSubmitResult({ success: true })
      reset()
    } else {
      setSubmitResult({ error: homeData.contact.sendFailed[lang] })
    }
  }

  return (
    <section id="contact" className="py-24 bg-card relative overflow-hidden">
      {/* Background abstract shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-heading font-extrabold text-foreground tracking-tight"
          >
            {homeData.contact.title[lang]}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1.5 w-20 bg-primary mx-auto mt-6 rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                {homeData.contact.subtitle[lang]}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {homeData.contact.description[lang]}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{homeData.contact.email[lang]}</p>
                  <a href="mailto:Authaitip.131047@gmail.com" className="text-foreground font-medium hover:text-primary transition-colors">Authaitip.131047@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{homeData.contact.phone[lang]}</p>
                  <p className="text-foreground font-medium">+66 98 197 2472</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{homeData.contact.location[lang]}</p>
                  <p className="text-foreground font-medium">Bangkok, Thailand</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/aUthaitip" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-background border border-border rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md">
                <Icons.Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="bg-background border border-border p-8 md:p-10 rounded-[2rem] shadow-xl space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground ml-1">{homeData.contact.yourName[lang]}</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register('name')}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
                {errors.name && (
                  <p className="text-sm text-destructive ml-1">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground ml-1">{homeData.contact.yourEmail[lang]}</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                />
                {errors.email && (
                  <p className="text-sm text-destructive ml-1">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground ml-1">{homeData.contact.message[lang]}</label>
                <textarea
                  rows={4}
                  placeholder={homeData.contact.messagePlaceholder[lang]}
                  {...register('message')}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50 resize-none"
                ></textarea>
                {errors.message && (
                  <p className="text-sm text-destructive ml-1">{errors.message.message}</p>
                )}
              </div>

              {submitResult.error && (
                <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl font-semibold">
                  {submitResult.error}
                </div>
              )}

              {submitResult.success && (
                <div className="p-4 bg-green-500/10 text-green-600 dark:text-green-400 text-sm rounded-xl font-semibold">
                  {homeData.contact.sendSuccess[lang]}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-xl font-heading text-lg h-14 shadow-lg shadow-primary/20 flex items-center gap-2 group">
                {isSubmitting ? homeData.contact.sending[lang] : homeData.contact.sendMessage[lang]}
                {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}