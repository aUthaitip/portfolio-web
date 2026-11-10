// Preview by default. Pass --apply only when ready to publish these content updates.
import { existsSync } from 'node:fs'
import { createClient } from 'next-sanity'
import { resumeProfile, resumeProjects, resumeExperiences, education } from '../data/resume.ts'

for (const file of ['.env.local', '.env']) {
  if (existsSync(file)) process.loadEnvFile(file)
}
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apply = process.argv.includes('--apply')
if (!projectId || !dataset) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local, then run again.')
  process.exit(1)
}
if (apply && !process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Set SANITY_API_WRITE_TOKEN in .env.local to apply content updates.')
  process.exit(1)
}
const client = createClient({ projectId, dataset, apiVersion: '2026-01-01', useCdn: false, token: process.env.SANITY_API_WRITE_TOKEN })
const docs = await client.fetch('*[_type in ["profile", "experience", "project"] && !(_id in path("drafts.**"))]')
const normalize = (value) => String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '')
const companyAliases = {
  sunmith: ['sunmithcoltd'],
  softwareandscale: ['softwareandscaleengineeringcoltd'],
}
const projectAliases = {
  pawplan: ['vetcareclinicmanagementsystem'],
}
const names = (value) => typeof value === 'string' ? [value] : Object.values(value || {}).filter((v) => typeof v === 'string')
let tx = client.transaction()
let count = 0
function queue(type, fields, matches) {
  if (matches.length > 1) {
    throw new Error(`Resolve duplicate or draft ${type} documents before syncing.`)
  }
  const existing = matches[0]
  if (existing) {
    tx = tx.patch(existing._id, (patch) => patch.ifRevisionId(existing._rev).set(fields))
  } else {
    tx = tx.create({ _type: type, ...fields })
  }
  console.log(`${existing ? 'Update' : 'Create'} ${type}: ${names(fields.title || fields.name || fields.company)[0]}`)
  count++
}
// Stop if an editor has unpublished changes; do not publish over their work.
const drafts = await client.fetch('*[_type in ["profile", "experience", "project"] && _id in path("drafts.**")][0]._id')
if (drafts) throw new Error('Publish or resolve existing portfolio drafts in Studio before syncing.')
queue('profile', {
  ...resumeProfile,
  fullBio: Object.fromEntries(['th', 'en'].map((lang) => [lang, `${resumeProfile.shortBio[lang]}\n\n${resumeProfile.fullBio[lang]}\n\nGPA ${education.gpa}`])),
  education: { degree: education.degree, university: education.university, period: education.period, gpa: Number(education.gpa) },
}, docs.filter((doc) => doc._type === 'profile'))
for (const entry of resumeExperiences) {
  const fields = { ...entry }
  delete fields._id
  const key = normalize(fields.company.en)
  const aliases = [key, ...(companyAliases[key] || [])]
  queue('experience', fields, docs.filter((doc) => doc._type === 'experience' && names(doc.company).some((name) => aliases.includes(normalize(name)))))
}
for (const entry of resumeProjects) {
  const fields = { ...entry }
  delete fields._id
  const key = normalize(fields.slug.current)
  const aliases = [key, ...(projectAliases[key] || [])]
  const existing = docs.filter((doc) => doc._type === 'project' && (
    aliases.some((alias) => normalize(doc.slug?.current) === alias || names(doc.title).some((name) => normalize(name).includes(alias))) ||
    (fields.projectUrl && doc.projectUrl?.split('?')[0].replace(/\/$/, '') === fields.projectUrl.replace(/\/$/, ''))
  ))
  // Keep existing slugs, screenshots, content, and links (including PawPlan).
  if (existing[0]?.slug?.current) fields.slug = existing[0].slug
  queue('project', { ...fields, projectType: 'website' }, existing)
}
if (apply) {
  await tx.commit()
  console.log(`Published ${count} content updates to ${projectId}/${dataset}.`)
} else {
  console.log(`Preview only: ${count} updates. Run npm run resume:sync -- --apply to publish to ${projectId}/${dataset}.`)
}
