import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { ArrowLeft, ArrowUpRight, Github, Figma, Code2 } from "lucide-react";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideUpItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const fadeInItem = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline cursor-none">
            Go back to projects
          </button>
        </motion.div>
      </div>
    );

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
      <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* KIRI: Sticky Sidebar - Dibungkus dengan staggerContainer */}
          <motion.div
            className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible">
            <motion.button
              variants={slideUpItem}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group cursor-none">
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Back</span>
            </motion.button>

            <div>
              <motion.div
                variants={slideUpItem}
                className="flex flex-wrap gap-2 mb-4">
                {project.categories.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                    {cat}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                variants={slideUpItem}
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {project.title}
              </motion.h1>

              <motion.div
                variants={slideUpItem}
                className="flex flex-col gap-3 mb-8">
                {project.links?.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20 cursor-none">
                    <ArrowUpRight size={18} />
                    {link.label}
                  </a>
                ))}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl font-medium hover:bg-surface transition-all cursor-none">
                    <Github size={18} /> Source Code
                  </a>
                )}
                {project.prototypes?.map((prototype, index) => (
                  <a
                    key={index}
                    href={prototype.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl font-medium hover:bg-surface transition-all cursor-none">
                    <Figma size={18} />
                    {prototype.label}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Tech Stack */}
            <motion.div
              variants={slideUpItem}
              className="p-6 rounded-2xl glass border border-border/50 bg-surface/20">
              <div className="flex flex-wrap gap-2.5">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background text-sm font-medium border border-border/50 text-foreground shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* KANAN: Scrollable Content */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full aspect-video rounded-3xl overflow-hidden bg-muted/20 border border-border/30 shadow-2xl transform-gpu">
              <motion.img
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Deskripsi */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideUpItem}
              className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4">About The Project</h2>
              <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
                {project.fullDescription || project.description}
              </p>
            </motion.div>

            {/* Galeri Gambar */}
            {project.gallery && project.gallery.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}>
                <motion.h2
                  variants={slideUpItem}
                  className="text-2xl font-bold mb-6">
                  Gallery & Previews
                </motion.h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <motion.div
                      key={idx}
                      variants={slideUpItem}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl overflow-hidden bg-muted/20 aspect-video group border border-border/30 transform-gpu cursor-none">
                      <img
                        src={typeof img === "string" ? img : img.url}
                        alt={`${project.title} gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />

                      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
                        <span className="text-xs font-semibold text-foreground">
                          {typeof img === "object" && img.label
                            ? img.label
                            : `Preview ${idx + 1}`}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </ReactLenis>
  );
};
