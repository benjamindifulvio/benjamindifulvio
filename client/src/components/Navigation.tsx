import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Gamepad2, User, Mail } from "lucide-react";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  
  // Transform opacity based on scroll to hide/show nav cleanly
  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navY = useTransform(scrollY, [0, 100], [-20, 0]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: Code2, label: "Projects" },
    { id: "game", icon: Gamepad2, label: "Game" },
    { id: "contact", icon: Mail, label: "Contact" },
  ];

  return (
    <motion.nav 
      style={{ opacity: navOpacity, y: navY }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-background/50 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-2xl shadow-black/50"
    >
      <ul className="flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => scrollToSection(item.id)}
              className={`
                flex items-center gap-2 text-sm font-medium transition-colors
                ${activeSection === item.id ? "text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" : "text-muted-foreground hover:text-foreground"}
              `}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
