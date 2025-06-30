import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { skills } from "@/lib/portfolio-data";
import { Code, Layers, Bot, Cloud, Database } from "lucide-react";

export function SkillsSection() {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (entry?.isIntersecting && !hasAnimated) {
      setHasAnimated(true);
      
      // Animate skill bars
      setTimeout(() => {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach((bar) => {
          const progress = bar.getAttribute('data-progress');
          if (progress) {
            (bar as HTMLElement).style.width = progress + '%';
          }
        });
      }, 200);
    }
  }, [entry?.isIntersecting, hasAnimated]);

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: skills.filter(skill => skill.category === 'languages'),
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: skills.filter(skill => skill.category === 'frameworks'),
    },
    {
      title: "AI/ML",
      icon: Bot,
      skills: skills.filter(skill => skill.category === 'ai-ml'),
    },
    {
      title: "Databases",
      icon: Database,
      skills: skills.filter(skill => skill.category === 'databases'),
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: skills.filter(skill => skill.category === 'cloud-devops'),
    },
  ];

  const additionalTechnologies = [
    "C", "R", "PHP", "HTML/CSS", "Node.js", "Prophet", "Kubernetes", 
    "Jupyter", "Pandas", "NumPy", "Plotly", "Power BI", "Linux", 
    "Postman", "Google Cloud Console", "Jira", "JUnit", "Hibernate"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Technical <span className="text-emerald-600">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning from machine learning frameworks to cloud deployment technologies
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <div className="text-3xl mb-4 text-emerald-600">
                  <category.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 dark:text-gray-400">{skill.name}</span>
                        <span className="text-emerald-600 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress" 
                          data-progress={skill.level}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalTechnologies.map((tech) => (
              <Badge 
                key={tech}
                variant="secondary" 
                className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
