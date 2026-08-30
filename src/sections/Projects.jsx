import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projectsData } from "@/data/projectsData";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const FeaturedProjectCard = ({ project, onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const isDev =
    project.categories.includes("Web Development") ||
    project.categories.includes("Mobile Development");
  const isPrivate = isDev && !project.github;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onNavigate}
      className="group relative glass rounded-2xl overflow-hidden shadow-sm cursor-none">
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

      <div className="relative overflow-hidden aspect-video bg-muted/20">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 ease-out"
        />
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          {isPrivate && (
            <span className="text-[10px] font-medium tracking-wider uppercase text-muted-foreground/70">
              Private
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-3 gap-y-1 pt-2 text-xs text-muted-foreground">
          {project.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const featuredProjects = projectsData.slice(0, 4);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="projects" className="py-32 relative">
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}>
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <motion.span
            variants={itemVariants}
            className="text-[11px] font-medium tracking-[0.25em] uppercase text-muted-foreground">
            Featured Work
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mt-4 mb-6 tracking-tight text-secondary-foreground">
            Projects that{" "}
            <span className="font-serif italic font-normal text-foreground">
              make an impact.
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-lg">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              onNavigate={() => navigate(`/project/${project.id}`)}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link to="/projects">
            <AnimatedBorderButton>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
