import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { ArrowLeft, ArrowUpRight, Github, Figma, Code2 } from "lucide-react";

export const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((p) => String(p.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-primary hover:underline">
            Go back to projects
          </button>
        </div>
      </div>
    );

  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* KIRI: Sticky Sidebar */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8 animate-fade-in">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back</span>
          </button>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary">
                  {cat}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-col gap-3 mb-8">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <ArrowUpRight size={18} /> Visit Live Site
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-xl font-medium hover:bg-surface transition-all">
                  <Github size={18} /> Source Code
                </a>
              )}
            </div>
          </div>

          {/* Tech Stack Tanpa Hover */}
          <div className="p-6 rounded-2xl glass border border-border/50 bg-surface/20">
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background text-sm font-medium border border-border/50 text-foreground shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: Scrollable Content */}
        <div className="lg:col-span-8 space-y-12 animate-fade-in animation-delay-100">
          <div className="w-full aspect-video rounded-3xl overflow-hidden bg-muted/20 border border-border/30 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">About The Project</h2>
            <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap">
              {project.fullDescription || project.description}
            </p>
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Gallery & Previews</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    // PERUBAHAN: Menambahkan class 'relative' agar label bisa diposisikan absolute di dalam kotak ini
                    className="relative rounded-2xl overflow-hidden bg-muted/20 aspect-video group border border-border/30">
                    <img
                      // PERUBAHAN: Mengakomodasi jika img berbentuk string (URL) atau object {url: "", label: ""}
                      src={typeof img === "string" ? img : img.url}
                      alt={`${project.title} gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* PERUBAHAN: Label Overlay yang muncul saat di-hover */}
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 translate-y-2">
                      <p className="text-white text-sm font-medium">
                        {/* Jika img berupa object, ambil labelnya. Jika string, pakai default "Preview 1, Preview 2, dst" */}
                        {typeof img === "object" && img.label
                          ? img.label
                          : `Preview ${idx + 1}`}
                      </p>
                    </div>

                    {/* OPSI ALTERNATIF: Label Statis (Hapus komen di bawah dan hapus div di atas jika ingin label selalu terlihat) */}

                    <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
                      <span className="text-xs font-semibold text-foreground">
                        {typeof img === "object" && img.label
                          ? img.label
                          : `Preview ${idx + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
