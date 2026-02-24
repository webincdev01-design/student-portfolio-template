import { useEffect, useRef, createContext, useContext, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

// Theme Context
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isDark, setIsDark] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    // Update document class for theme
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  useEffect(() => {
    // Global snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div 
        ref={mainRef} 
        className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${
          isDark ? 'gradient-bg' : 'gradient-bg-light'
        }`}
      >
        {/* Grid pattern overlay */}
        <div className="fixed inset-0 pointer-events-none grid-pattern z-0" />
        
        {/* Floating orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div 
            className={`absolute w-96 h-96 rounded-full blur-[120px] animate-float ${
              isDark ? 'bg-purple-600/20' : 'bg-purple-500/10'
            }`}
            style={{ top: '10%', left: '-5%' }}
          />
          <div 
            className={`absolute w-80 h-80 rounded-full blur-[100px] animate-float ${
              isDark ? 'bg-cyan-500/15' : 'bg-cyan-400/10'
            }`}
            style={{ top: '50%', right: '-10%', animationDelay: '2s' }}
          />
          <div 
            className={`absolute w-64 h-64 rounded-full blur-[80px] animate-float ${
              isDark ? 'bg-pink-500/15' : 'bg-pink-400/10'
            }`}
            style={{ bottom: '10%', left: '20%', animationDelay: '4s' }}
          />
        </div>
        
        <Navigation />
        
        <main className="relative z-10">
          <Hero />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
