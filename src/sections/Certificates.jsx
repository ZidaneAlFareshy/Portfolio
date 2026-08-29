import { Award, ExternalLink, X, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const certificatesRow1 = [
  {
    name: "Become a Expert Front-end Developer",
    issuer: "Dicoding",
    year: "2023",
    image: "/certificates/cert-dicoding-expert.png",
  },
  {
    name: "Fundamentals of Front-end Web Development",
    issuer: "Dicoding",
    year: "2023",
    image: "/certificates/cert-dicoding-fundweb.png",
  },
  {
    name: "Version Control with Git & GitHub",
    issuer: "Dicoding",
    year: "2023",
    image: "/certificates/cert-dicoding-git.png",
  },
  {
    name: "Cloud and Gen AI",
    issuer: "Dicoding",
    year: "2025",
    image: "/certificates/cert-dicoding-cloud.png",
  },
  {
    name: "SQL",
    issuer: "Sololearn",
    year: "2022",
    image: "/certificates/cert-sololearn-sql.png",
  },
  {
    name: "Mentor Appreciation",
    issuer: "Coding Camp",
    year: "2025",
    image: "/certificates/mentor.png",
  },
];

const certificatesRow2 = [
  {
    name: "Implementing Machine Learning for Android",
    issuer: "Dicoding",
    year: "2024",
    image: "/certificates/cert-dicoding-ml.png",
  },
  {
    name: "Android Development Basics",
    issuer: "Dicoding",
    year: "2024",
    image: "/certificates/cert-dicoding-fundand.png",
  },
  {
    name: "Intermediate application development",
    issuer: "Dicoding",
    year: "2024",
    image: "/certificates/cert-dicoding-interand.png",
  },
  {
    name: "QA Fundamental",
    issuer: "MySkill",
    year: "2026",
    image: "/certificates/cert-myskill-fundqa.png",
  },
  {
    name: "Bangkit Academy Android Learning Path",
    issuer: "Bangkit Academy",
    year: "2024",
    image: "/certificates/bangkit.png",
  },
  {
    name: "English for Busineness Communication",
    issuer: "Bangkit Academy",
    year: "2024",
    image: "/certificates/english.png",
  },
];

// Animasi untuk Judul
const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.15,
    },
  },
};

const CertificateCard = ({ cert, onClick }) => (
  <div
    onClick={() => onClick(cert)}
    className="flex items-center gap-4 p-4 mx-4 w-80 glass rounded-xl hover:bg-surface/50 transition-colors group relative cursor-none flex-shrink-0 transform-gpu">
    <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
      <Award size={24} />
    </div>
    <div>
      <h4 className="font-bold text-foreground text-sm line-clamp-1">
        {cert.name}
      </h4>
      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
        <span>{cert.issuer}</span>
        <span className="w-1 h-1 rounded-full bg-primary" />
        <span>{cert.year}</span>
      </div>
    </div>

    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
      <Eye size={16} className="text-primary" />
    </div>
  </div>
);

const CertificateModal = ({ cert, onClose }) => {
  if (!cert) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-none"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[90vh] glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-surface/50">
          <div>
            <h3 className="text-lg font-bold">{cert.name}</h3>
            <p className="text-sm text-muted-foreground">
              {cert.issuer} • {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors cursor-none">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 bg-black/20 flex items-center justify-center min-h-[300px]">
          <img
            src={
              cert.image ||
              "https://placehold.co/600x400/png?text=No+Image+Available"
            }
            alt={cert.name}
            loading="lazy"
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg will-change-transform transform-gpu"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400/png?text=Image+Error";
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Duplikasi array untuk seamless infinite loop
  const duplicatedRow1 = [...certificatesRow1, ...certificatesRow1];
  const duplicatedRow2 = [...certificatesRow2, ...certificatesRow2];

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none transform-gpu" />

      <motion.div
        className="text-center max-w-3xl mx-auto mb-16 px-6 relative z-10"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}>
        <motion.span
          variants={headerVariants}
          className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
          Accomplishments
        </motion.span>
        <motion.h2
          variants={headerVariants}
          className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-secondary-foreground">
          Certificates{" "}
          <span className="font-serif italic font-normal text-foreground">
            & Awards.
          </span>
        </motion.h2>
      </motion.div>

      {/* Marquee Container dengan Framer Motion */}
      <div className="flex flex-col gap-8 mask-gradient relative z-10">
        {/* Row 1 (Kanan ke Kiri) */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35, // Sesuaikan kecepatan
                ease: "linear",
              },
            }}>
            {duplicatedRow1.map((cert, idx) => (
              <CertificateCard
                key={`row1-${idx}`}
                cert={cert}
                onClick={setSelectedCert}
              />
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Kiri ke Kanan) */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}>
            {duplicatedRow2.map((cert, idx) => (
              <CertificateCard
                key={`row2-${idx}`}
                cert={cert}
                onClick={setSelectedCert}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
