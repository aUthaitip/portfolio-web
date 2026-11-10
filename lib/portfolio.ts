import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'

export type Language = 'th' | 'en'
export type LocalizedText = string | { th?: string; en?: string; _type?: string } | null
export type Profile = {
  name?: LocalizedText
  headline?: LocalizedText
  shortBio?: LocalizedText
  fullBio?: LocalizedText
  profileImage?: SanityImageSource
  email?: string
  githubUrl?: string
  linkedinUrl?: string
  education?: { degree?: LocalizedText; university?: LocalizedText; period?: string; gpa?: number }
}
export type Project = {
  _id: string
  title?: LocalizedText
  summary?: LocalizedText
  slug?: { current?: string }
  mainImage?: SanityImageSource
  technologies?: string[]
  projectUrl?: string
  githubUrl?: string
  figmaUrl?: string
  projectType?: string
  content?: PortableTextBlock[] | { th?: PortableTextBlock[]; en?: PortableTextBlock[] }
}
export type Experience = {
  _id: string
  jobTitle?: LocalizedText
  company?: LocalizedText
  description?: LocalizedText
  companyLogo?: SanityImageSource
  companyImage?: SanityImageSource
  startDate?: string
  endDate?: string
  durationMonths?: number
  isCurrent?: boolean
}

export function localized(value: LocalizedText | undefined, lang: Language): string {
  return typeof value === 'string' ? value.trim() : (value?.[lang] || value?.en || value?.th || '').trim()
}

export function localizedHref(path: string, lang: Language): string {
  return `/${lang}${path === '/' ? '' : path}`
}

export function experienceMonths(experience: Experience): number {
  if (experience.durationMonths && experience.durationMonths > 0) return experience.durationMonths
  if (!experience.startDate) return 0
  const start = new Date(experience.startDate)
  const end = experience.endDate ? new Date(experience.endDate) : new Date()
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return 0
  return Math.max(1, (end.getUTCFullYear() - start.getUTCFullYear()) * 12 + end.getUTCMonth() - start.getUTCMonth())
}

export function smallImage(source: SanityImageSource): boolean {
  const ref = (source as { asset?: { _ref?: string } })?.asset?._ref || ''
  const dimensions = ref.match(/-(\d+)x(\d+)-/)
  return !!dimensions && Number(dimensions[1]) < 160
}
