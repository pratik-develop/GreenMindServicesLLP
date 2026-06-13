import { projectSchema }    from './project'
import { certificateSchema } from './certificate'
import { serviceSchema }     from './service'
import { blogPostSchema }    from './blogPost'
import { faqItemSchema }     from './faqItem'
import { teamMemberSchema }  from './teamMember'

export const schemaTypes = [
  projectSchema,
  certificateSchema,
  serviceSchema,
  blogPostSchema,
  faqItemSchema,
  teamMemberSchema,
]
