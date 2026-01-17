import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import { RiArrowLeftLine } from "@remixicon/react";

const techCategories = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "React Query",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "NestJS", "GraphQL", "REST APIs"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "Docker", "Vercel", "AWS", "GitHub Actions", "Jest"],
  },
  {
    title: "Design",
    items: ["Figma", "Adobe XD", "Responsive Design", "UI/UX Principles"],
  },
];

export default function Stack() {
  usePageTitle("Languages & Tools");
  return (
    <div className="container pb-16 md:pb-24 pt-10">
      <div className="mb-12">
        <Link
          to="/about"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <RiArrowLeftLine className="w-4 h-4" />
          Back to About
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Languages & Tools
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          The technologies I use daily to build modern, scalable, and performant
          web applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
            className="p-6 rounded-xl bg-card border border-border card-hover"
          >
            <h3 className="font-semibold text-primary mb-4">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((item, itemIndex) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                  className="px-3 py-1.5 rounded-md bg-secondary text-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 p-8 rounded-xl bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Always Learning</h3>
        <p className="text-muted-foreground">
          The tech landscape is always evolving, and so am I. I'm constantly
          exploring new technologies and best practices to deliver better
          solutions.
        </p>
      </motion.div>
    </div>
  );
}
