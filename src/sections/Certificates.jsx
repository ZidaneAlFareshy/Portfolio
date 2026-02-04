import { Award, ExternalLink, X, Eye } from "lucide-react";
import { useState, useEffect } from "react";

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

const CertificateCard = ({ cert, onClick }) => (
  <div
    onClick={() => onClick(cert)}
    className="flex items-center gap-4 p-4 mx-4 w-80 glass rounded-xl hover:bg-surface/50 transition-colors group relative">
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
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <div
        className="relative max-w-4xl w-full max-h-[90vh] glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        {/* Header Modal */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-surface/50">
          <div>
            <h3 className="text-lg font-bold">{cert.name}</h3>
            <p className="text-sm text-muted-foreground">
              {cert.issuer} • {cert.year}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Image Area */}
        <div className="flex-1 overflow-auto p-4 bg-black/20 flex items-center justify-center min-h-[300px]">
          <img
            src={
              cert.image ||
              "https://placehold.co/600x400/png?text=No+Image+Available"
            }
            alt={cert.name}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/600x400/png?text=Image+Error";
            }}
          />
        </div>
      </div>
    </div>
  );
};

export const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16 px-6 relative z-10">
        <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
          Accomplishments
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
          Certificates{" "}
          <span className="font-serif italic font-normal text-foreground">
            & Awards.
          </span>
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="flex flex-col gap-8 mask-gradient relative z-10">
        {/* Row 1 */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {[...certificatesRow1, ...certificatesRow1].map((cert, idx) => (
              <CertificateCard
                key={`row1-${idx}`}
                cert={cert}
                onClick={setSelectedCert} // Pass fungsi handler
              />
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...certificatesRow2, ...certificatesRow2].map((cert, idx) => (
              <CertificateCard
                key={`row2-${idx}`}
                cert={cert}
                onClick={setSelectedCert}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Render Modal jika ada sertifikat yang dipilih */}
      {selectedCert && (
        <CertificateModal
          cert={selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </section>
  );
};
