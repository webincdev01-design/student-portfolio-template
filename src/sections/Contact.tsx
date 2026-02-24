import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, Github, Linkedin, Twitter, MapPin, Phone, Copy, Check } from 'lucide-react';
import { useTheme } from '../App';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { isDark } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
    setFormData({ name: '', email: '', message: '' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('david@devfolio.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Flowing section - no pin
      gsap.fromTo(
        contentRef.current,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      const leftItems = contentRef.current?.querySelectorAll('.left-animate');
      if (leftItems) {
        gsap.fromTo(
          leftItems,
          { x: '-5vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }

      const rightItems = contentRef.current?.querySelectorAll('.right-animate');
      if (rightItems) {
        gsap.fromTo(
          rightItems,
          { x: '5vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: '#', handle: '@davidchen' },
    { icon: Linkedin, label: 'LinkedIn', href: '#', handle: '/in/davidchen' },
    { icon: Twitter, label: 'Twitter', href: '#', handle: '@davidchen_dev' },
  ];

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'david@devfolio.com', action: copyEmail },
    { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: MapPin, label: 'Location', value: 'San Francisco, CA' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen flex items-center justify-center py-20"
    >
      <div ref={contentRef} className="w-full px-6 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          {/* LABEL: Section Title */}
          <span className="label-badge mb-3 inline-block">EDIT: CTA headline</span>
          <h2 className={`left-animate text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Something Great</span>
          </h2>
          
          {/* LABEL: Section Description */}
          <span className="label-badge mb-2 inline-block">EDIT: CTA description</span>
          <p className={`left-animate text-base max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Contact Info */}
          <div>
            {/* LABEL: Contact Info */}
            <span className="label-badge mb-4 inline-block">EDIT: Your contact info</span>
            
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className={`left-animate glass-card rounded-2xl p-5 flex items-center gap-4 ${
                    isDark ? 'border-white/10' : 'border-black/5'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isDark ? 'bg-purple-500/20' : 'bg-purple-100'
                  }`}>
                    <item.icon className={isDark ? 'text-purple-400' : 'text-purple-600'} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {item.label}
                    </p>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.value}
                    </p>
                  </div>
                  {item.action && (
                    <button
                      onClick={item.action}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark 
                          ? 'hover:bg-white/10 text-gray-400 hover:text-purple-400' 
                          : 'hover:bg-gray-100 text-gray-500 hover:text-purple-600'
                      }`}
                      title="Copy email"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="left-animate">
              {/* LABEL: Social Links */}
              <span className="label-badge mb-4 inline-block">EDIT: Your social links</span>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`glass-card rounded-2xl p-4 text-center group hover:border-purple-500/50 transition-all ${
                      isDark ? 'border-white/10' : 'border-black/5'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all ${
                      isDark 
                        ? 'bg-white/5 group-hover:bg-purple-500/20' 
                        : 'bg-gray-100 group-hover:bg-purple-100'
                    }`}>
                      <social.icon className={`transition-colors ${
                        isDark 
                          ? 'text-gray-400 group-hover:text-purple-400' 
                          : 'text-gray-600 group-hover:text-purple-600'
                      }`} size={22} />
                    </div>
                    <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {social.label}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      {social.handle}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="right-animate">
            {/* LABEL: Contact Form */}
            <span className="label-badge mb-4 inline-block">EDIT: Form fields</span>
            
            <form 
              onSubmit={handleSubmit} 
              className={`glass-card rounded-2xl p-6 ${isDark ? 'border-white/10' : 'border-black/5'}`}
            >
              <div className="space-y-5">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500'
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none resize-none ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-purple-500'
                    }`}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          {/* LABEL: Footer */}
          <span className="label-badge mb-4 block w-fit mx-auto">EDIT: Footer</span>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2026 David Chen. Built with React & Tailwind.
            </p>
            <div className="flex gap-6">
              <a href="#" className={`text-sm hover:text-purple-500 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Privacy
              </a>
              <a href="#" className={`text-sm hover:text-purple-500 transition-colors ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
