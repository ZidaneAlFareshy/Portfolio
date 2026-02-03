import { Navbar } from "@/layout/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Testimonials } from "@/sections/Testimonials";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/layout/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import Cursor from "@/components/Cursor";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <Cursor />
      <Navbar />
      <ThemeToggle />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        {/* <Testimonials /> */}
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
