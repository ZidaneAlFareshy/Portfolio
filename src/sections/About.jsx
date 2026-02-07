import { Code2, Lightbulb, Rocket, Users, CheckCircle } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Mastery",
    description:
      "Developing robust applications using Laravel, React, and mobile technologies.",
  },
  {
    icon: Lightbulb,
    title: "UI/UX Driven",
    description:
      "Creating high-fidelity prototypes and design systems that prioritize user needs.",
  },
  {
    icon: CheckCircle,
    title: "Quality First",
    description:
      "Ensuring application reliability through systematic testing and attention to logic errors.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Working closely with cross-functional teams to deliver high-quality software solutions.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              Bridging design and code
              <span className="font-serif italic font-normal text-foreground">
                {" "}
                with functional excellence.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                As a UI/UX Designer and Full Stack Developer, I focus on
                creating digital solutions that are not only visually aesthetic
                but also technically sound. My journey includes mentoring
                upcoming developers and building professional-grade web
                interfaces using Laravel and Tailwind CSS.
              </p>

              <p>
                Currently, I am expanding my horizons into Quality Assurance. I
                believe that great software isn't just about features, but about
                reliability and a bug-free experience for the end user.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "Committed to continuous learning and creating works that are
                both aesthetic and functional."
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
