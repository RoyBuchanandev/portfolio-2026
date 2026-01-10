import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.to(".hero-gradient", {
        backgroundPosition: "200% center",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Text animations
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      })
        .from(subtitleRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        }, "-=0.8")
        .from(buttonsRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center p-4"
    >
      {/* Vercel-style Grid with Radial Mask */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-40"></div>
        {/* Radial mask to fade grid edges */}
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]"></div>
        {/* Spotlight effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-white/5 rounded-[100%] blur-[100px] pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">



        {/* Main Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6"
          style={{ fontFamily: "'Inter', sans-serif, system-ui" }}
        >
          ROY BUCHANAN
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="space-y-4 mb-12">
          <h2 className="text-xl md:text-2xl text-gray-400 font-light tracking-tight max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </h2>
        </div>

        {/* Buttons Vercel Style */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('proyectos')}
            className="px-8 py-3 bg-white text-black font-semibold rounded text-sm transition-all hover:bg-gray-200 flex items-center justify-center gap-2"
          >
            {t('hero.cta')} <span className="text-lg">→</span>
          </button>

          <button
            onClick={() => scrollToSection('contacto')}
            className="px-8 py-3 bg-black border border-white/20 text-gray-300 font-medium rounded text-sm transition-all hover:bg-white/10 hover:text-white"
          >
            {t('hero.contact')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;