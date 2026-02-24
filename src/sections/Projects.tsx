import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web App' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'design', label: 'Design' },
  ];

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      category: 'web',
      description: 'Full-stack analytics dashboard with real-time data visualization.',
      image: '/interest_1.jpg',
      tech: ['React', 'Node.js', 'MongoDB'],
      demoUrl: '#',
      repoUrl: '#',
      views: '2.5k',
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'mobile',
      description: 'Cross-platform mobile app for team collaboration.',
      image: '/interest_2.jpg',
      tech: ['React Native', 'Firebase', 'Redux'],
      demoUrl: '#',
      repoUrl: '#',
      views: '1.8k',
    },
    {
      id: 3,
      title: 'Portfolio Generator',
      category: 'web',
      description: 'AI-powered tool that generates portfolios from GitHub profiles.',
      image: '/interest_3.jpg',
      tech: ['Next.js', 'OpenAI', 'Tailwind'],
      demoUrl: '#',
      repoUrl: '#',
      views: '3.2k',
    },
    {
      id: 4,
      title: 'Finance Tracker UI',
      category: 'design',
      description: 'Complete UI/UX design system for a personal finance app.',
      image: '/interest_4.jpg',
      tech: ['Figma', 'Prototyping', 'Design System'],
      demoUrl: '#',
      repoUrl: '#',
      views: '950',
    },
    {
      id: 5,
      title: 'Social Media API',
      category: 'web',
      description: 'RESTful API with authentication, posts, and real-time notifications.',
      image: '/about_photo.jpg',
      tech: ['Express', 'PostgreSQL', 'Socket.io'],
      demoUrl: '#',
      repoUrl: '#',
      views: '1.2k',
    },
    {
      id: 6,
      title: 'Weather App Design',
      category: 'design',
      description: 'Beautiful weather app with animated illustrations.',
      image: '/hero_portrait.jpg',
      tech: ['Figma', 'After Effects', 'Lottie'],
      demoUrl: '#',
      repoUrl: '#',
      views: '780',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0% - 30%)
      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        );
      }

      const projectCards = contentRef.current?.querySelectorAll('.project-card');
      if (projectCards) {
        scrollTl.fromTo(
          projectCards,
          { y: '10vh', opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.03, ease: 'none' },
          0.05
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      if (projectCards) {
        scrollTl.fromTo(
          projectCards,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-8">
          {/* LABEL: Section Title */}
          <span className="label-badge mb-3 inline-block">EDIT: Section title</span>
          <h2 className={`animate-item text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
          </h2>
          
          {/* LABEL: Section Description */}
          <span className="label-badge mb-2 inline-block">EDIT: Section description</span>
          <p className={`animate-item text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            A collection of projects I've worked on. Each one taught me something new.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="animate-item flex flex-wrap justify-center gap-3 mb-8">
          {/* LABEL: Filter Categories */}
          <span className="label-badge absolute -top-8 left-1/2 -translate-x-1/2">EDIT: Filter categories</span>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {/* LABEL: Projects */}
          <span className="label-badge absolute -top-4 left-4 z-10">EDIT: Your projects</span>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card glass-card rounded-2xl overflow-hidden group ${isDark ? 'border-white/10' : 'border-black/5'}`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* View count */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-white text-xs">
                  <Eye size={12} />
                  {project.views}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-md ${
                        isDark 
                          ? 'bg-purple-500/20 text-purple-400' 
                          : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                  <a
                    href={project.demoUrl}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      isDark 
                        ? 'bg-white/10 text-white hover:bg-purple-500/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <ExternalLink size={14} />
                    Demo
                  </a>
                  <a
                    href={project.repoUrl}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      isDark 
                        ? 'bg-white/10 text-white hover:bg-purple-500/20' 
                        : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                    }`}
                  >
                    <Github size={14} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
