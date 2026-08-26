import { Navigation } from './components/Navigation'
import { Section, SectionHeader } from './components/Section'
import { Footer } from './components/Footer'
import { useActiveSection } from './hooks/useActiveSection'

const SECTION_IDS: string[] = [
  'home',
  'about',
  'education',
  'skills',
  'projects',
  'homelab',
  'hobbies',
  'contact',
]

function App() {
  const activeSection = useActiveSection(SECTION_IDS)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeSection={activeSection} />

      <main className="flex-1 pt-16" id="main-content">
        <Section id="home">
          <SectionHeader
            id="home-heading"
            title="Faraz Kayan Haque"
            description="Student & Builder"
          />
        </Section>

        <Section id="about">
          <SectionHeader
            id="about-heading"
            label="About"
            title="About"
            description="Placeholder for About section"
          />
        </Section>

        <Section id="education">
          <SectionHeader
            id="education-heading"
            label="Education"
            title="Education"
            description="Placeholder for Education section"
          />
        </Section>

        <Section id="skills">
          <SectionHeader
            id="skills-heading"
            label="Skills"
            title="Skills"
            description="Placeholder for Skills section"
          />
        </Section>

        <Section id="projects">
          <SectionHeader
            id="projects-heading"
            label="Projects"
            title="Projects"
            description="Placeholder for Projects section"
          />
        </Section>

        <Section id="homelab">
          <SectionHeader
            id="homelab-heading"
            label="Homelab"
            title="Homelab"
            description="Placeholder for Homelab section"
          />
        </Section>

        <Section id="hobbies">
          <SectionHeader
            id="hobbies-heading"
            label="Hobbies"
            title="Hobbies"
            description="Placeholder for Hobbies section"
          />
        </Section>

        <Section id="contact">
          <SectionHeader
            id="contact-heading"
            label="Contact"
            title="Contact"
            description="Placeholder for Contact section"
          />
        </Section>
      </main>

      <Footer />
    </div>
  )
}

export default App