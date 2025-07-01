import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/portfolio-data";

// this component renders the professional experience section of the portfolio
export function ExperienceSection() {
  return (
    // main section with id for navigation and padding for spacing
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      {/* container to center content and provide responsive padding */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* section header with title and description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Professional <span className="text-emerald-600">Experience</span>
          </h2>
          {/* decorative underline below the title */}
          <div className="w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
          {/* short description about the experience section */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            my journey through ai development, software engineering, and machine learning research
          </p>
        </div>
        
        {/* timeline container */}
        <div className="relative">
          {/* vertical line representing the timeline */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-emerald-600"></div>
          
          {/* list of experience items */}
          <div className="space-y-12">
            {/* map over the experiences array to render each experience */}
            {experiences.map((experience, index) => (
              // each experience is a flex container for alignment
              <div key={experience.id} className="relative flex items-center">
                {/* circular marker for each timeline event */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-emerald-600 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>
                
                {/* experience card, alternates left/right on large screens */}
                <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8 md:ml-auto'}`}>
                  <Card className="bg-white dark:bg-gray-900 shadow-lg">
                    <CardContent className="p-6">
                      {/* job title and duration at the top of the card */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {experience.title}
                        </h3>
                        <span className="text-emerald-600 font-semibold">
                          {experience.duration}
                        </span>
                      </div>
                      
                      {/* company name */}
                      <h4 className="text-lg font-semibold text-emerald-600 mb-3">
                        {experience.company}
                      </h4>
                      {/* location of the job */}
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {experience.location}
                      </p>
                      
                      {/* list of responsibilities or achievements */}
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400 mb-4">
                        {experience.description.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            {/* small dot as a bullet point */}
                            <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      {/* list of technologies used, each as a badge */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge 
                            key={tech}
                            variant="secondary"
                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full text-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}