import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Projects from "./components/Projects";
import Challenges from "./components/Challenges";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Hero />
        <About />
        <Projects />
        <Challenges />
        <Skills />
        <Contact />
      </main>
    </LanguageProvider>
  );
}

export default App;
