import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  to: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  colSpan?: number;
  rowSpan?: number;
}

export function AnimatedCard({
  to,
  title,
  description,
  children,
  className,
  delay = 0,
  colSpan = 1,
  rowSpan = 1,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={
        `${colSpan ? `col-span-${colSpan}` : ""}` +
        (rowSpan ? ` row-span-${rowSpan}` : "")
      }
    >
      <Link
        to={to}
        className={cn(
          "group block p-6 rounded-xl bg-card border border-border card-hover overflow-hidden h-full",
          className,
        )}
      >
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        {children}
      </Link>
    </motion.div>
  );
}
