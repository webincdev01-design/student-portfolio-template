import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, Calendar, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      scrollTl.fromTo(
        photoRef.current,
        { x: '-40vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        photoRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (contentItems) {
        scrollTl.fromTo(
          contentItems,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactInfo = [
    { icon: MapPin, label: 'Location', value: 'Portland, OR' },
    { icon: Mail, label: 'Email', value: 'hello@alexmorgan.studio' },
    { icon: Phone, label: 'Phone', value: '+1 (503) 555-0127' },
    { icon: Calendar, label: 'Availability', value: 'Open to internships' },
  ];

  const badges = ['Problem solver', 'Team player', 'Curious'];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background band */}
      <div className="absolute top-[18vh] left-0 w-full h-[64vh] bg-[#EAF2FF]" />

      {/* Main card */}
      <div
        ref={cardRef}
        className="section-card absolute w-[88vw] h-[72vh] top-[14vh] left-[6vw]"
      >
        {/* Photo */}
        <div
          ref={photoRef}
          className="absolute left-[4vw] top-1/2 -translate-y-1/2 w-[26vw] h-[60vh] rounded-[28px] overflow-hidden shadow-lg"
        >
          {/* LABEL: Replace with your photo */}
          <span className="label-badge absolute top-4 left-4 z-10 bg-white/90">REPLACE: Your photo</span>
          <img
            src="/about_photo.jpg"
            alt="About"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 w-[48vw]"
        >
          {/* LABEL: Section title */}
          <span className="label-badge mb-3 block w-fit">EDIT: Section title</span>
          <h2 className="animate-item text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6 font-['Poppins']">
            About Me
          </h2>

          {/* LABEL: Your bio/description */}
          <span className="label-badge mb-2 block w-fit">EDIT: Your description</span>
          <p className="animate-item text-base lg:text-lg text-[#6B7280] leading-relaxed mb-8">
            I'm a senior at Northwood High with a habit of turning ideas into small projects—whether it's a tutoring program, a web app, or a weekend workshop.
          </p>

          {/* Contact info grid */}
          <div className="animate-item grid grid-cols-2 gap-4 mb-8">
            {/* LABEL: Your contact details */}
            <span className="label-badge mb-2 block w-full col-span-2">EDIT: Your contact info</span>
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF2FF] flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#4A90E2]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B7280] uppercase tracking-wide">{item.label}</p>
                  <p className="text-sm font-medium text-[#1A1A1A]">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="animate-item flex flex-wrap gap-3">
            {/* LABEL: Your personal traits */}
            <span className="label-badge mb-2 block w-full">EDIT: Your traits/qualities</span>
            {badges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF2FF] text-[#4A90E2] text-sm font-medium"
              >
                <Check size={14} />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
