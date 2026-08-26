import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { useActiveSection } from './hooks/useActiveSection'
import { Home } from './sections/Home'
import { About } from './sections/About'
import { Education } from './sections/Education'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Homelab } from './sections/Homelab'
import { Hobbies } from './sections/Hobbies'
import { Contact } from './sections/Contact'

const SECTION_IDS: string[] = [
  'home',
  'about',
  'education',
  'projects',
  'skills',
  'homelab',
  'hobbies',
  'contact',
]

function App() {
  const { activeId, visibleSections } = useActiveSection(SECTION_IDS)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeSection={activeId} />

      <main className="flex-1 pt-16" id="main-content">
        <Home isVisible={visibleSections.has('home')} />
        <About isVisible={visibleSections.has('about')} />
        <Education isVisible={visibleSections.has('education')} />
        <Projects isVisible={visibleSections.has('projects')} />
        <Skills isVisible={visibleSections.has('skills')} />
        <Homelab isVisible={visibleSections.has('homelab')} />
        <Hobbies isVisible={visibleSections.has('hobbies')} />
        <Contact isVisible={visibleSections.has('contact')} />
      </main>

      <Footer />
    </div>
  )
}

export default App