import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import Cursor from "@/components/Cursor";
import ScrollToAnchor from "@/components/ScrollToAnchor";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages/Home";
import { AllProjects } from "@/pages/AllProjects";
import { ProjectDetail } from "@/pages/ProjectDetail";

const ScrollToTop = () => {
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToAnchor />
      <div className="min-h-screen overflow-x-hidden bg-background text-foreground relative selection:bg-primary/30 selection:text-primary">
        <Cursor />
        <Navbar />
        <ThemeToggle />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
