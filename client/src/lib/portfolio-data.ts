//  the Skill interface for representing a skill with a name, level, and category
export interface Skill {
  name: string;
  level: number;
  category: 'languages' | 'frameworks' | 'ai-ml' | 'cloud-devops' | 'databases';
}

//  the Project interface for representing a project and its properties
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string; // URL to the project's image
  technologies: string[]; // List of technologies used
  category: string[]; // Categories for filtering (e.g., ai-ml, fullstack)
  achievements: string[]; // Key achievements for the project
  liveUrl?: string; // Optional: link to the live project
  githubUrl?: string; // Optional: link to the GitHub repo
  relatedArticles?: string[]; // Optional: slugs of related blog articles
  video?: string; // Optional: path to the project's demo video
  poster?: string; // Optional: custom poster image for the video
}

//  the Experience interface for representing a work or research experience
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string[]; // List of bullet points describing the experience
  technologies: string[]; // Technologies used in this experience
}

export const skills: Skill[] = [
  // Languages
  { name: "Java", level: 95, category: "languages" },
  { name: "SQL", level: 88, category: "languages" },
  { name: "Python", level: 85, category: "languages" },
  { name: "JavaScript", level: 85, category: "languages" },

  // Frameworks
  { name: "React", level: 87, category: "frameworks" },
  { name: "SpringBoot", level: 85, category: "frameworks" },
  { name: "Dash", level: 82, category: "frameworks" },
  { name: "Flask", level: 80, category: "frameworks" },

  // AI/ML
  { name: "Whisper", level: 90, category: "ai-ml" },
  { name: "PyTorch", level: 85, category: "ai-ml" },
  { name: "Vosk", level: 82, category: "ai-ml" },
  { name: "Transformers", level: 80, category: "ai-ml" },

  // Cloud & DevOps
  { name: "Git", level: 85, category: "cloud-devops" },
  { name: "AWS", level: 82, category: "cloud-devops" },
  { name: "Docker", level: 80, category: "cloud-devops" },
  { name: "Jenkins", level: 70, category: "cloud-devops" },

  // Databases
  { name: "MySQL", level: 85, category: "databases" },
  { name: "PostgreSQL", level: 80, category: "databases" },
  { name: "MongoDB", level: 75, category: "databases" },
  { name: "PlanetScale", level: 70, category: "databases" },
];


//list of projects each with details like id, title, description, image, technologies, category, achievements, githubUrl, and relatedArticles
export const projects: Project[] = [
  {
    id: "ecoli-analytics",
    title: "E. coli Fermentation Analytics",
    description: "Built a comprehensive analytics platform for 300L E. coli batch fermentation, featuring Plotly Dash visualizations, Power BI integration, and Prophet forecasting models deployed on AWS infrastructure.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Dash", "Prophet", "AWS", "Docker", "PostgreSQL"],
    category: ["ai-ml", "data"],
    achievements: [
      "Forecasted key metrics for 21 fermentation batches",
      "Deployed using ECR, EC2, and RDS PostgreSQL",
      "Built ETL pipelines with pandas and SQLAlchemy"
    ],
    githubUrl: "https://github.com/asnarana/fermentation",
    relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"],
    video: import.meta.env.BASE_URL + 'btechdemomp4.mp4',
    poster: import.meta.env.BASE_URL + 'fermss.jpg'
  },
  {
    id: "wolf-cafe",
    title: "Wolf Cafe System",
    description: "Developed a comprehensive cafe management system with React frontend and Spring Boot backend, featuring JWT authentication, role-based access control, and automated CI/CD pipelines.",
    image: import.meta.env.BASE_URL + 'cafess.png',
    technologies: ["Java", "React", "SpringBoot", "MySQL", "JWT"],
    category: ["fullstack"],
    achievements: [
      "JWT-based role authentication system",
      "RESTful APIs for CRUD operations",
      "CI/CD pipelines with Github and Jenkins"
    ],
    relatedArticles: [ "choosing-typescript", "deploying-on-vercel"]
  },
  {
    id: "asr-models",
    title: "ASR Models Benchmarking",
    description: "Led development of 4 ASR models (Whisper, Vosk, Wav2Vec2, Google STT) achieving 95% transcription accuracy with 36% WER reduction. Fine-tuned Whisper for low-resource Sourashtra dialect support.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Whisper", "Transformers", "PyTorch", "Vosk"],
    category: ["ai-ml"],
    achievements: [
      "95% transcription accuracy achieved",
      "Tamil/Hindi language support added",
      "Fine-tuned for Sourashtra dialect"
    ],
    githubUrl: "https://github.com/asnarana/ASRModels",
    relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"],
    poster: import.meta.env.BASE_URL + 'asrss.png'
  },
  {
    id: "student-careers",
    title: "Student Careers Dashboard",
    description: "Built a secure web application for NCSU student job positions with Flask backend, featuring AJAX validation, reCAPTCHA integration, and encrypted database connections via SSH tunneling.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Flask", "SQLAlchemy", "PlanetScale", "SSH"],
    category: ["fullstack", "data"],
    achievements: [
      "Secure SSL connections with SSH tunneling",
      "Email integration with Flask-Mail",
      "AJAX validation with reCAPTCHA"
    ],
    githubUrl: "https://github.com/asnarana/Careers-Website",
    relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"],
    video: import.meta.env.BASE_URL + 'careersdashboarddemo.mp4',
    poster: import.meta.env.BASE_URL + 'careersss.jpg'
  },
  {
    id: "speech-recognition-ai",
    title: "Speech Recognition AI",
    description: "Built a simple AI leveraging Google's Speech-to-Text API and pyttsx3 library for accurate microphone-based voice recognition, featuring command parsing algorithms and Wolfram Alpha integration.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["Python", "Google Speech-to-Text API", "Wolfram Alpha API", "pyttsx3"],
    category: ["ai-ml"],
    achievements: [
      "Accurate microphone-based voice recognition",
      "Command parsing for voice commands and web searches",
      "XML/JSON response processing with Wolfram Alpha API"
    ],
    githubUrl: "https://github.com/asnarana/Python-AI",
    relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"],
    video: import.meta.env.BASE_URL + 'pythonai.mp4',
    poster: import.meta.env.BASE_URL + 'aiss.jpg'
  },
  // {
  //   id: "mars-reporting",
  //   title: "MARS Reporting System",
  //   description: "Enhanced Medullus Advanced Reporting System with PHP/MySQL backend, featuring interactive DataTables, real-time project tracking for 200+ projects, and live status notifications.",
  //   image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
  //   technologies: ["PHP", "MySQL", "jQuery", "CodeIgniter", "AJAX"],
  //   category: ["fullstack", "data"],
  //   achievements: [
  //     "Real-time tracking of 200+ projects",
  //     "Interactive DataTables with inline editing",
  //     "Live toast notifications system"
  //   ],
  //  // githubUrl: "https://github.com/asnarana",
  //   relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"]
  // },
  {
    id: "sensor-fusion",
    title: "Sensor Fusion Research",
    description: "Implemented advanced sensor fusion algorithms combining Tobii gaze tracking and Kinect motion data, achieving 30% reduction in positional errors using Kalman filters and machine learning models.",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: ["R", "Kalman Filters", "Tobii API", "Random Forest", "Neural Networks"],
    category: ["ai-ml"],
    achievements: [
      "Real-time gaze and motion tracking",
      "30% reduction in positional errors",
      "3D prediction models implemented"
    ],
    githubUrl: "https://github.com/asnarana/sensor-fusion-algos",
    relatedArticles: ["why-i-love-react", "choosing-typescript", "deploying-on-vercel"],
    poster: import.meta.env.BASE_URL + 'sensorss.png'
   // video: "/blogs.mp4"
  },
  {
    id: "article-editor",
    title: "Article Editor",
    description: "A full-stack CMS that lets users write, edit, and manage markdown-formatted articles. Built with Node.js, Express.js, MongoDB (via Mongoose), and EJS templates, featuring auto-generated URL slugs, timestamps, and a responsive Bootstrap UI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "Marked.js",
      "Slugify"
      
    ],
    category: ["fullstack", "content-management"],
    achievements: [
      "CRUD interface with markdown support",
      "Automatic URL-friendly slug generation",
      "Responsive UI built with Bootstrap"
    ],
    githubUrl: "https://github.com/asnarana/Article-Editor",
    relatedArticles: [
      "why-i-love-react",
      "choosing-typescript",
      "deploying-on-vercel"
    ],
    video: import.meta.env.BASE_URL + 'blogs.mp4',
    poster: import.meta.env.BASE_URL + 'blogss.jpg'
  },
];
// list of experiences each with details like id, title, company, location, duration, description, and technologies
export const experiences: Experience[] = [
  {
    id: "sourashtra-ai",
    title: "AI Developer",
    company: "Sourashtra Association Inc.",
    location: "Raleigh, North Carolina",
    duration: "June 2025 - Present",
    description: [
      "Led team to prototype 4 ASR models achieving 95% transcription accuracy with 36% WER reduction",
      "Built comprehensive benchmarking framework demonstrating Whisper's superior performance",
      "Curated Tamil datasets from Mozilla Common Voice for model training and evaluation",
      "Fine-tuned Whisper for low-resource Sourashtra dialect using BPE tokens and Trainer pipelines"
    ],
    technologies: ["Python", "Whisper", "Transformers", "Vosk", "Wav2Vec2"]
  },
  {
    id: "medullus-intern",
    title: "Software Engineer Intern",
    company: "Medullus Systems",
    location: "Durham, North Carolina",
    duration: "June 2024 - Sep 2024",
    description: [
      "Built PHP reporting system tracking 200+ active projects with real-time metrics",
      "Enhanced MARS system with jQuery DataTables featuring inline editing and DOM updates",
      "Created AJAX endpoints for dynamic project status toggling and live notifications",
      "Implemented comprehensive validation with client-side checks and server-side uniqueness verification"
    ],
    technologies: ["PHP", "MySQL", "jQuery", "CodeIgniter", "AJAX"]
  },
  {
    id: "visual-lab-intern",
    title: "Machine Learning Intern",
    company: "Visual Experience Lab",
    location: "Raleigh, North Carolina",
    duration: "Jan 2024 - Aug 2024",
    description: [
      "Integrated Tobii.Interaction API for real-time motion and gaze tracking data retrieval",
      "Implemented sensor fusion algorithms using Kalman filters and neural networks in R",
      "Achieved 30% reduction in positional errors through advanced ML models",
      "Developed 3D prediction models combining multiple sensor inputs"
    ],
    technologies: ["R", "Tobii API", "Kalman Filters", "Random Forest", "Neural Networks"]
  },
];
