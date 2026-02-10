import { ArrowUpRight, Github, Figma, Lock } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projectsData } from "@/data/projectsData";
import { Link } from "react-router-dom";

export const Projects = () => {
  const featuredProjects = projectsData.slice(0, 4);
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Bg Glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that{" "}
            <span className="font-serif italic font-normal text-foreground">
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from complex web applications to
            innovative tools that solve real-world problems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => {
            const isWebDev = project.categories.includes("Web Development");
            const isMobile = project.categories.includes("Mobile Development");
            const isDev = isWebDev || isMobile;

            const hasGithub = !!project.github;
            const hasLink = !!project.link;
            const hasFigma = !!project.figma;

            return (
              <div
                key={project.id}
                className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                {/* Image Area */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                  {/* Overlay Icons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                    {/* 1. External Link (Website Live) */}
                    {hasLink && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                        title="View Live Project">
                        <ArrowUpRight className="w-5 h-5" />
                      </a>
                    )}

                    {/* 2. Logic GitHub vs Lock */}
                    {isDev &&
                      (hasGithub ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                          title="View Source Code">
                          <Github className="w-5 h-5" />
                        </a>
                      ) : (
                        <div
                          className="p-3 rounded-full glass bg-black/80 text-white/70 cursor-not-allowed shadow-lg border border-white/10"
                          title="Project is Strictly Private / NDA Protected">
                          <Lock className="w-5 h-5" />
                        </div>
                      ))}

                    {/* 3. Logic Figma */}
                    {hasFigma && (
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                        title="View Figma File">
                        <Figma className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Text Area */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Badge PRIVATE */}
                    {isDev && !hasGithub && (
                      <span className="text-[10px] font-bold tracking-wider text-muted-foreground border border-border px-2 py-1 rounded bg-surface/50 ml-2">
                        PRIVATE
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <Link to="/projects">
            <AnimatedBorderButton>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
