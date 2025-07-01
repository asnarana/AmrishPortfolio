import { useEffect, useState } from "react";
// import navigation bar component
import { Navigation } from "@/components/navigation";
// import hero section component
import { HeroSection } from "@/components/hero-section";
// import about section component
import { AboutSection } from "@/components/about-section";
// import skills section component
import { SkillsSection } from "@/components/skills-section";
// import projects section component
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react"; // custom cursor and UI button 

// main home page component
export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false); // state to show/hide scroll to top button

  // useEffect to handle scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    // cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // func to scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="custom-cursor">
            {/* Custom animated cursor */}
      <CustomCursor />
      {/* Navigation bar */}
       <Navigation /> 
      {/* Hero section */}
      <HeroSection />
      {/* About section */}
      <AboutSection />
      {/* Skills section */}
      <SkillsSection />
      {/* Projects section */}
      <ProjectsSection />
      {/* Experience section */}
      <ExperienceSection />
      {/* Contact section */}
      <ContactSection />
      {/* Footer */}
      <Footer />
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          size="icon"
        >
          <ChevronUp size={24} />
        </Button>
      )}
    </div>
  );
}
