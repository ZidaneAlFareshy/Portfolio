import { ReactLenis } from "lenis/react";
import { useState, useEffect, useMemo } from "react";
import { projectsData } from "@/data/projectsData";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const ProjectCard = ({ project, isFeatured, onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onNavigate}
      className={`group relative glass rounded-2xl overflow-hidden flex flex-col cursor-none shadow-sm hover:shadow-md transition-shadow duration-300 ${
        isFeatured ? "md:col-span-2 md:row-span-2" : ""
      }`}>
      {/* Cursor-follow label replaces the old zoom + dark overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ left: mousePos.x, top: mousePos.y }}
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full bg-foreground text-background text-xs font-medium px-4 py-2 whitespace-nowrap">
            View Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image */}
      <div
        className={`relative overflow-hidden bg-muted/20 ${
          isFeatured ? "aspect-[4/3]" : "aspect-video"
        }`}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div
        className={`flex flex-col flex-grow space-y-3 ${
          isFeatured ? "p-6 md:p-8" : "p-6"
        }`}>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-muted-foreground">
          {project.categories.map((cat, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-muted-foreground/40">/</span>}
              {cat}
            </span>
          ))}
        </div>

        <h3
          className={`font-bold leading-snug ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}>
          {project.title}
        </h3>

        <p
          className={`text-muted-foreground text-sm flex-1 ${
            isFeatured ? "line-clamp-4 md:text-base" : "line-clamp-3"
          }`}>
          {project.description}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-4 mt-auto border-t border-border/50 text-xs text-muted-foreground">
          {project.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const categories = useMemo(() => {
    return ["All", ...new Set(projectsData.flatMap((item) => item.categories))];
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((item) => item.categories.includes(activeCategory));

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Container only orchestrates timing (stays fully opaque itself) — each
  // card carries its own hidden/visible state via cardVariants, so this is
  // what actually makes staggerChildren do something real.
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 },
    },
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
        {/* Header */}
        <div className="mb-20 md:mb-28">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="block text-xs md:text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
            {activeCategory === "All" ? "All Work" : activeCategory} ·{" "}
            {String(filteredProjects.length).padStart(2, "0")}
          </motion.span>

          <motion.h1
            initial={
              shouldReduceMotion ? false : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="text-[clamp(3.5rem,11vw,8.5rem)] font-black leading-[0.9] tracking-tight pb-2 border-b border-border/60">
            Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-md text-muted-foreground text-base md:text-lg mt-6">
            A collection of things I've designed and built, organized by domain.
          </motion.p>
        </div>

        {/* Filter tabs — underline index instead of pill row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-8 overflow-x-auto mb-16 md:mb-20 border-b border-border/60 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap flex-shrink-0 pb-4 text-sm font-medium tracking-wide transition-colors cursor-none ${
                activeCategory === cat
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="activeCategoryUnderline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid — first visible card becomes the featured/bento slot */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                isFeatured={idx === 0}
                onNavigate={() => navigate(`/project/${project.id}`)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-muted-foreground">
              No projects found in this category.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12">
            <button onClick={handleLoadMore} className="cursor-none">
              <AnimatedBorderButton>
                Load More Projects
                <ChevronDown className="w-5 h-5" />
              </AnimatedBorderButton>
            </button>
          </motion.div>
        )}
      </div>
    </ReactLenis>
  );
};
