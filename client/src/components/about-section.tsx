import { Card, CardContent } from "@/components/ui/card";
import { Bot, Cloud, Code, TrendingUp } from "lucide-react";
// this is the about section on the homepage 
export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="text-emerald-600">Me</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              AI Developer & Full-Stack Engineer
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              I'm a passionate Computer Science student at North Carolina State University with a concentration in 
              Artificial Intelligence and a minor in Statistics. My journey in technology is driven by a deep fascination 
              with machine learning, data analytics, and creating intelligent systems that solve real-world problems.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              With experience spanning from building ASR models and fine-tuning Whisper transformers to developing 
              full-stack web applications, I bridge the gap between cutting-edge AI research and practical software solutions. 
              My work has involved everything from sensor fusion algorithms to scalable cloud deployments on AWS.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">3.81</div>
                <div className="text-gray-600 dark:text-gray-400">GPA</div>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10+</div>
                <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">36%</div>
                <div className="text-gray-600 dark:text-gray-400">WER Reduction vs. Baseline</div>
              </div>
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-3xl font-bold text-emerald-600 mb-2">21</div>
                <div className="text-gray-600 dark:text-gray-400">NCSU BTEC Batches Analyzed</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Modern software development workspace" 
              className="rounded-xl shadow-2xl w-full object-cover"
            />
            
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h4>
                <div className="space-y-2">
                  <div className="font-medium text-emerald-600">North Carolina State University</div>
                  <div className="text-gray-600 dark:text-gray-400">Bachelor of Science in Computer Science</div>
                  <div className="text-gray-600 dark:text-gray-400">AI Concentration • Statistics Minor</div>
                  <div className="text-gray-600 dark:text-gray-400"> GPA: 3.81/4.0</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 dark:bg-gray-800">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Current Focus</h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <Bot className="text-emerald-600 mr-3" size={20} />
                    AI/ML Model Development
                  </li>
                  <li className="flex items-center">
                    <Cloud className="text-emerald-600 mr-3" size={20} />
                    Cloud Architecture & DevOps
                  </li>
                  <li className="flex items-center">
                    <Code className="text-emerald-600 mr-3" size={20} />
                    Full-Stack Development
                  </li>
                  <li className="flex items-center">
                    <TrendingUp className="text-emerald-600 mr-3" size={20} />
                    Data Analytics & Visualization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
