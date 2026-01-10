import { useEffect, useRef, useCallback, useState, memo } from "react";
import { useLanguage } from "../context/LanguageContext";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import gsap from "gsap";

// Constantes para mejor mantenibilidad
const GITHUB_URL = "https://github.com/RoyBuchanandev";
const EMAIL = "mailto:roybuchanan1996@gmail.com";
const VIDEO_PATHS = {
  contact1: "/videos/contact-1.mp4",
  contact2: "/videos/contact-2.mp4",
  logo: "/videos/logo.mp4",
  profile: "/videos/profile.mp4"
};

// Componente de garabatos de computadoras optimizado
const ComputerDoodles = memo(() => {
  const doodlesRef = useRef(null);

  useEffect(() => {
    if (!doodlesRef.current || typeof gsap === 'undefined') return;

    // Seleccionar todos los SVGs de garabatos
    const doodles = doodlesRef.current.querySelectorAll('.doodle');
    const animations = [];

    // Animar cada garabato con un timing diferente
    doodles.forEach((doodle, index) => {
      // Posición inicial
      gsap.set(doodle, {
        rotation: Math.random() * 10 - 5,
        scale: 0.8 + Math.random() * 0.4,
      });

      // Animación suave y continua
      const anim = gsap.to(doodle, {
        rotation: `+=${Math.random() * 6 - 3}`,
        y: `+=${10 + Math.random() * 15}`,
        scale: 0.9 + Math.random() * 0.2,
        opacity: 0.6 + Math.random() * 0.2,
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.4
      });

      animations.push(anim);
    });

    return () => {
      // Limpiar animaciones
      animations.forEach(anim => anim.kill());
    };
  }, []);

  return (
    <div ref={doodlesRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Garabato de PC */}
      <div className="doodle absolute top-[5%] left-[8%] opacity-30 md:block hidden">
        <svg width="150" height="120" viewBox="0 0 150 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 80h110v-60h-110z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 90v10h50v-10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 100h130" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="75" cy="50" r="15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <path d="M65 40l20 20M85 40l-20 20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de laptop */}
      <div className="doodle absolute top-[15%] right-[10%] opacity-30 md:block hidden">
        <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M30 70l-10 20h80l-10-20" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30 70V20h60v50" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="45" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <path d="M45 30h30M45 55h30" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de tablet cerca del botón */}
      <div className="doodle absolute bottom-[15%] left-[12%] opacity-30">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="20" y="10" width="60" height="100" rx="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <circle cx="50" cy="95" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <line x1="30" y1="25" x2="70" y2="25" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="40" x2="70" y2="40" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="55" x2="70" y2="55" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="70" x2="70" y2="70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de mouse */}
      <div className="doodle absolute bottom-[20%] right-[15%] opacity-30">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 30c0-11.046 8.954-20 20-20s20 8.954 20 20v30c0 11.046-8.954 20-20 20s-20-8.954-20-20V30z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M40 30v-15" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de código/terminal */}
      <div className="doodle absolute top-[40%] left-[15%] opacity-30">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="10" y="10" width="100" height="60" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <path d="M20 25l10 10-10 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 55h30" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de disco duro o servidor */}
      <div className="doodle absolute bottom-[35%] right-[12%] opacity-30 md:block hidden">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="20" y="20" width="60" height="80" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          <circle cx="35" cy="35" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="35" cy="55" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="35" cy="75" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <line x1="50" y1="35" x2="70" y2="35" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="55" x2="70" y2="55" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="75" x2="70" y2="75" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Garabato de conexiones/nodos */}
      <div className="doodle absolute top-[60%] right-[20%] opacity-30 md:block hidden">
        <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="25" cy="25" r="10" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="75" cy="15" r="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="125" cy="30" r="12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="30" cy="75" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <circle cx="90" cy="85" r="11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          <line x1="35" y1="25" x2="67" y2="15" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
          <line x1="83" y1="15" x2="113" y2="30" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
          <line x1="25" y1="35" x2="30" y2="66" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
          <line x1="39" y1="75" x2="79" y2="85" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
          <line x1="125" y1="42" x2="90" y2="74" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
});

ComputerDoodles.displayName = "ComputerDoodles";

// Hook personalizado para manejar las animaciones
const useContactAnimations = (refs) => {
  useEffect(() => {
    if (typeof gsap === 'undefined') return;

    const { sectionRef, titleRef, textRef, buttonRef, leftVideosRef, rightVideosRef } = refs;
    if (!sectionRef.current) return;

    // Limpiar animaciones previas
    const animations = [];

    // Timeline principal con mejor secuencia
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.2
    });

    // Animación de texto y botón con mejor timing
    if (textRef.current && titleRef.current && buttonRef.current) {
      tl.fromTo(
        textRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          buttonRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    }

    // Animaciones más suaves para videos
    if (leftVideosRef.current) {
      const leftAnim = gsap.fromTo(
        leftVideosRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power3.out"
        }
      );
      animations.push(leftAnim);
    }

    if (rightVideosRef.current) {
      const rightAnim = gsap.fromTo(
        rightVideosRef.current,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power3.out"
        }
      );
      animations.push(rightAnim);
    }

    animations.push(tl);

    // Limpieza
    return () => {
      animations.forEach(anim => anim.kill());
    };
  }, [refs]);
};

