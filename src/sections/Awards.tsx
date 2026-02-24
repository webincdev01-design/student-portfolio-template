import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Medal, Star, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

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
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
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

      const awardCards = rightContentRef.current?.querySelectorAll('.award-card');
      if (awardCards) {
        scrollTl.fromTo(
          awardCards,
          { x: '50vw', opacity: 0, rotate: 1 },
          { x: 0, opacity: 1, rotate: 0, stagger: 0.04, ease: 'none' },
          0.08
        );
      }

      const icons = rightContentRef.current?.querySelectorAll('.award-icon');
      if (icons) {
        scrollTl.fromTo(
          icons,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.04, ease: 'none' },
          0.1
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      if (awardCards) {
        scrollTl.fromTo(
          awardCards,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      if (leftItems) {
        scrollTl.fromTo(
          leftItems,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const awardsData = [
    {
      icon: Medal,
      title: 'Honor Roll',
      organization: 'Northwood High',
      description: '3 consecutive years',
    },
    {
      icon: Star,
      title: 'AP Scholar',
      organization: 'College Board',
      description: 'With Distinction',
    },
    {
      icon: Trophy,
      title: 'Best UX Prize',
      organization: 'School Design Fair',
      description: '2025 Competition',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="awards"
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
            Awards
          </h2>

          {/* LABEL: Section description */}
          <span className="label-badge mb-2 block w-fit">EDIT: Section description</span>
          <p className="animate-item text-base text-[#6B7280] leading-relaxed">
            Recognition that keeps me humble—and hungry to learn more.
          </p>
        </div>

        {/* Award cards */}
        <div
          ref={rightContentRef}
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 w-[38vw] flex flex-col gap-5"
        >
          {/* LABEL: Your awards/achievements */}
          <span className="label-badge mb-2 block w-fit">EDIT: Your awards</span>
          {awardsData.map((award, index) => (
            <div
              key={index}
              className="award-card bg-[#F8FAFC] rounded-2xl p-5 border border-black/5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="award-icon w-12 h-12 rounded-xl bg-[#EAF2FF] flex items-center justify-center flex-shrink-0">
                  <award.icon size={22} className="text-[#4A90E2]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{award.title}</h3>
                  <p className="text-sm text-[#4A90E2] font-medium mb-1">{award.organization}</p>
                  <p className="text-xs text-[#6B7280]">{award.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
