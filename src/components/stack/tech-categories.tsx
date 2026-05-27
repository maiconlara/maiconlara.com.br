"use client";

import { motion } from "framer-motion";
import { useDictionary } from "@/i18n/dictionary-context";

export const TechCategories = () => {
  const dict = useDictionary();
  const cats = dict.stack.categories;

  const techCategories = [
    {
      title: cats.languages,
      items: ["TypeScript", "JavaScript", "Java", "SQL"],
    },
    {
      title: cats.frontend,
      items: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Framer Motion",
        "RNative",
        "React Query",
      ],
    },
    {
      title: cats.backend,
      items: ["Node.js", "Express", "NestJS", "GraphQL", "REST APIs"],
    },
    {
      title: cats.databases,
      items: ["PostgreSQL", "MongoDB", "Redis", "Prisma"],
    },
    {
      title: cats.devops,
      items: ["Git", "Docker", "Vercel", "AWS", "GitHub Actions", "Jest"],
    },
    {
      title: cats.design,
      items: ["Figma", "Responsive Design", "UI/UX Principles"],
    },
  ];

  return (
    <>
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
        <h3 className="text-xl font-semibold mb-2">
          {dict.stack.alwaysLearning}
        </h3>
        <p className="text-muted-foreground">{dict.stack.alwaysLearningText}</p>
      </motion.div>
    </>
  );
};
