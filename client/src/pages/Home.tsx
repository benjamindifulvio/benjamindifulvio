import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowDown, Github, Linkedin, Mail, Send, Terminal, Code2, Globe, Cpu } from "lucide-react";
import { ScrollBackground } from "@/components/ScrollBackground";
import { Navigation } from "@/components/Navigation";
import { TowerDefenseGame } from "@/components/TowerDefenseGame";
import { useCreateMessage } from "@/hooks/use-messages";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// SECTION: Hero
function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-mono font-medium">
          IS-A.DEV PORTFOLIO
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight">
          Benjamin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Di Fulvio</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
          Creating digital experiences through code, art, and automation.
        </p>
      </motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-muted-foreground w-6 h-6" />
      </motion.div>
    </section>
  );
}

// SECTION: About
function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const stats = [
    { label: "Age", value: "19" },
    { label: "Location", value: "USA" },
    { label: "Ethnicity", value: "Brazil" },
  ];

  const languages = ["English", "Spanish", "Brazilian-Portuguese"];
  const code = ["HTML/CSS/JS", "Python", "AHK 1.1"];

  return (
    <section id="about" className="py-32 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            I'm a passionate developer exploring the intersection of automation and creativity. 
            Currently diving deep into macro creation and weighing the nuances between Python and AHK automation workflows.
            When I'm not coding, you can find me on the soccer field or creating art.
          </p>
          
          <div className="flex gap-4">
             <Button variant="outline" className="gap-2 h-12 px-6 rounded-xl border-white/10 hover:border-primary/50 hover:text-primary">
               <Github className="w-5 h-5" /> GitHub
             </Button>
             <Button variant="outline" className="gap-2 h-12 px-6 rounded-xl border-white/10 hover:border-secondary/50 hover:text-secondary">
               <Linkedin className="w-5 h-5" /> LinkedIn
             </Button>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-secondary" /> Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map(lang => (
                  <span key={lang} className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                    {lang}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-accent" /> Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {code.map(c => (
                  <span key={c} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="text-2xl font-bold font-mono text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// SECTION: Projects
function ProjectsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const projects = [
    {
      title: "Macro Automation Suite",
      description: "Advanced automation scripts comparing efficiency between Python libraries and AutoHotkey v1.1.",
      tags: ["Python", "AHK", "Automation"],
      icon: Cpu,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Affiliate Extension",
      description: "An extension that I'm developing to give to my friends and family that generates a small amount of money from affiliate links, provided through Amazon Affiliates, CJ, and Impact.",
      tags: ["Extensions", "JSON", "JavaScript"],
      icon: Code2,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="projects" className="py-32 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Current Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="group relative bg-card rounded-3xl p-8 border border-white/10 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${project.color}`} />
              
              <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 text-white group-hover:bg-white/10 transition-colors">
                <project.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-muted-foreground mb-8 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// SECTION: Game
function GameSection() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="game" className="py-32 px-4 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
          Core Defense Protocol
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Scroll down to initiate the defense sequence. Protect the core from incoming geometric anomalies.
        </p>
        
        <div className="w-full">
          <TowerDefenseGame />
        </div>
      </motion.div>
    </section>
  );
}

// SECTION: Contact
function ContactSection() {
  const { mutate, isPending } = useCreateMessage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form, {
      onSuccess: () => setForm({ name: "", email: "", message: "" })
    });
  };

  return (
    <section id="contact" className="py-32 px-4 max-w-3xl mx-auto">
      <div className="bg-card/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
        <h2 className="text-3xl font-display font-bold mb-2">Get in Touch</h2>
        <p className="text-muted-foreground mb-8">Have a project in mind or want to talk about automation? email benjamintdifulvio@proton.me</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <ScrollBackground />
      <Navigation />
      
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <GameSection />
        <ContactSection />
        
        <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5">
          <p>© {new Date().getFullYear()} Benjamin Di Fulvio. Built with React, Tailwind, and Motion.</p>
        </footer>
      </main>
    </div>
  );
}
