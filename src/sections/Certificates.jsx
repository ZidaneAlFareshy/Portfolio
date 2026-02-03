import { Award, BadgeCheck, ExternalLink } from "lucide-react";

const certificatesRow1 = [
  { name: "Google UX Design", issuer: "Coursera", year: "2025" },
  { name: "Meta Frontend Developer", issuer: "Coursera", year: "2024" },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
  },
  { name: "React Advanced Guide", issuer: "Udemy", year: "2023" },
  { name: "UI/UX Masterclass", issuer: "Dribbble", year: "2025" },
];

const certificatesRow2 = [
  { name: "JavaScript Algorithms", issuer: "FreeCodeCamp", year: "2023" },
  { name: "Fullstack Bootcamp", issuer: "Harisenin", year: "2024" },
  { name: "Figma for Designers", issuer: "Domestika", year: "2023" },
  { name: "Agile Project Management", issuer: "Google", year: "2025" },
  { name: "Cybersecurity Basics", issuer: "Cisco", year: "2024" },
];

const CertificateCard = ({ cert }) => (
  <div className="flex items-center gap-4 p-4 mx-4 w-80 glass rounded-xl hover:bg-surface/50 transition-colors group cursor-default">
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
      <ExternalLink size={16} className="text-muted-foreground" />
    </div>
  </div>
);

export const Certificates = () => {
  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-16">
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
        {/* Row 1: Bergerak ke KANAN (Reverse) */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
            {/* Kita render 2 kali agar infinite loop mulus */}
            {[...certificatesRow1, ...certificatesRow1].map((cert, idx) => (
              <CertificateCard key={`row1-${idx}`} cert={cert} />
            ))}
          </div>
        </div>

        {/* Row 2: Bergerak ke KIRI (Normal) */}
        <div className="flex overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {[...certificatesRow2, ...certificatesRow2].map((cert, idx) => (
              <CertificateCard key={`row2-${idx}`} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
