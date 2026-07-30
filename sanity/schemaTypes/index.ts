import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import experience from './experience'
import profile from './profile'
import localeString from './localeString'
import localeText from './localeText'
import localeBlockContent from './localeBlockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, experience, profile, localeString, localeText, localeBlockContent],
}
