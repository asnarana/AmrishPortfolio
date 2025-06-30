import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Amrish Naranappa</h3>
            <p className="text-gray-400 mb-4">
              AI Developer & Software Engineer passionate about creating innovative solutions 
              through machine learning and full-stack development.
            </p>
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
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Amrish Naranappa. All rights reserved. Built with ❤️ and modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  );
}