// Componente optimizado para video o imagen
const ImageClipBox = memo(({ src, clipClass, alt = "" }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!videoRef.current || !src || !src.endsWith('.mp4')) return;

    // Sistema mejorado de reproducción
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Intento con retraso si falla la reproducción automática
          setTimeout(() => {
            if (videoRef.current) videoRef.current.play().catch(() => { });
          }, 1000);
        });
      }
    };

    // Observer optimizado con mejor umbral
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playVideo();
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Unified interaction handler
    const handleInteraction = () => playVideo();

    document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    document.addEventListener('click', handleInteraction, { once: true });

    // Limpieza
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('click', handleInteraction);
    };
  }, [src]);

  // Manejadores de eventos
  const handleVideoLoad = () => setIsLoaded(true);
  const handleVideoError = () => setHasError(true);

  // Si es un archivo MP4 (video)
  if (src && src.endsWith('.mp4')) {
    return (
      <div
        className={`${clipClass} transition-transform duration-500 overflow-hidden relative`}
        aria-hidden="true"
      >
        {/* Indicador de carga */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/60">
            <div className="w-8 h-8 rounded-full border-2 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
          </div>
        )}

        {/* Fallback para errores */}
        {hasError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-12 h-12 opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scale(0.9)',
              transformOrigin: 'center center'
            }}
          />
        )}
      </div>
    );
  }

  // Comportamiento mejorado para imágenes
  return (
    <div className={`${clipClass} transition-transform duration-500 overflow-hidden`}>
      <img
        src={src || ''}
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Fallback para errores de imagen */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <div className="w-12 h-12 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
});

ImageClipBox.displayName = "ImageClipBox";

const Contact = () => {
  const { t } = useLanguage();
  // Referencias para las animaciones
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const leftVideosRef = useRef(null);
  const rightVideosRef = useRef(null);

  // Usar hook de animaciones
  useContactAnimations({
    sectionRef,
    titleRef,
    textRef,
    buttonRef,
    leftVideosRef,
    rightVideosRef
  });



  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="my-12 md:my-24 min-h-96 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-12 overflow-hidden"
      aria-labelledby="contact-title"
    >
      <div className="relative rounded-lg bg-black py-24 border border-white/10 text-white overflow-hidden shadow-2xl">
        {/* Overlay sutil para mejorar el contraste del contenido */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-[1] pointer-events-none"></div>

        {/* Garabatos de computadoras */}
        <ComputerDoodles />

        {/* Videos laterales izquierdos - Mejor posicionamiento */}
        <div
          ref={leftVideosRef}
          className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-0 xl:left-20 lg:w-96 z-10"
        >
          <ImageClipBox
            src={VIDEO_PATHS.contact1}
            clipClass="contact-clip-path-1 hover:scale-105 transition-transform duration-700"
          />
          <ImageClipBox
            src={VIDEO_PATHS.contact2}
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60 hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Videos de logo y perfil - Mejor posicionamiento responsive */}
        <div
          ref={rightVideosRef}
          className="absolute -top-40 left-10 w-56 xs:w-60 sm:left-20 sm:top-1/2 md:left-auto md:-right-10 lg:right-0 xl:right-10 lg:top-20 lg:w-80 hidden sm:block z-10"
        >
          <ImageClipBox
            src={VIDEO_PATHS.logo}
            clipClass="absolute md:scale-125 hover:scale-[1.35] transition-transform duration-700"
          />
          <ImageClipBox
            src={VIDEO_PATHS.profile}
            clipClass="sword-man-clip-path md:scale-125 hover:scale-[1.35] transition-transform duration-700"
          />
        </div>

        {/* Contenido principal - Mejor espaciado y legibilidad */}


        <div className="flex flex-col items-center text-center relative z-20 max-w-lg mx-auto px-4">
          <p
            ref={textRef}
            className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full"
          >
            {t('contact.tag')}
          </p>

          <div ref={titleRef} className="mb-6 sm:mb-8">
            <AnimatedTitle
              title={t('contact.title')}
              containerClass="text-4xl md:text-5xl font-black text-white tracking-tighter"
              id="contact-title"
            />
          </div>

          <div
            ref={buttonRef}
            className="mt-10 sm:mt-14 flex flex-col items-center"
          >
            <a
              href="https://www.linkedin.com/in/roybuchanandev/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer block transform transition hover:scale-105 active:scale-95 relative"
              aria-label="Visitar Perfil de LinkedIn"
            >
              <Button
                title={t('contact.cta')}
                containerClass="cursor-pointer bg-white text-black font-semibold text-sm px-8 py-3 rounded hover:bg-gray-200 transition-colors"
              />
            </a>
            <p className="font-circular-web text-gray-400 mt-6 text-sm">
              {t('contact.subtext')}
            </p>
            <a
              href={EMAIL}
              className="mt-6 text-gray-400 hover:text-white transition-colors text-base border-b border-transparent hover:border-white pb-1"
              aria-label="Enviar Email"
            >
              roybuchanan1996@gmail.com
            </a>

          </div>
        </div>

        {/* Partículas digitales adicionales (efecto sutil) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-30">
          <div className="digital-particles"></div>
        </div>
      </div>

      {/* Estilos para los efectos adicionales */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .digital-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            radial-gradient(circle at 90% 80%, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 100px 100px;
          background-position: 0 0;
          animation: particlesDrift 20s linear infinite;
        }
        
        @keyframes particlesDrift {
          0% { background-position: 0 0; }
          100% { background-position: 100px 100px; }
        }
        
        /* Estilos para las formas de clips de video */
        .contact-clip-path-1 {
          clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
          height: 40%;
        }
        
        .contact-clip-path-2 {
          clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
          height: 40%;
        }
        
        .sword-man-clip-path {
          clip-path: circle(40% at center);
          height: 100%;
          margin-top: 80%;
        }
        
        /* Optimización para preferencia de movimiento reducido */
        @media (prefers-reduced-motion: reduce) {
          .digital-particles {
            animation: none;
          }
          
          .doodle {
            animation: none !important;
            transition: none !important;
          }
          
          .hover\:scale-105:hover {
            transform: none !important;
          }
          
          .hover\:scale-\[1\.35\]:hover {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;