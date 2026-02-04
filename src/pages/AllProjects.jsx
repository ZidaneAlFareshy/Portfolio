import { useState, useEffect } from "react";
import { projectsData } from "@/data/projectsData";
import { ArrowUpRight, Github } from "lucide-react";

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(projectsData.flatMap((item) => item.categories)),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((item) => item.categories.includes(activeCategory));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      {/* Header Halaman */}
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          All <span className="text-primary">Projects</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore my complete portfolio categorized by technical domain.
        </p>
      </div>

      {/* Tombol Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in animation-delay-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_var(--color-primary)]"
                : "bg-surface text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Projects */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animation-delay-200">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group glass rounded-2xl overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative overflow-hidden aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.link}
                  className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                  <ArrowUpRight size={20} />
                </a>
                <a
                  href={project.github}
                  className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all">
                  <Github size={20} />
                </a>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((cat, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pesan jika kosong */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};
