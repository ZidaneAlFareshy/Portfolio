import { ArrowUpRight } from "lucide-react"; // Github, Figma, Lock dihapus karena sudah tidak dipakai di sini
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { projectsData } from "@/data/projectsData";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate

export const Projects = () => {
  const featuredProjects = projectsData.slice(0, 4);
  const navigate = useNavigate(); // Inisialisasi navigate

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

            return (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)} // Fungsi klik ditambahkan ke detail
                /* PERBAIKAN: Hover efek disamakan dengan AllProjects, tanpa cursor-pointer */
                className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1 shadow-sm"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                {/* Image Area */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />

                  {/* Efek transisi overlay tipis saat hover agar lebih dramatis */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
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
