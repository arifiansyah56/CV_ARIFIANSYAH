import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Building2,
  Briefcase,
  GraduationCap,
  Award,
  Menu,
  X,
  ChevronRight,
  HardHat,
  Ruler,
  Target,
  AlertTriangle,
  Sun,
  Moon,
  Copy,
  Check,
  Send
} from 'lucide-react';
import {
  experienceData,
  skillsData,
  educationData,
  certificationsData,
  leadershipData,
  projectsData,
} from './data';

// --- Fade In Component ---
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Navbar ---
const Navbar = ({ theme, toggleTheme }: { theme: 'light' | 'dark', toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <span className="text-orange-500">MA.</span>
          <span className="hidden sm:inline-block text-slate-600 dark:text-slate-300 font-medium text-lg border-l border-slate-300 dark:border-slate-700 pl-2 ml-2 transition-colors">Civil Engineer</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2 transition-colors">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-medium transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle & Theme */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="text-slate-900 dark:text-slate-300 hover:text-orange-500 dark:hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 mt-4 shadow-xl"
        >
          <ul className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-white font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-md font-medium transition-colors w-full mt-2"
                onClick={() => setIsOpen(false)}
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      {/* Background abstract shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-slate-100 dark:bg-slate-800/50 blur-[120px] transition-colors" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100 dark:bg-orange-900/20 blur-[100px] transition-colors" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-orange-600 dark:text-orange-400 text-sm font-medium mb-6 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Available for New Opportunities
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 tracking-tight transition-colors">
              Halo, Saya <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600">Muhammad Arifiansyah</span>
            </h1>
            <h2 className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-medium mb-6 transition-colors">
              Professional Civil Engineer | Project Control & Structural Design Expert
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10 max-w-xl transition-colors">
              Insinyur Sipil berpengalaman 5+ tahun dalam manajemen konstruksi, progress control, quality control, dan pemodelan BIM untuk proyek infrastruktur & residensial.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#experience"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-md font-semibold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                Lihat Pengalaman
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-white px-8 py-3.5 rounded-md font-semibold transition-all flex items-center gap-2"
              >
                Hubungi Saya
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          {/* Stylized graphic representing construction/engineering */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl rotate-6 opacity-50 blur-sm transition-colors"></div>
            <div className="absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-8 flex flex-col justify-between overflow-hidden transition-colors">
              <div className="absolute -right-12 -top-12 text-slate-100 dark:text-slate-700/30 transition-colors">
                <HardHat className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 border border-orange-100 dark:border-orange-500/20 transition-colors">
                  <Ruler className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">Building the Future</h3>
                <p className="text-slate-500 dark:text-slate-400 transition-colors">Precision, Structural Integrity, and Efficient Project Management.</p>
              </div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4 mt-8">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50 transition-colors">
                  <div className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-1">5+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Years Experience</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700/50 transition-colors">
                  <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">100%</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Quality Delivery</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Summary Section ---
const Summary = () => {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4 transition-colors">Tentang Saya</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Profesional teknik sipil yang berdedikasi tinggi dengan keahlian mendalam di berbagai fase konstruksi, dari perencanaan struktural hingga pengawasan lapangan.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 h-full">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6 transition-colors">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Manajemen Konstruksi</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Ahli dalam scheduling menggunakan Microsoft Project & Primavera, memastikan proyek selesai tepat waktu dan sesuai anggaran dengan kualitas tinggi.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 h-full">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6 transition-colors">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Analisis Struktural</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Berpengalaman merancang dan menganalisis struktur hingga 5 lantai menggunakan perangkat lunak industri standar seperti SAP2000 dan ETABS.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all duration-300 h-full">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl flex items-center justify-center mb-6 transition-colors">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors">Pemodelan BIM</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                Penerapan metodologi Building Information Modeling (BIM) menggunakan Revit dan AutoCAD untuk koordinasi desain dan clash detection yang akurat.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} className="mt-16 flex flex-wrap justify-center gap-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium shadow-sm transition-colors">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> 5+ Tahun Pengalaman
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium shadow-sm transition-colors">
            <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500" /> D4 Teknik Sipil ITS
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium shadow-sm transition-colors">
            <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" /> Bilingual (ID/EN)
          </span>
        </FadeIn>
      </div>
    </section>
  );
};

// --- Experience Section ---
const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4 flex items-center gap-3 transition-colors">
              <Briefcase className="w-8 h-8 text-orange-500" /> Pengalaman Kerja
            </h2>
            <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
          </div>
        </FadeIn>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 sm:ml-6 pb-4 transition-colors">
          {experienceData.map((exp, index) => (
            <FadeIn key={exp.id} delay={index * 0.1}>
              <div className="mb-12 relative pl-8 sm:pl-12">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-orange-500 rounded-full transition-colors"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors">{exp.role}</h3>
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit transition-colors">
                    {exp.period}
                  </span>
                </div>
                <div className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3 transition-colors">{exp.company}</div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">{exp.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Projects Section ---
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4 flex items-center justify-center gap-3 transition-colors">
              <Building2 className="w-8 h-8 text-orange-500" /> Portofolio Proyek
            </h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
              Koleksi proyek nyata yang menunjukkan penerapan keahlian manajemen konstruksi, desain struktural, dan implementasi BIM.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <div 
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 h-full flex flex-col group cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-300" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{project.title}</h3>
                  <div className="text-orange-600 dark:text-orange-500 font-medium text-sm mb-4 transition-colors">{project.role}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1 transition-colors">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4 transition-colors">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2 uppercase tracking-wider transition-colors">Perangkat Lunak</div>
                    <div className="flex flex-wrap gap-2">
                      {project.software.map((sw) => (
                        <span key={sw} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 transition-colors">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 sm:py-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-900/80 dark:bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col z-10 transition-colors"
              >
                {/* Header Image */}
                <div className="relative h-64 sm:h-80 shrink-0">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-colors z-20 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md mb-3 inline-block">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <div className="text-orange-300 font-medium">{selectedProject.role}</div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8 overflow-y-auto">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 transition-colors">
                          <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          Ruang Lingkup Proyek (Scope)
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                          {selectedProject.fullScope}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 transition-colors">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          Tantangan & Solusi
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
                          {selectedProject.challenges}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 transition-colors">Galeri Proyek</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {selectedProject.gallery.map((img, i) => (
                            <img key={i} src={img} alt={`Gallery ${i+1}`} className="w-full h-24 sm:h-32 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-700/50 transition-colors">
                        <div className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-3 uppercase tracking-wider transition-colors">Perangkat Lunak</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.software.map((sw) => (
                            <span key={sw} className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                              {sw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-500/10 p-5 rounded-xl border border-orange-100 dark:border-orange-500/20 text-center transition-colors">
                        <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-2 transition-colors">Ingin berkolaborasi?</h4>
                        <p className="text-orange-600 dark:text-orange-300 text-sm mb-4 transition-colors">Saya siap membantu proyek Anda selanjutnya.</p>
                        <a href="#contact" onClick={() => setSelectedProject(null)} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg w-full transition-colors cursor-pointer">
                          Hubungi Saya
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// --- Skills Section ---
const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4 transition-colors">Technical Skills & Tools</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors">
              Penguasaan perangkat lunak industri dan metodologi inti dalam rekayasa sipil.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {skillsData.map((skillGroup, index) => (
            <FadeIn key={skillGroup.category} delay={index * 0.1}>
              <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 h-full transition-colors duration-300">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 transition-colors">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Education Section ---
const Education = () => {
  return (
    <section id="education" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl mb-4 transition-colors">Pendidikan & Sertifikasi</h2>
            <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <FadeIn>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 transition-colors">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Pendidikan
              </h3>
              {educationData.map((edu) => (
                <div key={edu.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6 transition-colors">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors">{edu.title}</h4>
                  <div className="text-slate-700 dark:text-slate-300 font-medium mb-3 transition-colors">{edu.institution}</div>
                  <div className="inline-block bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-md text-sm font-semibold transition-colors">
                    {edu.details}
                  </div>
                </div>
              ))}
            </FadeIn>

            <FadeIn delay={0.2} className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 transition-colors">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Kepemimpinan
              </h3>
              <ul className="space-y-4">
                {leadershipData.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.1}>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3 transition-colors">
                <Award className="w-6 h-6 text-orange-500" /> Sertifikasi Profesional
              </h3>
              <div className="space-y-4">
                {certificationsData.map((cert, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 transition-colors">
                      <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 font-medium text-lg transition-colors">{cert}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer / Contact Section ---
const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        (e.target as HTMLFormElement).reset();
      }, 3000);
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-white dark:bg-slate-900 pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 transition-colors">Mari Berdiskusi</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 transition-colors">
              Saya terbuka untuk peluang profesional baru, kolaborasi proyek, dan konsultasi di bidang teknik sipil dan manajemen konstruksi.
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Nama Lengkap</label>
                <input type="text" id="name" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors" placeholder="Masukkan nama Anda" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Alamat Email</label>
                <input type="email" id="email" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors" placeholder="nama@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">Pesan</label>
                <textarea id="message" rows={4} required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-slate-900 dark:text-white transition-colors resize-none" placeholder="Ceritakan tentang proyek Anda..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={formState !== 'idle'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-lg shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState === 'submitting' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : formState === 'success' ? (
                  <>
                    <Check className="w-5 h-5" />
                    Terkirim
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 transition-colors">Info Kontak</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">Email</div>
                    <div className="flex items-center gap-2">
                      <a href="mailto:arifiansyah737@gmail.com" className="text-slate-900 dark:text-white font-medium hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                        arifiansyah737@gmail.com
                      </a>
                      <button 
                        onClick={() => copyToClipboard('arifiansyah737@gmail.com', 'email')}
                        className="text-slate-400 hover:text-orange-500 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                        aria-label="Copy Email"
                        title="Copy to clipboard"
                      >
                        {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">Telepon / WhatsApp</div>
                    <div className="flex items-center gap-2">
                      <a href="tel:+6281336686066" className="text-slate-900 dark:text-white font-medium hover:text-orange-500 dark:hover:text-orange-400 transition-colors">
                        +62 813 3668 6066
                      </a>
                      <button 
                        onClick={() => copyToClipboard('+6281336686066', 'phone')}
                        className="text-slate-400 hover:text-orange-500 transition-colors p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                        aria-label="Copy Phone"
                        title="Copy to clipboard"
                      >
                        {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">Lokasi</div>
                    <div className="text-slate-900 dark:text-white font-medium transition-colors">Surabaya, Indonesia</div>
                  </div>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 flex gap-4 transition-colors">
                <a href="https://linkedin.com/in/arifiansyah" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://arifiansyah56.github.io" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-colors" aria-label="Portfolio">
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="text-center pt-8 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-500 text-sm transition-colors">
          <p>Copyright &copy; 2026 Muhammad Arifiansyah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-orange-500/30 selection:text-orange-900 dark:selection:text-orange-100 transition-colors duration-300">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-[100]"
        style={{ scaleX }}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Summary />
        <Experience />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
    </div>
  );
}

export default App;
