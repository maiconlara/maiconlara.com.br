import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

export function Header() {
  const location = useLocation();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="container flex items-center justify-between h-16">
        <Link
          to="/"
          className="font-semibold text-lg hover:text-primary transition-colors"
        >
          <img
            src={logo}
            className="inline-block w-auto h-9 rounded-xl"
            alt="Maicon Lara"
          />
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative py-1 text-sm transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}

                <motion.span
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  className="absolute left-0 right-0 -bottom-1 h-[2px] origin-center bg-violet-500 rounded-full"
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
