import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Github, Linkedin, Mail, Phone } from "lucide-react";

// this component renders the hero section at the top of the portfolio
export function HeroSection() {
  // state for the currently typed text in the animated role display
  const [typedText, setTypedText] = useState("");
  // state for the index of the current role being displayed
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  // state to determine if the animation is deleting text
  const [isDeleting, setIsDeleting] = useState(false);

  // array of roles to cycle through in the typing animation
  const roles = [
    "Aspiring Software Engineer",
    "Data Curious",
    "Full-Stack Learner",
  ];

  // effect to handle the typing and deleting animation for the roles
  useEffect(() => {
    // typing speed is faster when deleting
    const typeSpeed = isDeleting ? 50 : 100;
    // get the current role string
    const currentRole = roles[currentRoleIndex];

    // set a timeout to update the typed text
    const timeout = setTimeout(() => {
      if (isDeleting) {
        // remove one character if deleting
        setTypedText(currentRole.substring(0, typedText.length - 1));
      } else {
        // add one character if typing
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }

      // if finished typing, wait then start deleting
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      // if finished deleting, move to the next role and start typing
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    // cleanup the timeout on effect re-run
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentRoleIndex]);

  // function to smoothly scroll to a section by id
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // main hero section with background gradient and centering
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* background pattern with blurred colored circles */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute -bottom-8 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* main content container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* profile image with animation */}
        <div className="mb-8 animate-fade-in">
          <img 
            src= "amrishphoto.jpeg" 
            alt="amrish naranappa - professional headshot" 
            className="w-60 h-60 rounded-full mx-auto object-cover border-4 border-emerald-600 shadow-2xl animate-glow"
          />
        </div>
        
        {/* main heading with name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
          <span className="text-gray-900 dark:text-white">Hi, I'm </span>
          <span className="text-emerald-600">Amrish</span>
        </h1>
        
        {/* animated typing effect for roles */}
        <div className="text-2xl md:text-4xl font-light mb-8 text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <span className="typing-animation">{typedText}</span>
        </div>
        
        {/* short description about the person */}
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        I’m a 4th year Computer Science student at North Carolina State University with a focus on AI. I’ve spent a lot of time building with AI tools, working on software projects, and playing around with modern tech—whether that’s web development, cloud stuff, or anything else that seems interesting. I’m always up for learning something new and figuring out how to actually make things work in the real world.
        </p>
        
        {/* call-to-action buttons for projects and contact */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: "0.6s" }}>
          <Button 
            onClick={() => scrollToSection("projects")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            View My Work
          </Button>
          <Button 
            variant="outline"
            onClick={() => scrollToSection("contact")}
            className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Get in Touch
          </Button>
        </div>
        
        {/* social and contact icons */}
        <div className="flex justify-center space-x-6 mt-12 animate-slide-up" style={{ animationDelay: "0.8s" }}>
          <a href="https://github.com/asnarana" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors text-2xl">
            <Github size={28} />
          </a>
          <a href="https://linkedin.com/in/amrishn" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors text-2xl">
            <Linkedin size={28} />
          </a>
          <a href="mailto:amrish.naranappa@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors text-2xl">
            <Mail size={28} />
          </a>
          <a href="tel:714-389-4886" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors text-2xl">
            <Phone size={28} />
          </a>
        </div>
      </div>
      
      {/* animated chevron down icon to indicate scrolling */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-emerald-600 text-2xl" size={32} />
      </div>
    </section>
  );
}