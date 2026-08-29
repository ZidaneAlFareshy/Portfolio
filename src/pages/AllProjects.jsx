import { ReactLenis } from "lenis/react";
import { useState, useEffect, useMemo } from "react";
import { projectsData } from "@/data/projectsData";
import { ChevronDown } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import Framer Motion

// Varian untuk efek muncul berurutan (stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }, // Muncul satu per satu dengan cepat
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

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

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
        {/* Header Halaman */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            All <span className="text-primary">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore my complete portfolio categorized by technical domain.
          </p>
        </motion.div>

        {/* Filter Categories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-none ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_var(--color-primary)]"
                  : "bg-surface text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid Projects - Menggunakan AnimatePresence untuk filter transisi */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, visibleCount).map((project) => {
              return (
                <motion.div
                  layout // Ini kunci agar card bergeser mulus saat filter diklik
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  key={project.id}
                  onClick={() => navigate(`/project/${project.id}`)}
                  // Hapus animate-fade-in Tailwind, gunakan hover dan will-change dari Tailwind
                  className="group glass rounded-2xl overflow-hidden flex flex-col transform-gpu will-change-transform transition-transform duration-300 hover:-translate-y-2 cursor-none shadow-sm hover:shadow-md">
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-video bg-muted/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy" // Penting untuk performa scroll
                      decoding="async"
                      className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* pointer-events-none agar tidak menghalangi event klik */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-2">
                        {project.categories.map((cat, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary whitespace-nowrap">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-md bg-surface text-[11px] font-medium border border-border/50 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
