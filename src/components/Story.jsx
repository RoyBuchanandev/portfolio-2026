import gsap from "gsap";
import { useRef, useEffect, useState, useCallback } from "react";
import { AiFillStar } from "react-icons/ai";
import AnimatedTitle from "./AnimatedTitle";

const CarouselReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);
  const indicatorsRef = useRef(null);
  const touchStartXRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const animationsSetupRef = useRef(false);

  const skills = [
    {
      category: "Frontend",
      role: "Experiencia Principal",
      text: "React, Next.js, TypeScript, Tailwind CSS, GSAP - Construyendo interfaces de usuario responsivas y performantes con frameworks modernos y librerías de animación.",
      rating: 5
    },
    {
      category: "Backend",
      role: "Desarrollo Backend",
      text: "REST APIs, ORM, arquitectura - Diseñando sistemas robustos y escalables.",
      rating: 5
    },
    {
      category: "Database",
      role: "Gestión de Datos",
      text: "SQL y NoSQL - Modelado eficiente y optimización de consultas.",
      rating: 5
    },
    {
      category: "Cloud",
      role: "Infraestructura",
      text: "AWS y Datadog - Implementación y monitoreo en la nube.",
      rating: 5
    },
    {
      category: "Testing",
      role: "QA",
      text: "Jest, unit testing, e2e testing - Asegurando la calidad del software.",
      rating: 5
    }
  ];

  // Configuración inicial solo una vez
  useEffect(() => {
    if (!carouselRef.current || animationsSetupRef.current) return;

    // Marcar que ya se configuró
    animationsSetupRef.current = true;

    // Registrar efectos personalizados de GSAP
    gsap.registerEffect({
      name: "cardFloat",
      effect: (targets, config) => {
        return gsap.to(targets, {
          y: config.distance || 10,
          duration: config.duration || 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.2,
            from: "random"
          }
        });
      },
      defaults: { distance: 10, duration: 2 },
      extendTimeline: true
    });

    // Inicializar todas las tarjetas una sola vez
    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      gsap.set(card, {
        xPercent: index === 0 ? 0 : 100,
        opacity: index === 0 ? 1 : 0,
        display: index === 0 ? 'flex' : 'none',
        transformPerspective: 1000,
        transformStyle: "preserve-3d"
      });

      // Elementos internos con flotación
      const elements = card.querySelectorAll('.animate-item');
      elements.forEach((el) => {
        const randomDelay = Math.random() * 2;
        const randomDistance = 5 + Math.random() * 3;
        const randomDuration = 3 + Math.random() * 2;

        gsap.fromTo(el,
          { y: 0 },
          {
            y: randomDistance,
            duration: randomDuration,
            delay: randomDelay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          }
        );
      });
    });

    // Animación de entrada para indicadores
    gsap.from(indicatorsRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
    });

    // Inicialmente actualizar el primer indicador
    updateIndicators(0);

    // Iniciar autoplay
    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  // Función para iniciar el autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    autoplayTimerRef.current = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 7000);
  }, [isAnimating]);

  // Actualizar los indicadores
  const updateIndicators = useCallback((index) => {
    if (!indicatorsRef.current) return;

    const indicators = indicatorsRef.current.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
      if (i === index) {
        gsap.timeline()
          .to(indicator, {
            width: '2.5rem',
            background: 'rgba(129, 140, 248, 1)',
            boxShadow: '0 0 10px rgba(129, 140, 248, 0.5)',
            duration: 0.4,
            ease: 'power2.out'
          })
          .to(indicator, {
            boxShadow: '0 0 8px rgba(129, 140, 248, 0.7)',
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'sine.inOut'
          }, '-=0.2');
      } else {
        gsap.to(indicator, {
          width: '0.75rem',
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: 'none',
          duration: 0.3,
          ease: 'power1.out'
        });
      }
    });
  }, []);

  // Función para ir a una review específica
  const goToReview = useCallback((index) => {
    if (isAnimating || index === activeIndex || !cardRefs.current[index] || !cardRefs.current[activeIndex]) {
      return;
    }

    setIsAnimating(true);
    const currentCard = cardRefs.current[activeIndex];
    const nextCard = cardRefs.current[index];
    const direction = index > activeIndex ? 1 : -1;

    // Resetear el autoplay
    startAutoplay();

    // Mostrar la siguiente tarjeta
    gsap.set(nextCard, {
      xPercent: direction * 100,
      opacity: 0,
      rotationY: direction * 15,
      transformPerspective: 1000,
      z: -100,
      display: 'flex'
    });

    // Timeline para la transición
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(currentCard, { display: 'none' });
        setActiveIndex(index);
        setIsAnimating(false);
      }
    });

    // Animación de salida
    tl.to(currentCard, {
      xPercent: direction * -100,
      opacity: 0,
      scale: 0.9,
      rotationY: direction * -15,
      z: -50,
      duration: 0.75,
      ease: 'power3.inOut'
    });

    // Preparar elementos internos
    const nextCardItems = nextCard.querySelectorAll('.animate-item');
    gsap.set(nextCardItems, { y: 30, opacity: 0, scale: 0.95 });

    // Animar entrada
    tl.to(nextCard, {
      xPercent: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      z: 0,
      duration: 0.75,
      ease: 'power3.out'
    }, '<0.1');

    // Animar elementos internos
    tl.to(nextCardItems, {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.65,
      ease: 'back.out(1.7)'
    }, '-=0.4');

    // Actualizar indicadores
    updateIndicators(index);

    // Efecto de flash
    if (carouselRef.current) {
      const flash = document.createElement('div');
      flash.className = 'absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 z-50 pointer-events-none';
      carouselRef.current.appendChild(flash);

      gsap.to(flash, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          if (carouselRef.current && carouselRef.current.contains(flash)) {
            carouselRef.current.removeChild(flash);
          }
        }
      });
    }
  }, [activeIndex, isAnimating, startAutoplay, updateIndicators]);

  // Navegar a la siguiente review
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % skills.length;
    goToReview(nextIndex);
  }, [activeIndex, goToReview, skills.length]);

  // Navegar a la review anterior
  const goToPrev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + skills.length) % skills.length;
    goToReview(prevIndex);
  }, [activeIndex, goToReview, skills.length]);

  // Manejar eventos táctiles
  const handleTouchStart = useCallback((e) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartXRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    // Swipe horizontal detection (40px threshold)
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
  }, [goToNext, goToPrev]);

  // Renderizar estrellas para la calificación
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={`text-${i < rating ? 'yellow-400' : 'gray-600'}`}>
        <AiFillStar className="inline" />
      </span>
    ));
  };

  return (
    <div id="habilidades" className="min-h-dvh w-full bg-gradient-to-b from-slate-950 to-black text-blue-50 px-4">
      <div className="flex flex-col items-center py-10 pb-24 max-w-7xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full">
          HABILIDADES Y TECNOLOGÍAS
        </p>

        <div className="relative w-full mt-4 flex flex-col items-center justify-center">
          <AnimatedTitle
            title="STACK"
            containerClass="text-4xl md:text-5xl font-black text-white tracking-tighter text-center leading-none"
          />
          <AnimatedTitle
            title="TECNOLÓGICO"
            containerClass="text-4xl md:text-5xl font-black text-gray-500 tracking-tighter text-center leading-none"
          />

          {/* Carrusel de Reviews */}
          <div
            ref={carouselRef}
            className="relative w-full max-w-3xl mx-auto mt-12 rounded-xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Controles de navegación para pantallas más grandes */}
            <div className="hidden sm:flex justify-between absolute top-1/2 left-0 right-0 z-10 px-4 -translate-y-1/2 pointer-events-none">
              <button
                onClick={goToPrev}
                className="transform -translate-x-2 bg-gray-900/80 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isAnimating}
                aria-label="Review anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="transform translate-x-2 bg-gray-900/80 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={isAnimating}
                aria-label="Siguiente review"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Contenedor de tarjetas */}
            <div className="relative h-auto min-h-[300px] sm:min-h-[280px] w-full">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className="absolute top-0 left-0 w-full p-6 sm:p-8 flex flex-col bg-gray-950/90 backdrop-blur-sm rounded-xl border border-gray-800/50 transition-shadow duration-500 shadow-lg"
                  style={{ overflow: 'hidden' }}
                >
                  {/* Review text */}
                  <p className="text-lg sm:text-xl text-white mb-6 leading-relaxed italic animate-item relative">
                    <span className="absolute -left-2 top-0 text-4xl text-cyan-400/30">"</span>
                    {skill.text}
                    <span className="absolute -bottom-4 right-0 text-4xl text-cyan-400/30">"</span>
                  </p>

                  {/* Author info */}
                  <div className="flex items-center mt-auto animate-item">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 flex items-center justify-center text-white text-lg font-medium shadow-lg">
                      {skill.category.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-white">{skill.category}</p>
                      <p className="text-cyan-300 text-sm">{skill.role}</p>
                      <div className="flex mt-1 text-sm">
                        {renderStars(skill.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores */}
            <div ref={indicatorsRef} className="flex justify-center gap-2 mt-8">
              {skills.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToReview(index)}
                  disabled={isAnimating}
                  className={`carousel-indicator h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-cyan-500' : 'w-3 bg-white/30'
                    }`}
                  aria-label={`Ver skill category ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselReviews;