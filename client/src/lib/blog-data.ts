// this is the data for the blog articles
// it is an array of objects
// each object has a slug, title, date, content, tags, and related projects
// the slug is the url slug for the article
// the title is the title of the article
// the date is the date of the article
// the content is the content of the article
// the tags are the tags for the article
// the related projects are the projects related to the article
export const blogArticles = [
  {
    slug: "why-i-love-react",
    title: "Why I Love React",
    date: "2024-07-01",
    content: `React's component model and hooks make building UIs a joy. I use React in most of my projects, including My Cool Project and Portfolio Site.`,
    tags: ["react", "frontend"],
    relatedProjects: [1, 2],
  },
  {
    slug: "choosing-typescript",
    title: "Why I Chose TypeScript for My Portfolio",
    date: "2024-07-02",
    content: `TypeScript's type safety and tooling help me catch bugs early and write more maintainable code. All my recent projects use TypeScript.`,
    tags: ["typescript", "best-practices"],
    relatedProjects: [1, 3],
  },
  {
    slug: "deploying-on-vercel",
    title: "Deploying on AWS: My Experience",
    date: "2024-07-03",
    content: `AWS's seamless integration with frontend frameworks and GitHub makes deployment effortless. My Portfolio Site is hosted on Vercel.`,
    tags: ["vercel", "deployment"],
    relatedProjects: [2],
  },
]; 