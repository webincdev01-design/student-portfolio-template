import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Palette, Database, Terminal, Cpu, Globe } from 'lucide-react';
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      skills: [
        { name: 'React / Next.js', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Vue.js', level: 75 },
      ],
    },
    {
      title: 'Backend',
      icon: Database,
      skills: [
        { name: 'Node.js', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'GraphQL', level: 75 },
      ],
    },
    {
      title: 'Design',
      icon: Palette,
      skills: [
        { name: 'Figma', level: 90 },
        { name: 'UI/UX Design', level: 85 },
        { name: 'Prototyping', level: 80 },
        { name: 'Design Systems', level: 85 },
      ],
    },
    {
      title: 'DevOps',
      icon: Terminal,
      skills: [
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 70 },
        { name: 'Kubernetes', level: 60 },
      ],
    },
  ];

  const tools = [
    { icon: Cpu, name: 'VS Code' },
    { icon: Globe, name: 'Git' },
    { icon: Terminal, name: 'Bash' },
    { icon: Database, name: 'MongoDB' },
    { icon: Code2, name: 'Vite' },
    { icon: Palette, name: 'Framer' },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onEnter: () => setAnimated(true),
        },
      });

      // ENTRANCE (0% - 30%)
      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0
        );
      }

      const skillCards = contentRef.current?.querySelectorAll('.skill-card');
      if (skillCards) {
        scrollTl.fromTo(
          skillCards,
          { y: '8vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.05
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      if (skillCards) {
        scrollTl.fromTo(
          skillCards,
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
      id="skills"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-10">
          {/* LABEL: Section Title */}
          <span className="label-badge mb-3 inline-block">EDIT: Section title</span>
          <h2 className={`animate-item text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Expertise</span>
          </h2>
          
          {/* LABEL: Section Description */}
          <span className="label-badge mb-2 inline-block">EDIT: Section description</span>
          <p className={`animate-item text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Technologies I work with daily. Always learning something new.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* LABEL: Skills */}
          <span className="label-badge absolute top-24 left-4 z-10">EDIT: Your skills</span>
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`skill-card glass-card rounded-2xl p-6 ${isDark ? 'border-white/10' : 'border-black/5'}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                }`}>
                  <category.icon className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
                </div>
                <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {skill.name}
                      </span>
                      <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                      <div
                        className="h-full rounded-full skill-bar transition-all duration-1000 ease-out"
                        style={{ 
                          width: animated ? `${skill.level}%` : '0%',
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="animate-item">
          {/* LABEL: Tools */}
          <span className="label-badge mb-3 inline-block">EDIT: Your tools</span>
          <div className={`glass-card rounded-2xl p-6 ${isDark ? 'border-white/10' : 'border-black/5'}`}>
            <h3 className={`text-sm font-semibold uppercase tracking-wider mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isDark 
                      ? 'bg-white/5 text-gray-300 hover:bg-purple-500/20 hover:text-purple-400' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600'
                  } transition-all cursor-pointer`}
                >
                  <tool.icon size={16} />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
