import { groq } from 'next-sanity'

export const profileQuery = groq`*[_type == "profile"][0] {
  name,
  headline,
  profileImage,
  shortBio,
  fullBio,
  email,
  githubUrl,
  linkedinUrl,
  education
}`

export const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  mainImage,
  summary,
  technologies,
  projectUrl,
  githubUrl,
  projectType,
  figmaUrl
}`

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  summary,
  content,
  technologies,
  projectUrl,
  githubUrl,
  projectType,
  figmaUrl
}`

export const experiencesQuery = groq`*[_type == "experience"] | order(startDate desc) {
  _id,
  jobTitle,
  company,
  companyLogo,
  companyImage,
  startDate,
  endDate,
  durationMonths,
  isCurrent,
  description
}`
