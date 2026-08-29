import { ReactLenis } from "lenis/react";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Certificates } from "@/sections/Certificates";

export const Home = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Certificates />
        {/* <Testimonials /> */}
        <Contact />
      </main>
    </ReactLenis>
  );
};
