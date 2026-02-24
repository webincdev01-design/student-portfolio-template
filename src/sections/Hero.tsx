import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Content entrance
      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems) {
        tl.fromTo(
          contentItems,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
        );
      }

      // Image entrance
      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        '-=0.5'
      );

      // Stats entrance
      const stats = statsRef.current?.querySelectorAll('.stat-item');
      if (stats) {
        tl.fromTo(
          stats,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            const items = contentRef.current?.querySelectorAll('.animate-item');
            if (items && items.length > 0) {
              gsap.set(items, { opacity: 1, y: 0 });
            }
            if (imageRef.current) {
              gsap.set(imageRef.current, { opacity: 1, x: 0, scale: 1 });
            }
          },
        },
      });

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        contentRef.current,
        { x: 0, opacity: 1 },
        { x: '-50vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1, scale: 1 },
        { x: '50vw', opacity: 0, scale: 0.8, ease: 'power2.in' },
        0.7
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Built' },
    { value: '100%', label: 'Client Satisfaction' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      <div className="w-full px-6 lg:px-16 xl:px-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div ref={contentRef} className="flex-1 max-w-2xl z-10">
          {/* LABEL: Greeting */}
          <span className="label-badge mb-4 block w-fit">EDIT: Your greeting</span>
          <p className={`animate-item text-lg font-medium mb-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            👋 Hello, I'm
          </p>

          {/* LABEL: Name */}
          <span className="label-badge mb-2 block w-fit">EDIT: Your name</span>
          <h1 className={`animate-item text-5xl lg:text-7xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            David <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Chen</span>
          </h1>

          {/* LABEL: Title/Role */}
          <span className="label-badge mb-4 block w-fit">EDIT: Your role</span>
          <p className={`animate-item text-2xl lg:text-3xl font-semibold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Full-Stack Developer & UI Designer
          </p>

          {/* LABEL: Bio */}
          <span className="label-badge mb-2 block w-fit">EDIT: Your bio</span>
          <p className={`animate-item text-base lg:text-lg mb-8 leading-relaxed max-w-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            I craft pixel-perfect, accessible, and performant web experiences. 
            Passionate about clean code, user-centered design, and building products that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="animate-item flex flex-wrap gap-4 mb-8">
            {/* LABEL: CTA Buttons */}
            <span className="label-badge mb-2 block w-full">EDIT: Your CTAs</span>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div className="animate-item flex gap-4">
            {/* LABEL: Social Links */}
            <span className="label-badge mb-2 block w-full">EDIT: Your socials</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isDark 
                    ? 'bg-white/5 text-gray-400 hover:bg-purple-500/20 hover:text-purple-400 border border-white/10' 
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600 border border-gray-200'
                }`}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="flex-1 flex justify-center lg:justify-end z-10">
          <div className="relative">
            {/* Glow effect behind image */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl blur-3xl scale-110" />
            
            {/* Image container */}
            <div className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-2 border-purple-500/30 glow-purple">
              {/* LABEL: Profile Image */}
              <span className="label-badge absolute top-4 left-4 z-20">REPLACE: Your photo</span>
              <img
                src="/hero_portrait.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
              
              {/* Code overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-4 ${isDark ? 'bg-black/80' : 'bg-white/90'} backdrop-blur-sm`}>
                <code className={`text-xs font-mono ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                  const developer = {'{'}<br/>
                  &nbsp;&nbsp;passion: "building",<br/>
                  &nbsp;&nbsp;coffee: true,<br/>
                  &nbsp;&nbsp;bugs: 0<br/>
                  {'}'}
                </code>
              </div>
            </div>

            {/* Floating badge */}
            <div className={`absolute -bottom-4 -left-4 px-4 py-2 rounded-xl ${isDark ? 'bg-purple-500' : 'bg-purple-600'} text-white font-semibold text-sm animate-float`}>
              Available for Work
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div 
        ref={statsRef}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 lg:gap-16 px-8 py-4 rounded-2xl ${
          isDark ? 'bg-white/5 border border-white/10' : 'bg-white/80 border border-gray-200'
        } backdrop-blur-xl`}
      >
        {/* LABEL: Stats */}
        <span className="label-badge absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">EDIT: Your stats</span>
        {stats.map((stat, index) => (
          <div key={index} className="stat-item text-center">
            <p className={`text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500`}>
              {stat.value}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2">
        <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Scroll</span>
        <ArrowDown className={`w-5 h-5 animate-bounce ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
      </div>
    </section>
  );
};

export default Hero;
