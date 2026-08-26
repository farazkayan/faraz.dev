export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface Project {
  name: string
  description: string
  href?: string
  github?: string
  technologies: string[]
  featured: boolean
}

export interface Skill {
  name: string
  category: 'language' | 'framework' | 'tool' | 'platform' | 'ai'
  proficiency: 'learning' | 'comfortable' | 'experienced'
}