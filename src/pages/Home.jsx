import { ReactLenis } from "lenis/react";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Contact } from "@/sections/Contact";
import { Certificates } from "@/sections/Certificates";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden cursor-none">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          boxShadow: "0 0 0 200vw var(--background)",
          backgroundColor: "transparent",
        }}
        initial={{ width: 0, height: 0 }}
        exit={{ width: "200vw", height: "200vw" }}
        transition={{
          duration: 2.0,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* Efek Radial*/}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}>
        <div className="w-[40vw] h-[40vw] bg-primary/20 blur-[100px] rounded-full animate-pulse" />
      </motion.div>

      {/* Logo */}
      <motion.div
        className="flex flex-col items-center gap-8 relative z-10"
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}>
        {/* Animasi Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-8xl font-bold tracking-tighter flex items-end text-foreground">
          J
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
            className="text-primary">
            .
          </motion.span>
        </motion.div>

        {/* Progress Bar Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-48 md:w-64 h-1 bg-surface rounded-full overflow-hidden border border-border/50 shadow-inner">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Preparing Portfolio
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

let isFirstLoad = true;

export const Home = () => {
  const [isLoading, setIsLoading] = useState(isFirstLoad);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      isFirstLoad = false;
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <ReactLenis
        root
        options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
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
    </>
  );
};
