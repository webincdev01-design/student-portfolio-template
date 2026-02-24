import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      id: 1,
      role: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      period: '2023 - Present',
      description: 'Leading frontend development for enterprise SaaS products. Mentoring junior developers and implementing design systems.',
      achievements: ['Reduced load time by 40%', 'Led team of 5 developers', 'Shipped 3 major features'],
      type: 'work',
    },
    {
      id: 2,
      role: 'Full-Stack Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      period: '2021 - 2023',
      description: 'Built full-stack applications using React, Node.js, and PostgreSQL. Worked closely with designers and product managers.',
      achievements: ['Built MVP from scratch', 'Scaled to 10k users', 'Implemented CI/CD pipeline'],
      type: 'work',
    },
    {
      id: 3,
      role: 'Freelance Web Developer',
      company: 'Self-Employed',
      location: 'Worldwide',
      period: '2020 - 2021',
      description: 'Developed custom websites and web applications for various clients across different industries.',
      achievements: ['20+ projects delivered', '100% client satisfaction', '5-star rating'],
      type: 'work',
    },
    {
      id: 4,
      role: 'Computer Science Degree',
      company: 'Stanford University',
      location: 'Stanford, CA',
      period: '2016 - 2020',
      description: 'Bachelor of Science in Computer Science with focus on Human-Computer Interaction.',
      achievements: ['GPA: 3.9/4.0', 'Dean\'s List', 'Teaching Assistant'],
      type: 'education',
    },
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

      const timelineItems = contentRef.current?.querySelectorAll('.timeline-item');
      if (timelineItems) {
        scrollTl.fromTo(
          timelineItems,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
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

      if (timelineItems) {
        scrollTl.fromTo(
          timelineItems,
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-10">
          {/* LABEL: Section Title */}
          <span className="label-badge mb-3 inline-block">EDIT: Section title</span>
          <h2 className={`animate-item text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Experience & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Education</span>
          </h2>
          
          {/* LABEL: Section Description */}
          <span className="label-badge mb-2 inline-block">EDIT: Section description</span>
          <p className={`animate-item text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            My professional journey so far. Every step has been a learning experience.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* LABEL: Experience Entries */}
          <span className="label-badge absolute -top-4 left-0 z-10">EDIT: Your experience</span>
          
          {/* Timeline line */}
          <div className={`absolute left-4 lg:left-1/2 top-0 bottom-0 w-px ${isDark ? 'bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-purple-500/50' : 'bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400'}`} />

          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item relative flex items-start gap-6 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-4 lg:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-2 ${
                  exp.type === 'work' 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500'
                } shadow-lg shadow-purple-500/50`} />

                {/* Content card */}
                <div className={`ml-12 lg:ml-0 lg:w-[45%] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-8' : 'lg:ml-auto lg:pl-8'}`}>
                  <div className={`glass-card rounded-2xl p-5 ${isDark ? 'border-white/10' : 'border-black/5'} hover:border-purple-500/50 transition-colors`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase size={14} className={isDark ? 'text-purple-400' : 'text-purple-600'} />
                          <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        exp.type === 'work'
                          ? isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'
                          : isDark ? 'bg-cyan-500/20 text-cyan-400' : 'bg-cyan-100 text-cyan-600'
                      }`}>
                        {exp.type === 'work' ? 'Work' : 'Education'}
                      </span>
                    </div>

                    <div className={`flex flex-wrap gap-3 mb-3 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>

                    <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-md ${
                            isDark 
                              ? 'bg-white/5 text-gray-400' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
