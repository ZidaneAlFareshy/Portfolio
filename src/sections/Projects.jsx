import { ArrowUpRight } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projectsData } from "@/data/projectsData";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import Framer Motion

// 2. Buat konfigurasi animasi
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Jeda antar card saat muncul
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export const Projects = () => {
  const featuredProjects = projectsData.slice(0, 4);
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg Glows - Kita kurangi blur-nya sedikit atau buat statis murni */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-2xl transform-gpu pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-highlight/5 rounded-full blur-2xl transform-gpu pointer-events-none" />

      {/* 3. Gunakan motion.div dan trigger whileInView */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible" // Animasi jalan HANYA saat di-scroll ke area ini
        viewport={{ once: true, margin: "-100px" }} // Trigger animasi sebelum card benar-benar masuk layar
      >
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <motion.span
            variants={itemVariants}
            className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
            Featured Work
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
            Projects that{" "}
            <span className="font-serif italic font-normal text-foreground">
              make an impact.
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => {
            const isWebDev = project.categories.includes("Web Development");
            const isMobile = project.categories.includes("Mobile Development");
            const isDev = isWebDev || isMobile;
            const hasGithub = !!project.github;

            return (
              // 4. Hapus inline style animationDelay dan CSS animate-fade-in
              <motion.div
                variants={itemVariants}
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group glass rounded-2xl overflow-hidden md:row-span-1 shadow-sm transform-gpu will-change-transform">
                {/* Image Area */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    // Tambahkan loading="lazy" agar gambar di-load hanya saat diperlukan
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 pointer-events-none" />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 pointer-events-none" />
                </div>

                {/* Text Area */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {isDev && !hasGithub && (
                      <span className="text-[10px] font-bold tracking-wider text-muted-foreground border border-border px-2 py-1 rounded bg-surface/50 ml-2">
                        PRIVATE
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
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
