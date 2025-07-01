import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

// this component renders the footer section of the portfolio website
export function Footer() {
  // array of navigation items for quick links
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  // function to smoothly scroll to a section when a quick link is clicked
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // main footer element with background and padding
    <footer className="bg-gray-900 text-white py-12">
      {/* container to center content and provide responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* grid layout for three columns: about, quick links, and contact info */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* about section with name, description, and social links */}
          <div>
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Amrish Naranappa</h3>
            <p className="text-gray-400 mb-4">
              AI Developer & Software Engineer passionate about creating innovative solutions 
              through machine learning and full-stack development.
            </p>
            {/* social media icons */}
            <div className="flex space-x-4">
              <a 
                href="https://github.com/asnarana" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Github size={24} />
              </a>
              <a 
                href="https://linkedin.com/in/amrishn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:amrish.naranappa@gmail.com" 
                className="text-gray-400 hover:text-emerald-600 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          {/* quick links section for navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* contact info section with email, phone, and location */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center">
                <Mail className="mr-2 text-emerald-600" size={16} />
                amrish.naranappa@gmail.com
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 text-emerald-600" size={16} />
                (714) 389-4886
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 text-emerald-600" size={16} />
                Raleigh, NC
              </p>
            </div>
          </div>
        </div>
        
        {/* copyright and footer note */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Amrish Naranappa. All rights reserved. Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}