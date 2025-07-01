import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { skills } from "@/lib/portfolio-data";
import { Code, Layers, Bot, Cloud, Database } from "lucide-react";

// this component renders the skills section of the portfolio
export function SkillsSection() {
  // use the intersection observer hook to detect when the section is in view
  const [ref, entry] = useIntersectionObserver({ threshold: 0.3 });
  // state to track if the skill bars have already animated
  const [hasAnimated, setHasAnimated] = useState(false);

  // effect to animate the skill bars when the section comes into view
  useEffect(() => {
    if (entry?.isIntersecting && !hasAnimated) {
      setHasAnimated(true);
      
      // animate skill bars by setting their width to the data-progress value
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

  // define skill categories and their associated icon and skills
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

  // list of additional technologies to display as badges
  const additionalTechnologies = [
    "C", "R", "PHP", "HTML/CSS", "Node.js", "Prophet", "Kubernetes", 
    "Jupyter", "Pandas", "NumPy", "Plotly", "Power BI", "Linux", 
    "Postman", "Google Cloud Console", "Jira", "JUnit", "Hibernate"
  ];

  return (
    // main section for skills with background and padding, and ref for intersection observer
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      {/* container to center content and provide responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* section header with title and description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Technical <span className="text-emerald-600">Expertise</span>
          </h2>
          {/* decorative underline below the title */}
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          {/* short description about the skills section */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit spanning from machine learning frameworks to cloud deployment technologies
          </p>
        </div>
        
        {/* grid of skill category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card key={category.title} className="bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                {/* icon for the skill category */}
                <div className="text-3xl mb-4 text-emerald-600">
                  <category.icon size={32} />
                </div>
                {/* title of the skill category */}
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                {/* list of skills in the category with animated progress bars */}
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
        
        {/* additional technologies section with badges */}
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