import { useState, useEffect, useMemo } from "react";
import { projectsData } from "@/data/projectsData";
import { ChevronDown } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import { useNavigate } from "react-router-dom";

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const categories = useMemo(() => {
    return ["All", ...new Set(projectsData.flatMap((item) => item.categories))];
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((item) => item.categories.includes(activeCategory));

  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

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

      {/* Filter Categories */}
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
        {filteredProjects.slice(0, visibleCount).map((project) => {
          return (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              /* PERBAIKAN: Hapus cursor-pointer di sini */
              className="group glass rounded-2xl overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-1">
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-video bg-muted/20">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Optional: Efek gradient tipis saat di-hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.categories.map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary whitespace-nowrap">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-surface text-[11px] font-medium border border-border/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-muted-foreground animate-fade-in">
          No projects found in this category.
        </div>
      )}

      {/* Load More */}
      {visibleCount < filteredProjects.length && (
        <div className="flex justify-center mt-12 animate-fade-in">
          <button onClick={handleLoadMore}>
            <AnimatedBorderButton>
              Load More Projects
              <ChevronDown className="w-5 h-5" />
            </AnimatedBorderButton>
          </button>
        </div>
      )}
    </div>
  );
};
