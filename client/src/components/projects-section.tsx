import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/portfolio-data";
import { ExternalLink, Github, CheckCircle } from "lucide-react";

import { blogArticles } from "../lib/blog-data";
import { Link } from "wouter";

// this component renders the projects section of the portfolio
export function ProjectsSection() {
  // state to track the currently active filter for project categories
  const [activeFilter, setActiveFilter] = useState("all");

  // array of filter options for project categories
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai-ml", label: "AI/ML" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "data", label: "Data Analytics" },
  ];

  // filter the projects based on the selected category
  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category.includes(activeFilter)
  );

  return (
    // main section for projects with background and padding
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      {/* container to center content and provide responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* section header with title and description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured <span className="text-emerald-600">Projects</span>
          </h2>
          {/* decorative underline below the title */}
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          {/* short description about the projects section */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my work in AI/ML, full-stack development, and data analytics
          </p>
        </div>
        
        {/* project filter buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeFilter === filter.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>
        
        {/* grid of project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="project-card bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* project video demo or image at the top of the card */}
              {project.video ? (
                <div className="relative">
                  <span className="absolute top-2 left-2 z-10 bg-emerald-600 text-white text-xs font-semibold px-2 py-1 rounded shadow">Demo</span>
                  <video
                    src={project.video}
                    controls
                    className="w-full h-48 object-contain rounded-t bg-black"
                    poster={project.poster || project.image}
                    preload="metadata"
                  />
                </div>
              ) : (
                <img 
                  src={project.poster || project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
              )}
              
              <CardContent className="p-6">
                {/* project title and external links */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
                    {/* link to live project if available */}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {/* link to github repo if available */}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* project description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
                {/* list of technologies used in the project */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech}
                      variant="secondary"
                      className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* list of achievements for the project */}
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                      {achievement}
                    </div>
                  ))}
                </div>

                {/* related articles section, can be enabled if needed */}
                {/* {project.relatedArticles && project.relatedArticles.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Related Articles:</h3>
                    <ul>
                      {project.relatedArticles.map(slug => {
                        const article = blogArticles.find(a => a.slug === slug);
                        if (!article) return null;
                        return (
                          <li key={slug}>
                            <Link to={`/blog/${slug}`} className="text-emerald-600 hover:underline">
                              {article.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )} */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}