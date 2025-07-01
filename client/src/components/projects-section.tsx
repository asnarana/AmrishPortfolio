import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/portfolio-data";
import { ExternalLink, Github, CheckCircle } from "lucide-react";

import { blogArticles } from "../lib/blog-data";
import { Link } from "wouter";



export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai-ml", label: "AI/ML" },
    { id: "fullstack", label: "Full-Stack" },
    { id: "data", label: "Data Analytics" },
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === "all" || project.category.includes(activeFilter)
  );

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured <span className="text-emerald-600">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A showcase of my work in AI/ML, full-stack development, and data analytics
          </p>
        </div>
        
        {/* Project Filter */}
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="project-card bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex space-x-2">
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
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
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
                
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="text-emerald-600 mr-2 flex-shrink-0" size={16} />
                      {achievement}
                    </div>
                  ))}
                </div>

                {project.relatedArticles && project.relatedArticles.length > 0 && (
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
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
