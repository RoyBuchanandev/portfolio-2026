import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

// Registrar plugins GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Constantes para mejorar mantenibilidad
const VIDEO_SRC = "videos/royhero.mp4";

// Hook personalizado para detectar viewport responsivo
const useViewport = () => {
  const [width, setWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Aseguramos que solo se ejecute en el cliente
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return {
    width,
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024
  };
};

// Componente optimizado para la sección About
const About = () => {
  const { t } = useLanguage();

  // Referencias para elementos clave
  const aboutRef = useRef(null);
  const videoRef = useRef(null);
  const clipRef = useRef(null);
  const maskRef = useRef(null);
  const textContentRef = useRef(null);

  // Estado para gestionar la carga del video
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Detección de tamaño de pantalla para responsive
  const { isMobile, isTablet } = useViewport();

  // Manejar eventos del video
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.warn("Error al cargar el video");
    setVideoError(true);
    setVideoLoaded(true); // Para ocultar el loader
  };

  // Animaciones principales usando GSAP
  useGSAP(() => {
    // Solo ejecutar si los elementos existen
    if (!maskRef.current || !clipRef.current || !textContentRef.current) return;

    // Configuración inicial para la máscara con consideraciones de accesibilidad
    gsap.set(maskRef.current, {
      width: isMobile ? "85vw" : isTablet ? "75vw" : "65vw",
      height: isMobile ? "40vh" : isTablet ? "50vh" : "60vh",
      borderRadius: "12px",
      overflow: "hidden"
    });

    // Animación de texto de introducción
    const textAnimation = gsap.timeline();
    const paragraphs = textContentRef.current.querySelectorAll('p');

    if (paragraphs.length) {
      textAnimation.from(paragraphs, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    // Configuración de la animación de clip con mejoras
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: clipRef.current,
        start: "top center",
        end: "+=900",
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        onEnter: () => {
          if (videoRef.current && videoRef.current.paused && !videoError) {
            videoRef.current.play().catch(err => {
              console.warn("Reproducción automática limitada:", err);
              // No marcamos error aquí ya que puede ser debido a políticas del navegador
            });
          }
        }
      },
    });

    // Secuencia de animación mejorada
    if (maskRef.current) {
      clipAnimation.to(maskRef.current, {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "power2.inOut",
      });
    }

    // Efecto de parallax para el texto al hacer scroll
    const parallaxText = document.querySelector(".parallax-text");
    if (parallaxText && aboutRef.current) {
      gsap.to(parallaxText, {
        y: "-20%",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    return () => {
      // Limpiar ScrollTriggers al desmontar el componente
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Limpiar timelines
      textAnimation.kill();
      clipAnimation.kill();
    };
  }, [isMobile, isTablet, videoError]);

  return (
    <section
      id="experiencia"
      ref={aboutRef}
      className="relative w-full bg-black overflow-hidden py-12 md:py-24"
      aria-label="Professional Experience"
    >
      <div className="relative mb-8 md:mb-16 flex flex-col items-center gap-4 z-10 w-full">
        <div className="w-full flex justify-center items-center mt-0 pt-0">
          {/* Cabecera de la sección */}
          <div className="text-center w-full">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full">
              {t('about.tag')}
            </p>
            <div className="flex flex-col items-center justify-center">
              <AnimatedTitle
                title={t('about.title1')}
                containerClass="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none"
              />
              <AnimatedTitle
                title={t('about.title2')}
                containerClass="text-4xl md:text-5xl font-black text-gray-500 tracking-tighter leading-none"
              />
            </div>
          </div>
        </div>

        {/* Textos descriptivos */}
        <div
          ref={textContentRef}
          className="about-subtext max-w-4xl mx-auto text-center px-4 font-circular-web"
        >
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed text-gray-300 font-light text-justify">
            {t('about.p1')}
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-6 leading-relaxed text-gray-300 font-light text-justify">
            {t('about.p2')}
          </p>
        </div>
      </div>

      {/* Contenedor principal para la animación de clip */}
      <div className="relative h-screen w-full" id="clip" ref={clipRef}>
        {/* Indicador de carga mientras el video se prepara */}
        {!videoLoaded && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/20 animate-pulse"></div>
          </div>
        )}

        {/* Contenedor con máscara para el video */}
        <div
          ref={maskRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex overflow-hidden bg-gray-900"
          style={{ boxShadow: "0 15px 35px rgba(0,0,0,0.3)" }}
          aria-hidden={!videoLoaded}
        >
          {/* Contenido fallback en caso de error de video */}
          {videoError ? (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center border border-white/10 rounded-lg">
              <p className="text-gray-500 text-center px-4 text-sm font-mono">
                Muestra de Experiencia Profesional
              </p>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              autoPlay
              playsInline
              loop
              muted
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className="absolute left-0 top-0 w-full h-full object-cover"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Texto con efecto parallax */}
        <div className="parallax-text absolute right-4 bottom-4 md:right-12 md:bottom-12 z-10 text-white/80 font-mono text-sm opacity-70 pointer-events-none">
          <div>{t('about.scroll')}</div>
          <div className="h-12 w-px mx-auto bg-white/40"></div>
        </div>
      </div>
    </section>
  );
};

export default About;