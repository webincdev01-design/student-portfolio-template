import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Mountain, Gamepad2, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Interests = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

      const leftItems = leftContentRef.current?.querySelectorAll('.animate-item');
      if (leftItems) {
        scrollTl.fromTo(
          leftItems,
          { x: '-20vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        );
      }

      const galleryImages = galleryRef.current?.querySelectorAll('.gallery-image');
      if (galleryImages) {
        scrollTl.fromTo(
          galleryImages,
          { scale: 0.85, opacity: 0, y: '6vh' },
          { scale: 1, opacity: 1, y: 0, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      if (galleryImages) {
        scrollTl.fromTo(
          galleryImages,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      if (leftItems) {
        scrollTl.fromTo(
          leftItems,
          { y: 0, opacity: 1 },
          { y: '8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const interestsList = [
    { icon: Camera, label: 'Photography' },
    { icon: Mountain, label: 'Hiking & maps' },
    { icon: Gamepad2, label: 'Chess & puzzles' },
    { icon: Heart, label: 'Volunteer teaching' },
  ];

  const galleryImages = [
    { src: '/interest_1.jpg', caption: 'Weekend walks' },
    { src: '/interest_2.jpg', caption: 'City lights' },
    { src: '/interest_3.jpg', caption: 'Coffee & sketching' },
    { src: '/interest_4.jpg', caption: 'Camping trips' },
  ];

  return (
    <section
      ref={sectionRef}
      id="interests"
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
          <h2 className="animate-item text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-8 font-['Poppins']">
            Interests
          </h2>

          {/* LABEL: Your interests/hobbies */}
          <span className="label-badge mb-4 block w-fit">EDIT: Your interests</span>
          <div className="space-y-4">
            {interestsList.map((interest, index) => (
              <div
                key={index}
                className="animate-item flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAF2FF] flex items-center justify-center group-hover:bg-[#4A90E2] transition-colors">
                  <interest.icon size={22} className="text-[#4A90E2] group-hover:text-white transition-colors" />
                </div>
                <span className="text-lg font-medium text-[#1A1A1A]">{interest.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery grid */}
        <div
          ref={galleryRef}
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 w-[38vw]"
        >
          {/* LABEL: Your gallery images */}
          <span className="label-badge mb-4 block w-fit">REPLACE: Your photos</span>
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="gallery-image relative rounded-[18px] overflow-hidden aspect-square group"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interests;
