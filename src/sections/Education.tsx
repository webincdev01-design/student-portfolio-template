import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      scrollTl.fromTo(
        cardRef.current,
        { y: '100vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        ribbonRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, ease: 'none' },
        0.05
      );

      const leftItems = leftContentRef.current?.querySelectorAll('.animate-item');
      if (leftItems) {
        scrollTl.fromTo(
          leftItems,
          { y: '-6vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      const eduCards = cardsRef.current?.querySelectorAll('.edu-card');
      if (eduCards) {
        scrollTl.fromTo(
          eduCards,
          { x: '50vw', opacity: 0, rotate: 2 },
          { x: 0, opacity: 1, rotate: 0, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      const dots = cardsRef.current?.querySelectorAll('.dot-marker');
      if (dots) {
        scrollTl.fromTo(
          dots,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      if (eduCards) {
        scrollTl.fromTo(
          eduCards,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        ribbonRef.current,
        { scaleY: 1, opacity: 1 },
        { scaleY: 0.6, opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (leftItems) {
        scrollTl.fromTo(
          leftItems,
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const educationData = [
    {
      icon: GraduationCap,
      title: 'Northwood High School',
      subtitle: 'Senior, GPA 3.9',
      year: '2022 - 2026',
    },
    {
      icon: BookOpen,
      title: 'CS50 Online',
      subtitle: 'HarvardX — Intro to CS',
      year: '2025',
    },
    {
      icon: Award,
      title: 'Design Bootcamp',
      subtitle: 'UX Fundamentals & Accessibility',
      year: '2024',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#F6F8FC]"
    >
      {/* Main card */}
      <div
        ref={cardRef}
        className="section-card absolute w-[88vw] h-[72vh] top-[14vh] left-[6vw]"
      >
        {/* Left content */}
        <div
          ref={leftContentRef}
          className="absolute left-[4vw] top-1/2 -translate-y-1/2 w-[34vw]"
        >
          {/* LABEL: Section title */}
          <span className="label-badge mb-3 block w-fit">EDIT: Section title</span>
          <h2 className="animate-item text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-4 font-['Poppins']">
            Education
          </h2>

          {/* LABEL: Section description */}
          <span className="label-badge mb-2 block w-fit">EDIT: Section description</span>
          <p className="animate-item text-base text-[#6B7280] leading-relaxed">
            A mix of formal school, online courses, and self-taught experiments.
          </p>
        </div>

        {/* Ribbon */}
        <div
          ref={ribbonRef}
          className="absolute left-[46vw] top-[8vh] w-[1.2vw] h-[54vh] bg-[#4A90E2] rounded-full origin-top"
        />

        {/* Education cards */}
        <div
          ref={cardsRef}
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 w-[38vw] flex flex-col gap-6"
        >
          {/* LABEL: Your education entries */}
          <span className="label-badge mb-2 block w-fit">EDIT: Your education</span>
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="edu-card relative bg-[#F8FAFC] rounded-2xl p-5 border border-black/5 hover:shadow-md transition-shadow"
            >
              {/* Dot marker */}
              <div className="dot-marker absolute -left-[3.2vw] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#4A90E2] rounded-full" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] flex items-center justify-center flex-shrink-0">
                  <edu.icon size={22} className="text-[#4A90E2]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-lg font-semibold text-[#1A1A1A]">{edu.title}</h3>
                    <span className="text-xs text-[#6B7280] bg-white px-2 py-1 rounded-full border border-black/5">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280]">{edu.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
