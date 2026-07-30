import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  message: z.string().min(1, 'กรุณากรอกข้อความ'),
})

export type ContactFormData = z.infer<typeof contactSchema>

export type ContactFormState = {
  error?: string
  success?: boolean
}

export default contactSchema