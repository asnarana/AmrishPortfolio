import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "wouter";

// this component renders the top navigation bar for the portfolio site
export function Navigation() {
  // get the current theme and the function to change it from the theme provider
  const { theme, setTheme } = useTheme();
  // state to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // array of navigation items for scrolling to sections
  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  // function to smoothly scroll to a section and close the mobile menu
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    // main nav element, fixed to the top, with background blur and border
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
      {/* container for nav content, centered and responsive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* flex container for logo, nav links, and controls */}
        <div className="flex justify-between items-center h-16">
          {/* logo or site initials */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-emerald-600">AN</h1>
          </div>
          
          {/* desktop navigation links, hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-link text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {/* blog link can be enabled if needed */}
              <Link to="/blog" className="nav-link text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors">Blogs</Link>
            </div>
          </div>
          
          {/* theme toggle and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* button to toggle between light and dark theme */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            
            {/* button to open or close the mobile menu, only visible on mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* mobile menu, only shown when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 w-full text-left"
              >
                {item.label}
              </button>
            ))}
            {/* blog link for mobile menu */}
            <Link to="/blog" className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 w-full text-left">Blog</Link>
          </div>
        </div>
      )}
    </nav>
  );
}