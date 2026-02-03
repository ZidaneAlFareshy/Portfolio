import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable and efficient code following best practices and design patterns.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing applications for speed and responsiveness to ensure a smooth user experience.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Working closely with cross-functional teams to deliver high-quality software solutions.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying updated with the latest technologies and trends to bring fresh ideas to projects.",
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
              Building the future,
              <span className="font-serif italic font-normal text-foreground">
                {" "}
                one component at a time.
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in animation-delay-200">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                sequi cumque consequatur officia quaerat magnam provident iusto
                consectetur enim, inventore, quos labore aut temporibus ex ab,
                voluptas voluptatum vero officiis!
              </p>

              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
                modi provident corrupti cumque dignissimos adipisci, earum,
                recusandae non repellat excepturi ipsa numquam. Accusantium
                praesentium voluptate labore quia voluptatum error nobis?
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perferendis, maxime. Eligendi quod similique explicabo
                repellendus numquam aperiam ad temporibus, officiis autem
                veritatis vero assumenda ea saepe inventore sequi dolores
                facere!
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="text-lg font-medium italic text-foreground">
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
                nihil ut delectus! Amet quidem, eveniet itaque natus dicta unde
                iste corporis corrupti dolorum voluptatum voluptas libero alias
                eius aperiam quasi."
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
