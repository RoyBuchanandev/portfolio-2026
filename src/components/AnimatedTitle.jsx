import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

// Componente AnimatedTitle original (sin cambios)
const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Nueva versión con tipografía actualizada - muy similar en comportamiento
const NeoAnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      // Animación muy similar a la original
      titleAnimation.to(
        ".neo-animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.025, // Sutilmente diferente
        },
        0
      );
      
      // Pequeña adición que la hace ligeramente diferente
      titleAnimation.to(
        ".neo-animated-word",
        {
          scale: 1.01,
          ease: "power1.inOut",
          stagger: 0.025,
          duration: 0.2,
        },
        0.3
      );
      
      titleAnimation.to(
        ".neo-animated-word",
        {
          scale: 1,
          ease: "power1.out",
          stagger: 0.025,
          duration: 0.2,
        },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="neo-animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Componente para animación de texto por caracteres
const StaggeredText = ({ text, className }) => {
  const textRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);
  
  return (
    <p ref={textRef} className={clsx("staggered-text", className)}>
      {text.split('').map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 0.02}s` }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  );
};

// Componente para texto con gradiente
const GradientText = ({ text, className }) => {
  return (
    <span 
      className={clsx("gradient-clip-text", className)}
      data-text={text}
    >
      {text}
    </span>
  );
};

// Componente para texto con animación de onda
const WaveText = ({ text, className }) => {
  return (
    <span className={clsx("animate-text-wave", className)}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          style={{ '--char-index': index }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export { NeoAnimatedTitle, StaggeredText, GradientText, WaveText };
export default AnimatedTitle;