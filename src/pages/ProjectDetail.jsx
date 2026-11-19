import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { ArrowLeft, ArrowUpRight, Github, Figma, Code2, X } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const GalleryItem = ({
  img,
  idx,
  projectTitle,
  shouldReduceMotion,
  slideUpItem,
  onClick,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const direction = idx % 2 === 0 ? 1 : -1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion
      ? ["0%", "0%"]
      : [`${-5 * direction}%`, `${5 * direction}%`],
  );

  return (
    <motion.div
      ref={ref}
      variants={slideUpItem}
      onClick={onClick}
      // Mengubah cursor-none menjadi cursor-pointer agar terlihat bisa diklik
      className="group relative rounded-2xl overflow-hidden bg-muted/20 aspect-video border border-border/30 cursor-pointer">
      <motion.div style={{ y }} className="absolute inset-[-8%]">
        <img
          src={typeof img === "string" ? img : img.url}
          alt={`${projectTitle} gallery ${idx + 1}`}
          className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs font-semibold text-foreground">
          {typeof img === "object" && img.label
            ? img.label
            : `Preview ${idx + 1}`}
        </span>
      </div>
    </motion.div>
  );
};

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // State untuk menyimpan gambar yang sedang di-klik (lightbox)
  const [selectedImage, setSelectedImage] = useState(null);

  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroParallaxY = useTransform(
    heroProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-6%", "6%"],
  );

  const project = projectsData.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Disable scroll pada body ketika modal terbuka
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 },
    },
  };

  const slideUpItem = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const revealVariant = {
    hidden: {
      clipPath: shouldReduceMotion ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
    },
    visible: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
  };

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}>
          <h1 className="text-3xl font-black mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline cursor-none">
            Go back to projects
          </button>
        </motion.div>
      </div>
    );

  const secondaryLinks = [
    ...(project.links
      ?.slice(1)
      .map((link) => ({ ...link, Icon: ArrowUpRight })) || []),
    ...(project.github
      ? [{ label: "Source Code", url: project.github, Icon: Github }]
      : []),
    ...(project.prototypes?.map((p) => ({ ...p, Icon: Figma })) || []),
  ];

  return (
    <>
      <ReactLenis
        root
        options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}>
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            {/* KIRI: Sticky Sidebar */}
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible">
              <motion.button
                variants={slideUpItem}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group cursor-none">
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                <span className="text-sm font-medium">Back to Projects</span>
              </motion.button>

              <div>
                <motion.div
                  variants={slideUpItem}
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-wider text-muted-foreground mb-4">
                  {project.categories.map((cat, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && (
                        <span className="text-muted-foreground/40">/</span>
                      )}
                      {cat}
                    </span>
                  ))}
                </motion.div>

                <motion.h1
                  variants={revealVariant}
                  className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight mb-8">
                  {project.title}
                </motion.h1>

                <motion.div
                  variants={slideUpItem}
                  className="flex flex-col gap-1">
                  {project.links?.[0] && (
                    <a
                      href={project.links[0].url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between w-full px-5 py-4 bg-foreground text-background rounded-xl font-medium cursor-none">
                      <span>{project.links[0].label}</span>
                      <ArrowUpRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  )}

                  {secondaryLinks.length > 0 && (
                    <div className="flex flex-col divide-y divide-border/50 border-t border-border/50 mt-3">
                      {secondaryLinks.map((item, i) => (
                        <a
                          key={i}
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center gap-2 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-none">
                          <item.Icon size={14} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Tech Stack */}
              <motion.div
                variants={slideUpItem}
                className="pt-8 border-t border-border/50">
                <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground mb-4">
                  <Code2 size={12} />
                  Built With
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* KANAN: Scrollable Content */}
            <div className="lg:col-span-8 space-y-16">
              <motion.div
                ref={heroRef}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted/20 border border-border/30 shadow-2xl">
                <motion.div
                  style={{ y: heroParallaxY }}
                  className="absolute inset-[-8%]">
                  <motion.img
                    initial={shouldReduceMotion ? false : { scale: 1.15 }}
                    animate={{ scale: 1.08 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Deskripsi */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}>
                <motion.h2
                  variants={revealVariant}
                  className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  Overview
                </motion.h2>
                <motion.p
                  variants={slideUpItem}
                  className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap max-w-2xl">
                  {project.fullDescription || project.description}
                </motion.p>
              </motion.div>

              {/* Galeri Gambar */}
              {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={staggerContainer}>
                  <motion.h2
                    variants={revealVariant}
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                    Gallery
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.gallery.map((img, idx) => (
                      <GalleryItem
                        key={idx}
                        img={img}
                        idx={idx}
                        projectTitle={project.title}
                        shouldReduceMotion={shouldReduceMotion}
                        slideUpItem={slideUpItem}
                        onClick={() =>
                          setSelectedImage(
                            typeof img === "string" ? img : img.url,
                          )
                        }
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </ReactLenis>

      {/* MODAL LIGHTBOX UNTUK GAMBAR */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4 sm:p-10 cursor-pointer">
            {/* Tombol Close */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-muted/50 hover:bg-muted text-foreground transition-colors z-[101]">
              <X size={24} />
            </button>

            {/* Gambar Besar */}
            <motion.img
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik gambar itu sendiri
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
