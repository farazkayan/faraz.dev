import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Homelab } from './components/Homelab';
import { Hobbies } from './components/Hobbies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Companion } from './components/Companion';

export default function App() {
  return (
    <div className="min-h-screen bg-[#111113] text-[#F5F5F5] font-sans selection:bg-[#9333EA]/30">
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Homelab />
        <Hobbies />
        <Contact />
      </main>

      <Footer />
      <Companion />
    </div>
  );
}
