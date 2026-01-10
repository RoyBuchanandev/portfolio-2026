import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, Instagram, MapPin, Phone, Mail, Clock, Play, ArrowRight } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  const [currentHistorySlide, setCurrentHistorySlide] = useState(0);


  const nextHistorySlide = () => {
    setCurrentHistorySlide((prev) => (prev + 1) % 4);
  };

  const prevHistorySlide = () => {
    setCurrentHistorySlide((prev) => (prev - 1 + 4) % 4);
  };

  const goToHistorySlide = (index) => {
    setCurrentHistorySlide(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextHistorySlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentHistorySlide]);


  const mediaFeatures = [
    {
      title: "VIMEO",
      subtitle: "Documental",
      description: "Un recorrido íntimo por nuestra historia, capturando la esencia de nuestra heladería artesanal.",
      videoSrc: "https://player.vimeo.com/video/107841260",
      videoType: "vimeo",
      year: 2014,
      thumbnail: "/ordendelacampana.png"
    },
    {
      title: "TN NOTICIAS",
      subtitle: "Emprendedores",
      description: "Destacados como una historia de éxito en el mundo gastronómico argentino, mostrando nuestra pasión y dedicación.",
      videoSrc: "https://www.youtube.com/embed/lftW1ku2yUI",
      videoType: "youtube",
      year: 2019,
      thumbnail: "/TN.png"
    },
    {
      title: "LA CHICA DEL BRUNCH",
      subtitle: "Reseña Gastronómica",
      description: "Una experiencia culinaria única que captura la magia de nuestros helados artesanales.",
      videoSrc: "https://www.instagram.com/lachicadelbrunch/reel/DDnVd33R6ZU/?hl=en",
      videoType: "instagram",
      year: 2022,
      thumbnail: "/chicadelbrunch.png"
    }
  ];
  const handleVideoPlay = (index) => {
    setActiveVideo(index);
  };

  const renderVideo = (feature) => {
    switch (feature.videoType) {
      case 'vimeo':
        return (
          <iframe
            src={`${feature.videoSrc}?autoplay=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={feature.title}
          />
        );
      case 'youtube':
        return (
          <iframe
            src={`${feature.videoSrc}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={feature.title}
          />
        );
      case 'instagram':
        const instagramId = feature.videoSrc.match(/(?:reel|p)\/([^\/\?]+)/)?.[1];
        return (
          <iframe
            src={`https://www.instagram.com/p/${instagramId}/embed/`}
            className="w-full h-full"
            allowTransparency
            allowFullScreen
            scrolling="no"
            frameBorder="0"
            title={feature.title}
          />
        );
      case 'local':
      default:
        return (
          <video
            controls
            autoPlay
            className="w-full h-full"
          >
            <source src={feature.videoSrc} type="video/mp4" />
            Tu navegador no soporta el formato de video.
          </video>
        );
    }
  };

  {
    activeVideo !== null && (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8">
        <div className="relative max-w-4xl w-full aspect-video">
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>Cerrar</span>
            <X className="w-5 h-5" />
          </button>
          {renderVideo(mediaFeatures[activeVideo])}
        </div>
      </div>
    )
  }


  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const video = videoRef.current;
      if (video) {
        video.style.transform = `scale(${1 + (window.scrollY * 0.0003)})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "HELADOS",
      subtitle: "ARTESANALES",
      desc: "Una experiencia única de sabor"
    },
    {
      title: "TRADICIÓN",
      subtitle: "ITALIANA",
      desc: "Recetas auténticas desde 1950"
    },
    {
      title: "SABORES",
      subtitle: "PREMIUM",
      desc: "Ingredientes seleccionados cuidadosamente"
    }
  ];


  return (
    <main className="relative w-full overflow-hidden font-light bg-black">
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'
          }`}>
          <img src="/logoreal.png" alt="Heladería Real Logo" className="w-40 md:w-48" />
        </div>
      </div>

      {/* Hero Section - Versión Final Optimizada */}
      <section className="relative h-[100svh] flex flex-col overflow-hidden bg-black">
        <style jsx>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500&display=swap');
    
    .font-montserrat {
      font-family: 'Montserrat', sans-serif;
    }
    
    .video-overlay {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.4) 50%,
        rgba(0, 0, 0, 0.85) 100%
      );
    }
    
    .btn {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      letter-spacing: 0.2em;
    }
    
    .btn::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(255, 255, 255, 0.6);
      transform: scaleX(0);
      transition: transform 0.3s ease;
      transform-origin: right;
    }
    
    .btn:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    .btn:hover {
      transform: translateY(-2px);
    }
    
    .btn:active {
      transform: translateY(0);
    }

    .appear-animation {
      animation: fadeInUp 1.2s ease forwards;
      opacity: 0;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .staggered-delay-1 {
      animation-delay: 0.3s;
    }
    
    .staggered-delay-2 {
      animation-delay: 0.5s;
    }
    
    .staggered-delay-3 {
      animation-delay: 0.7s;
    }
    
    .staggered-delay-4 {
      animation-delay: 0.9s;
    }
    
    @keyframes smoothBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(5px); }
    }
    
    .animate-smooth-bounce {
      animation: smoothBounce 2s infinite ease-in-out;
    }
    
    .noise-texture {
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
      z-index: 1;
    }
    
    .menu-item {
      position: relative;
      display: inline-block;
    }
    
    .menu-appear {
      animation: menuAppear 0.5s forwards;
      opacity: 0;
      transform: translateY(10px);
    }
    
    @keyframes menuAppear {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .primary-btn {
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    
    .primary-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      z-index: -1;
      transition: all 0.6s ease;
    }
    
    .primary-btn:hover::before {
      left: 100%;
    }
    
    .scroll-indicator {
      width: 26px;
      height: 42px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 15px;
      position: relative;
      display: flex;
      justify-content: center;
      transition: border-color 0.3s ease;
    }
    
    .scroll-indicator:hover {
      border-color: rgba(255, 255, 255, 0.5);
    }
    
    .scroll-dot {
      width: 4px;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      position: absolute;
      top: 10px;
    }
    
    .hamburger-line {
      width: 24px;
      height: 1px;
      background-color: white;
      transition: all 0.3s ease;
      display: block;
    }
    
    .hamburger-container:hover .hamburger-line:nth-child(1) {
      transform: translateY(-2px);
    }
    
    .hamburger-container:hover .hamburger-line:nth-child(3) {
      transform: translateY(2px);
    }
    
    .secondary-btn {
      padding: 0.75rem 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
    }
    
    .secondary-btn:hover {
      border-color: rgba(255, 255, 255, 0.4);
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    @keyframes logoGlow {
      0%, 100% { 
        filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0));
      }
      50% {
        filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.2)); 
      }
    }
    
    .logo-glow {
      animation: logoGlow 4s ease-in-out infinite;
    }
  `}</style>

        {/* Video Background with improved overlay */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover scale-105"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
            style={{
              filter: 'brightness(0.8) contrast(1.1)'
            }}
          >
            <source src="/heladeria-02.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay absolute inset-0" />
          <div className="noise-texture"></div>
        </div>

        {/* Header/Nav - Optimizado */}
        <header className="relative z-10 px-8 py-7 flex justify-between items-center">
          {/* Se eliminó el logo de la corona del nav para evitar redundancia */}
          <div className="w-6"></div> {/* Espacio vacío para mantener la estructura de flexbox */}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hamburger-container text-white hover:text-white/80 transition-colors duration-300 focus:outline-none p-3"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div className="flex flex-col space-y-1.5">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
        </header>

        {/* Fullscreen Menu con mejor usabilidad */}
        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-400 ease-in-out flex items-center justify-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-7 right-8 text-white hover:text-white/80 transition-colors duration-300 focus:outline-none p-3"
            aria-label="Cerrar menú"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <nav className="font-montserrat">
            <ul className="space-y-10 text-center">
              {[
                { name: 'INICIO', id: 'inicio' },
                { name: 'LOCALES', id: 'pedidos' },
                { name: 'HISTORIA', id: 'historia' }
              ].map((item, index) => (
                <li
                  key={item.name}
                  className="menu-appear"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <a
                    href={`#${item.id}`}
                    className="menu-item text-3xl md:text-4xl text-white/90 hover:text-white transition-all duration-300 tracking-wide py-2 btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      if (item.id === 'inicio') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        const element = document.getElementById(item.id);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elementos sutiles de diseño */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Hero Content - Optimizado */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6">
          <div className="flex flex-col items-center space-y-12">
            {/* Logos como título principal - Más prominente */}
            <div className="text-center mb-4 appear-animation">
              <div className="flex flex-col items-center logo-glow">
                <img src="/coronasinbg.png" alt="" className="h-16 sm:h-20 md:h-24 w-auto" />
                <div className="h-1"></div>
                <img src="/real.png" alt="Heladería Real" className="h-14 sm:h-16 md:h-20 w-auto" />
              </div>
              <p className="font-montserrat text-white/70 text-sm tracking-[0.3em] mt-6">DESDE 1963</p>
            </div>

            {/* Botones con mayor espacio y consistencia */}
            <div className="space-y-7">
              {/* Botón principal CTA */}
              <a
                href="#pedidos"
                className="appear-animation staggered-delay-1 primary-btn block text-center border border-white/40 bg-black/30 backdrop-blur-sm hover:bg-black/40 text-white py-4 px-14 font-montserrat text-sm tracking-[0.2em] transition-all duration-300 hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black/50"
                onClick={(e) => {
                  e.preventDefault();
                  const pedidosSection = document.getElementById('pedidos');
                  if (pedidosSection) pedidosSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                HACÉ TU PEDIDO
              </a>

              {/* Botón secundario - Estilo mejorado */}
              <a
                href="#historia"
                className="appear-animation staggered-delay-2 secondary-btn block text-center font-montserrat text-white/80 hover:text-white text-sm tracking-[0.2em] transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  const historiaSection = document.getElementById('historia');
                  if (historiaSection) historiaSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                CONOCENOS
              </a>
            </div>

            {/* Hashtag - Mejor visibilidad */}
            <div className="appear-animation staggered-delay-3 mt-4">
              <h2 className="font-montserrat text-sm tracking-[0.3em] text-white/70 font-light">
                #60AÑOSJUNTOAVOS
              </h2>
            </div>

            {/* Indicador de scroll mejorado - Sin texto */}
            <div className="appear-animation staggered-delay-4 mt-6">
              <a
                href="#historia"
                onClick={(e) => {
                  e.preventDefault();
                  const historiaSection = document.getElementById('historia');
                  if (historiaSection) historiaSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center text-white/60 hover:text-white/80 transition-all duration-300"
                aria-label="Desplazarse hacia abajo para ver más"
              >
                <div className="scroll-indicator">
                  <div className="scroll-dot animate-smooth-bounce"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Sección Historia Completa - Versión optimizada con mejoras UX/UI */}
      <section id="historia" className="relative py-16 sm:py-24 lg:py-32 bg-[#EFEBE2] overflow-hidden">
        <style jsx>{`
    /* Importación de fuentes optimizada con display=swap para mejor LCP */
    @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');

    .vintage-title {
      font-family: 'Bodoni Moda', serif;
      letter-spacing: 0.15em;
      line-height: 1.1;
    }

    @keyframes mauvePink {
      0%, 100% { 
        background-position: 0% 50%;
        opacity: 0.9;
      }
      50% { 
        background-position: 100% 50%;
        opacity: 1;
      }
    }

    .mauve-shine {
      background: linear-gradient(
        45deg,
        #825A54 0%,
        #A67F78 25%,
        #825A54 50%,
        #A67F78 75%,
        #825A54 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: mauvePink 6s ease-in-out infinite;
    }

    .retro-pattern {
      background-image: radial-gradient(#825A54 1px, transparent 1px);
      background-size: 40px 40px;
      opacity: 0.04;
      animation: patternFloat 20s linear infinite;
    }

    @keyframes patternFloat {
      0% { background-position: 0 0; }
      100% { background-position: 40px 40px; }
    }

    .vintage-frame {
      position: relative;
      padding: clamp(12px, 3vw, 24px);
      background: rgba(255, 255, 255, 0.25);
      border: 1px solid rgba(130, 90, 84, 0.15);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(2px);
    }

    .vintage-frame::before {
      content: '';
      position: absolute;
      inset: 6px;
      border: 1px solid rgba(130, 90, 84, 0.1);
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .vintage-frame:hover::before {
      inset: 8px;
      border-color: rgba(130, 90, 84, 0.2);
    }

    .vintage-ornament {
      position: absolute;
      width: clamp(20px, 4vw, 30px);
      height: clamp(20px, 4vw, 30px);
      border: 2px solid rgba(130, 90, 84, 0.2);
      transform: rotate(45deg);
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .vintage-frame:hover .vintage-ornament {
      border-color: rgba(130, 90, 84, 0.3);
      transform: rotate(225deg);
    }

    .old-photo {
      filter: sepia(0.20) contrast(1.05) brightness(0.95);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: filter;
    }

    .old-photo:hover {
      filter: sepia(0.10) contrast(1.1) brightness(1);
    }

    .carousel-slide {
      opacity: 0;
      transform: scale(1.05) translateX(10px);
      transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .carousel-slide.active {
      opacity: 1;
      transform: scale(1) translateX(0);
      position: relative;
      z-index: 2;
    }

    .carousel-btn {
      opacity: 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(130, 90, 84, 0.15);
      backdrop-filter: blur(4px);
      transform: scale(0.9);
      will-change: transform, opacity;
    }

    .vintage-frame:hover .carousel-btn {
      opacity: 0.8;
      transform: scale(1);
    }

    .carousel-btn:hover {
      opacity: 1 !important;
      background: rgba(130, 90, 84, 0.25);
    }

    .carousel-btn:focus-visible {
      outline: 2px solid rgba(130, 90, 84, 0.5);
      outline-offset: 2px;
    }

    .carousel-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(130, 90, 84, 0.3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .carousel-dot.active {
      background-color: rgba(130, 90, 84, 0.8);
      transform: scale(1.2);
    }

    .carousel-dot:hover:not(.active) {
      transform: scale(1.1);
      background-color: rgba(130, 90, 84, 0.5);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .fade-in-up {
      opacity: 0;
      animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: opacity, transform;
    }

    .delay-200 { animation-delay: 0.2s; }
    .delay-400 { animation-delay: 0.4s; }
    
    .prose-vintage p {
      transition: transform 0.3s ease;
    }
    
    .prose-vintage p:hover {
      transform: translateX(4px);
    }
    
    .blockquote-custom {
      position: relative;
      overflow: hidden;
    }
    
    .blockquote-custom::before {
      content: '"';
      position: absolute;
      top: -15px;
      left: -5px;
      font-size: 6rem;
      font-family: 'Bodoni Moda', serif;
      color: rgba(130, 90, 84, 0.1);
      z-index: 0;
    }
    
    /* Optimizaciones para accesibilidad y responsive design */
    @media (prefers-reduced-motion: reduce) {
      .fade-in-up, .carousel-slide, .vintage-ornament, .mauve-shine, .retro-pattern {
        animation: none !important;
        transition: opacity 0.5s ease !important;
      }
    }
  `}</style>

        {/* Capas de fondo */}
        <div className="absolute inset-0 bg-[#EFEBE2]"></div>
        <div className="absolute inset-0 retro-pattern"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#825A54]/15 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          {/* Título de la sección corregido para ser 100% responsive */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 fade-in-up w-full">
            {/* Etiqueta "Desde 1963" con líneas decorativas */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
              <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-[#825A54]/25"></div>
              <span className="text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] text-[#825A54] vintage-title uppercase">
                Desde 1963
              </span>
              <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-[#825A54]/25"></div>
            </div>

            {/* Títulos principales con efecto de resplandor - Corregido para centrado perfecto */}
            <div className="relative inline-block">
              <h2 className="vintage-title text-[clamp(2.5rem,8vw,5rem)] sm:text-[clamp(3rem,10vw,6rem)] md:text-[clamp(3rem,12vw,8rem)] text-[#664540] tracking-wide leading-[0.9] whitespace-nowrap">
                NUESTRA
              </h2>
              <h2 className="vintage-title text-[clamp(3rem,9vw,5.5rem)] sm:text-[clamp(3.5rem,11vw,7rem)] md:text-[clamp(3.5rem,13vw,9rem)] mauve-shine tracking-wide leading-[0.9] whitespace-nowrap">
                HISTORIA
              </h2>
              <div className="absolute left-0 right-0 bottom-[-10px] h-px mx-auto w-[80%] bg-gradient-to-r from-transparent via-[#825A54]/40 to-transparent transition-transform duration-300 ease-out hover:scale-x-[1.05]"></div>
            </div>
          </div>

          {/* Contenido principal con grid responsivo y espaciado mejorado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-start">
            {/* Texto de la historia con micro-interacciones y formato mejorado */}
            <div className="space-y-6 sm:space-y-8 fade-in-up delay-200 prose-vintage">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#664540] mx-1 font-['Poppins',sans-serif] font-light">
                Desde 1963, nuestra heladería mantiene viva la tradición artesanal en Campana, Buenos Aires.{" "}
                <span className="italic font-medium text-[#825A54]">Santiago Inchausti</span> trajo consigo técnicas y sabores que siguen deleitando a nuestros clientes.
              </p>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#664540] mx-1 font-['Poppins',sans-serif] font-light">
                El <span className="italic font-medium text-[#825A54]">equilibrio entre tradición</span> e innovación nos ha permitido crecer mientras mantenemos
                la <span className="italic font-medium text-[#825A54]">esencia artesanal</span> que nos caracteriza desde nuestros inicios en Campana.
              </p>

              <blockquote className="border-l-2 border-[#825A54]/40 pl-4 sm:pl-6 pt-4 pb-2 mx-1 blockquote-custom bg-[#825A54]/5 rounded-r-lg">
                <p className="text-base sm:text-lg md:text-xl text-[#664540] italic font-['Poppins',sans-serif] font-light relative z-10">
                  "El helado artesanal no es solo un postre, es un momento de felicidad que se comparte."
                </p>
                <footer className="text-[#664540]/80 mt-3 sm:mt-4 relative z-10">
                  <p className="font-bold text-[#664540] text-base sm:text-lg font-['Poppins',sans-serif]">Santiago Inchausti</p>
                  <p className="text-xs sm:text-sm text-[#825A54] font-['Poppins',sans-serif] tracking-wide uppercase">Fundador</p>
                </footer>
              </blockquote>
            </div>

            {/* Carrusel de fotos con controles mejorados y optimización de rendimiento */}
            <div className="relative fade-in-up delay-400">
              <div className="vintage-frame max-w-2xl mx-auto">
                {/* Ornamentos decorativos con transiciones suaves */}
                <div className="vintage-ornament top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="vintage-ornament top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
                <div className="vintage-ornament bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></div>
                <div className="vintage-ornament bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>

                {/* Imágenes del carrusel optimizadas para rendimiento */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className={`carousel-slide ${currentHistorySlide === index ? 'active' : ''}`}
                      aria-hidden={currentHistorySlide !== index}>
                      <img
                        src={`/vintage${index + 1}.png`}
                        alt={`Imagen histórica de nuestra heladería (${1963 + index * 5})`}
                        className="w-full h-full object-cover old-photo"
                        loading={index === 0 ? "eager" : "lazy"}
                        width="800"
                        height="600"
                      />
                    </div>
                  ))}
                </div>

                {/* Leyenda de las fotos con mejor contraste */}
                <div className="text-center p-2 sm:p-3 mt-3 sm:mt-4 bg-white/20 backdrop-blur-sm rounded-sm">
                  <p className="text-[#664540] italic text-xs sm:text-sm tracking-wide font-['Poppins',sans-serif]">
                    Imágenes históricas de nuestra tradición heladera (1963-1980)
                  </p>
                </div>

                {/* Controles del carrusel con mejor accesibilidad */}
                <button
                  onClick={prevHistorySlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center carousel-btn focus:outline-none"
                  aria-label="Ver imagen anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#664540" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  onClick={nextHistorySlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center carousel-btn focus:outline-none"
                  aria-label="Ver imagen siguiente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#664540" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                {/* Indicadores del carrusel con mejor interactividad */}
                <div className="flex justify-center gap-3 sm:gap-4 mt-4 sm:mt-5" role="tablist">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => goToHistorySlide(index)}
                      className={`carousel-dot ${currentHistorySlide === index ? 'active' : ''} focus:outline-none focus:ring-2 focus:ring-[#825A54]/30`}
                      aria-label={`Ver imagen ${index + 1} de 4`}
                      aria-selected={currentHistorySlide === index}
                      role="tab"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#825A54]/15 to-transparent"></div>
      </section>

      {/* Sección En los Medios - Optimizada por UX/UI Lead */}
      <section className="relative py-24 sm:py-32 bg-[#E7E0D0] overflow-hidden">
        <style jsx>{`
    /* Optimización de fuentes con swap y display optional para mejor CLS */
    @font-face {
      font-family: 'Cormorant Garamond';
      font-style: normal;
      font-weight: 400 600;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/cormorantgaramond/v16/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 300 600;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXo.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    .premium-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      letter-spacing: 0.03em;
      font-weight: 500;
      color: #664540;
    }

    .elegant-text {
      font-family: 'Montserrat', system-ui, sans-serif;
      font-weight: 300;
      color: #664540;
    }

    /* Optimización de SVG inline con URI más compacto */
    .ice-cream-sketch {
      position: absolute;
      width: clamp(300px, 45vw, 600px);
      height: clamp(300px, 45vw, 600px);
      opacity: 0.05;
      top: 0;
      left: 50%;
      transform-origin: center;
      transform: translateX(-50%) translateY(25%);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 160'%3E%3Cpath fill='none' stroke='%23664540' stroke-width='2' stroke-linecap='round' d='M45 70 L60 140 L75 70 M30 70 C30 40 60 20 90 70 M40 50 C50 30 70 30 80 50 M45 40 C55 20 65 20 75 40 M35 60 Q45 55 55 60 Q65 65 75 60 Q85 55 95 60 M50 35 C55 25 65 25 70 35 M55 80 L65 80 M53 90 L67 90 M51 100 L69 100'/%3E%3Ccircle cx='45' cy='45' r='2' fill='%23664540'/%3E%3Ccircle cx='75' cy='50' r='2' fill='%23664540'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: contain;
      z-index: 0;
      will-change: transform;
    }

    .premium-pattern {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(
        circle at center,
        rgba(102, 69, 64, 0.05) 0%,
        transparent 70%
      );
      mix-blend-mode: overlay;
      animation: subtlePulse 8s ease-in-out infinite;
    }

    /* Optimización de animaciones con animaciones más eficientes */
    @keyframes subtlePulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 0.7; }
    }

    .title-glow {
      text-shadow: 0 0 30px rgba(102, 69, 64, 0.1);
    }

    /* Mejora de rendimiento con propiedades de transform específicas */
    .media-card {
      position: relative;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                  background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                  box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateZ(0);
    }

    /* Borde optimizado con mejor rendimiento */
    .media-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1px;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    .media-card:hover {
      transform: translateY(-8px) translateZ(0);
      background: rgba(255, 255, 255, 0.3);
      box-shadow: 
        0 20px 40px -20px rgba(102, 69, 64, 0.3),
        0 0 20px -5px rgba(255, 255, 255, 0.3);
    }

    /* Optimización de las animaciones de brillo */
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .card-shimmer {
      position: relative;
      overflow: hidden;
    }

    .card-shimmer::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transform: translateX(-100%);
      animation: shimmer 3s infinite;
      will-change: transform;
    }

    /* Gradiente optimizado */
    .brown-gradient-text {
      background: linear-gradient(
        135deg,
        #664540 0%,
        #825A54 50%,
        #664540 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: gradientFlow 8s linear infinite;
    }

    @keyframes gradientFlow {
      0% { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }

    /* Transición de botón optimizada */
    .play-button {
      transform: scale(0.95);
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: transform;
    }

    .media-card:hover .play-button {
      transform: scale(1.1) rotate(90deg);
    }

    /* Animación de entrada optimizada */
    @keyframes fadeScale {
      0% {
        opacity: 0;
        transform: scale(0.95) translateY(20px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .fade-scale {
      opacity: 0;
      animation: fadeScale 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: opacity, transform;
    }

    /* Retraso escalonado para entradas animadas */
    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    
    /* Subrayado del título mejorado */
    .title-underline {
      position: relative;
      display: inline-block;
    }
    
    .title-underline::after {
      content: '';
      position: absolute;
      bottom: -0.1em;
      left: 10%;
      width: 80%;
      height: 1.5px;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(102, 69, 64, 0.4) 30%, 
        rgba(102, 69, 64, 0.7) 50%,
        rgba(102, 69, 64, 0.4) 70%, 
        transparent 100%
      );
      transform-origin: center;
      transition: transform 0.3s ease-out;
    }
    
    .title-underline:hover::after {
      transform: scaleX(1.1);
    }
    
    /* Mejores estilos de tipografía */
    .card-title {
      font-family: 'Montserrat', system-ui, sans-serif;
      font-weight: 500;
      letter-spacing: 0.02em;
      color: #664540;
    }
    
    .tag-label {
      font-family: 'Montserrat', system-ui, sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      color: #664540;
    }

    /* Título responsivo optimizado */
    .responsive-title {
      font-size: clamp(2.5rem, 8vw, 6rem);
      line-height: 1.1;
    }

    /* Animación flotante optimizada */
    .floating-element {
      animation: floatAnimation 20s ease-in-out infinite alternate;
      will-change: transform;
    }

    @keyframes floatAnimation {
      0% { transform: rotate(-1deg) translateX(-50%) translateY(25%); }
      100% { transform: rotate(1deg) translateX(-50%) translateY(25%); }
    }
    
    /* Mejoras para accesibilidad */
    @media (prefers-reduced-motion: reduce) {
      .floating-element, .fade-scale, .media-card, .play-button {
        animation: none !important;
        transition: opacity 0.5s ease !important;
      }
      
      .media-card:hover {
        transform: none;
      }
      
      .shimmer::after {
        animation: none !important;
      }
    }
    
    /* Esquema de foco para accesibilidad */
    .focus-ring:focus-visible {
      outline: 2px solid #664540;
      outline-offset: 2px;
    }
    
    /* Preload-hint for hover interaction */
    .card-hover-hint {
      transition: transform 0.3s ease;
    }
    
    .card-hover-hint:hover {
      transform: translateY(-4px);
    }
  `}</style>

        {/* Efectos de fondo */}
        <div className="premium-pattern"></div>

        {/* Figura del helado posicionada detrás del título */}
        <div className="ice-cream-sketch floating-element" aria-hidden="true"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          {/* Encabezado */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 fade-scale">
              <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-transparent via-[#664540]/30 to-transparent"></div>
              <span className="tag-label text-sm sm:text-base tracking-[0.15em] brown-gradient-text">
                PRENSA Y RECONOCIMIENTOS
              </span>
              <div className="h-px w-12 sm:w-16 md:w-20 lg:w-24 bg-gradient-to-r from-transparent via-[#664540]/30 to-transparent"></div>
            </div>

            <div className="title-underline fade-scale delay-1 relative z-20">
              <h2 className="premium-title responsive-title mb-10 sm:mb-12 title-glow">
                EN LOS MEDIOS
              </h2>
            </div>

            <p className="elegant-text text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed fade-scale delay-2 px-4">
              La <span className="font-semibold">excelencia</span> de nuestra <span className="italic">tradición artesanal</span> reconocida por las <span className="font-medium">voces más influyentes</span> del <span className="font-semibold italic">periodismo gastronómico</span>.
            </p>
          </div>

          {/* Grid de reportajes - Optimizado para mejor contraste y accesibilidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {mediaFeatures.map((feature, index) => (
              <div
                key={index}
                className={`media-card card-shimmer rounded-xl overflow-hidden fade-scale delay-${(index % 3) + 1} card-hover-hint`}
              >
                <button
                  onClick={() => handleVideoPlay(index)}
                  className="relative aspect-video w-full overflow-hidden group focus-ring"
                  aria-label={`Ver video: ${feature.title} - ${feature.subtitle}`}
                >
                  <img
                    src={feature.thumbnail}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index < 3 ? "eager" : "lazy"}
                    width="600"
                    height="338"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>

                  {/* Año con mejor contraste */}
                  <div className="absolute top-4 right-4 px-4 py-1.5 bg-[#664540]/80 backdrop-blur-sm border border-white/20 rounded-full">
                    <span className="text-white text-sm tracking-widest font-medium">{feature.year}</span>
                  </div>

                  {/* Play button con mejor interacción */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="play-button bg-[#664540]/80 backdrop-blur-md p-5 sm:p-6 rounded-full border border-white/30 group-hover:border-white/50 transition-all">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </button>

                <div className="p-6 sm:p-8">
                  <span className="inline-block px-3 py-1 bg-[#664540]/10 text-[#664540] font-medium text-sm tracking-wider rounded-full mb-4 tag-label">
                    {feature.title}
                  </span>

                  <h3 className="card-title text-xl sm:text-2xl mb-4 line-clamp-2">
                    {feature.subtitle}
                  </h3>

                  <p className="elegant-text text-[#664540]/90 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>

                  {/* Botón "Ver más" añadido para mejor UX */}
                  <button
                    className="mt-5 text-sm font-medium text-[#664540] border-b border-[#664540]/30 pb-px hover:border-[#664540] transition-colors focus-ring"
                    onClick={() => handleVideoPlay(index)}
                    aria-label={`Leer más sobre: ${feature.subtitle}`}
                  >
                    Ver reportaje
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de paginación - Añadida para mejor UX */}
          {mediaFeatures.length > 6 && (
            <div className="flex justify-center mt-12 sm:mt-16">
              <nav aria-label="Paginación de reportajes" className="inline-flex items-center">
                <button className="p-2 border border-[#664540]/20 rounded-l-lg text-[#664540] hover:bg-[#664540]/10 focus-ring" aria-label="Página anterior">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button className="px-4 py-2 border-t border-b border-[#664540]/20 bg-[#664540]/10 text-[#664540] font-medium">
                  1
                </button>

                <button className="px-4 py-2 border-t border-b border-[#664540]/20 text-[#664540] hover:bg-[#664540]/5 focus-ring">
                  2
                </button>

                <button className="p-2 border border-[#664540]/20 rounded-r-lg text-[#664540] hover:bg-[#664540]/10 focus-ring" aria-label="Página siguiente">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>

        {/* Modal de video mejorado para accesibilidad */}
        {activeVideo !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-6 lg:p-8 backdrop-blur-lg"
            onClick={() => setActiveVideo(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div
              className="relative w-full max-w-5xl aspect-video bg-black/50 rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors flex items-center gap-3 focus-ring"
                aria-label="Cerrar video"
              >
                <span className="text-sm tracking-[0.2em] uppercase">Cerrar</span>
                <div className="p-2 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </button>

              <div className="overflow-hidden rounded-lg border border-[#664540]/10 shadow-[0_0_50px_rgba(102,69,64,0.15)]">
                <div id="modal-title" className="sr-only">
                  {mediaFeatures[activeVideo].title} - {mediaFeatures[activeVideo].subtitle}
                </div>
                {renderVideo(mediaFeatures[activeVideo])}
              </div>
            </div>
          </div>
        )}
      </section>


      {/* Sección Sabores - Refinamiento premium con enfoque en accesibilidad y rendimiento */}
      <section className="relative py-32 bg-[#DFD0CA] overflow-hidden">
        {/* Estilos optimizados con mejor especificidad y variables para consistencia */}
        <style jsx>{`
    /* Importaciones optimizadas con preconnect para mejorar rendimiento */
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Poppins:wght@300;400;500&display=swap');
    
    :root {
      --color-primary: #4A352E;
      --color-primary-light: rgba(74, 53, 46, 0.9);
      --color-primary-lighter: rgba(74, 53, 46, 0.8);
      --color-primary-subtle: rgba(74, 53, 46, 0.2);
      --color-primary-trace: rgba(74, 53, 46, 0.1);
      --color-primary-ghost: rgba(74, 53, 46, 0.05);
      --color-accent: #825A54;
      --color-bg-main: #DFD0CA;
      --color-bg-light: #E9DDD8;
      --color-bg-card: #F0E6E2;
      --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      --transition-bounce: 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      --font-cinzel: 'Cinzel', serif;
      --font-poppins: 'Poppins', sans-serif;
    }
    
    .section-title {
      font-family: var(--font-cinzel);
      letter-spacing: 0.02em;
      color: var(--color-primary);
    }
    
    .section-subtitle {
      font-family: var(--font-poppins);
      letter-spacing: 0.2em;
      font-weight: 300;
      color: var(--color-primary);
      text-rendering: optimizeLegibility;
    }
    
    .section-text {
      font-family: var(--font-poppins);
      font-weight: 300;
      color: var(--color-primary);
      line-height: 1.6;
      text-rendering: optimizeLegibility;
    }
    
    /* Efectos de mapa de bits para detalles premium */
    .soft-light {
      mix-blend-mode: soft-light;
    }
    
    .overlay {
      mix-blend-mode: overlay;
    }
    
    .frost-panel {
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    
    /* Texturas y efectos visuales optimizados para menor carga */
    .noise-texture {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
      opacity: 0.03;
      will-change: transform; /* Optimiza rendimiento */
    }

    .scribble-line {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 5, 50 10 T 100 10' stroke='%234A352E' fill='none' stroke-width='0.3' stroke-linecap='round'/%3E%3C/svg%3E");
      opacity: 0.08;
      will-change: transform; /* Optimiza rendimiento */
    }

    /* Animaciones refinadas y optimizadas */
    @keyframes gentleFloat {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }

    @keyframes subtleRotate {
      0% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
      100% { transform: rotate(-2deg); }
    }
    
    .floating-element {
      animation: gentleFloat 8s ease-in-out infinite;
      will-change: transform;
    }
    
    .rotating-element {
      animation: subtleRotate 24s linear infinite;
      will-change: transform;
    }
    
    .stat-card {
      transition: transform var(--transition-bounce), 
                  background-color var(--transition-smooth);
      backface-visibility: hidden; /* Mejora rendering */
    }
    
    .stat-card:hover {
      transform: translateY(-5px) scale(1.02);
      background-color: rgba(255, 255, 255, 0.15);
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in-element {
      opacity: 0;
      animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      will-change: opacity, transform;
    }
    
    /* Delays en cascada más finos */
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .delay-700 { animation-delay: 0.7s; }
    .delay-800 { animation-delay: 0.8s; }
    
    .image-container {
      position: relative;
      overflow: hidden;
      border-radius: 0.5rem;
      transform: translateZ(0); /* Fuerza aceleración GPU */
    }
    
    .image-container::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, 
                 rgba(223, 208, 202, 0.2), 
                 transparent 10%, 
                 transparent 90%, 
                 rgba(223, 208, 202, 0.2));
      pointer-events: none;
      z-index: 1;
    }
    
    .text-outline {
      -webkit-text-stroke: 1px rgba(74, 53, 46, 0.08);
      text-stroke: 1px rgba(74, 53, 46, 0.08);
      color: transparent;
    }

    .brown-text {
      background: linear-gradient(135deg, #664540 0%, #825A54 50%, #664540 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    /* Nuevo efecto de hover para transiciones de imágenes */
    .carousel-image {
      transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }
    
    .image-container:hover .carousel-image {
      transform: scale(1.04);
    }
    
    /* Mejoras en la accesibilidad de controles */
    .carousel-control {
      transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .carousel-control:hover {
      background-color: #fff;
      transform: scale(1.1);
    }
    
    .carousel-control:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    .carousel-indicator {
      transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .carousel-indicator:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }
    
    /* Mejora accesibilidad para enlaces */
    .download-link:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 4px;
    }
    
    /* Transición mejorada para el efecto de barra en párrafos */
    .paragraph-bar {
      transition: height 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
  `}</style>

        {/* Capas de fondo optimizadas para mejor composición */}
        <div className="absolute inset-0 noise-texture" aria-hidden="true"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#DFD0CA] via-[#DFD0CA] to-[#E9DDD8]" aria-hidden="true"></div>

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A352E]/10 to-transparent" aria-hidden="true"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A352E]/10 to-transparent" aria-hidden="true"></div>

        {/* Elementos decorativos mejorados */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-extralight text-outline whitespace-nowrap pointer-events-none select-none opacity-70" style={{ letterSpacing: '-0.02em' }} aria-hidden="true">
          SABORES
        </div>

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-extralight text-outline whitespace-nowrap pointer-events-none select-none opacity-10 blur-sm" style={{ letterSpacing: '-0.02em', transform: 'translate(-50%, -48%)' }} aria-hidden="true">
          SABORES
        </div>

        <div className="absolute top-1/4 right-1/4 w-3 h-3 border border-[#4A352E]/10 rounded-full floating-element" aria-hidden="true"></div>
        <div className="absolute bottom-1/3 left-1/5 w-3 h-3 border border-[#4A352E]/10 rounded-full floating-element" style={{ animationDelay: '-1s' }} aria-hidden="true"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-[#4A352E]/10 rounded-full floating-element" style={{ animationDelay: '-2s' }} aria-hidden="true"></div>

        <div className="absolute top-1/2 left-12 w-24 h-12 scribble-line rotating-element" aria-hidden="true"></div>
        <div className="absolute bottom-1/3 right-16 w-32 h-12 scribble-line rotating-element" style={{ animationDelay: '-10s' }} aria-hidden="true"></div>

        {/* Contenedor principal con mejor estructura semántica */}
        <div className="container mx-auto px-6 relative z-10">
          <header className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 fade-in-element">
              <div className="h-px w-10 bg-[#4A352E]/20"></div>
              <span className="inline-block text-sm tracking-[0.3em] text-[#4A352E]/80 section-subtitle">
                TRADICIÓN
              </span>
              <div className="h-px w-10 bg-[#4A352E]/20"></div>
            </div>

            <h2 className="section-title text-5xl lg:text-6xl tracking-wider mb-6 fade-in-element delay-200">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A352E] to-[#4A352E]/90">
                NUESTROS SABORES
              </span>
            </h2>

            <p className="section-text text-xl text-[#4A352E]/90 max-w-xl mx-auto leading-relaxed fade-in-element delay-400">
              Descubre nuestra selección de helados artesanales italianos,
              elaborados con ingredientes naturales de la más alta calidad.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Carousel de sabores con estética premium y motion design refinado */}
            <div className="relative group fade-in-element delay-600">
              <div
                className="absolute -inset-4 border border-[#4A352E]/8 -rotate-1 
            group-hover:rotate-0 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                aria-hidden="true"
              ></div>
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-[#F0E6E2]/40 to-transparent rotate-1 
            group-hover:rotate-0 transition-transform duration-700 opacity-0 group-hover:opacity-100 blur-sm"
                aria-hidden="true"
              ></div>

              <div className="image-container relative aspect-[4/3] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow duration-700">
                <div
                  className="absolute inset-0 opacity-10 group-hover:opacity-5 transition-opacity duration-500
              bg-gradient-to-b from-[#664540]/20 to-[#664540]/30"
                  aria-hidden="true"
                ></div>

                <div
                  className="absolute inset-0 border border-[#4A352E]/10 scale-[0.98] opacity-0 
              group-hover:scale-[0.99] group-hover:opacity-100 transition-all duration-500 rounded-lg"
                  aria-hidden="true"
                ></div>

                {/* Carousel de imágenes con atributos de accesibilidad */}
                <div
                  className="relative w-full h-full overflow-hidden"
                  role="region"
                  aria-roledescription="carousel"
                  aria-label="Galería de sabores de helados"
                >
                  <div
                    className="flex h-full transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentHistorySlide * 100}%)` }}
                  >
                    <div className="flex-shrink-0 w-full h-full">
                      <img
                        src="/flawor1.jpg"
                        alt="Helado artesanal de vainilla con toques de Madagascar"
                        className="w-full h-full object-cover carousel-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-shrink-0 w-full h-full">
                      <img
                        src="/flawor2.jpg"
                        alt="Helado artesanal de chocolate con trozos de cacao puro"
                        className="w-full h-full object-cover carousel-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-shrink-0 w-full h-full">
                      <img
                        src="/flawor3.jpg"
                        alt="Helado artesanal de fresa con frutos naturales"
                        className="w-full h-full object-cover carousel-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-shrink-0 w-full h-full">
                      <img
                        src="/flawor4.jpg"
                        alt="Helado artesanal de pistacho con nueces sicilianas"
                        className="w-full h-full object-cover carousel-image"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Controles del carousel mejorados para accesibilidad */}
                  <button
                    onClick={prevHistorySlide}
                    className="carousel-control absolute top-1/2 left-5 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 md:opacity-60 group-hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none"
                    aria-label="Ver sabor anterior"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A352E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={nextHistorySlide}
                    className="carousel-control absolute top-1/2 right-5 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 md:opacity-60 group-hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none"
                    aria-label="Ver siguiente sabor"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A352E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>

                  {/* Indicadores elegantes tipo línea de tiempo */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-4" role="tablist">
                    {[...Array(4)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToHistorySlide(index)}
                        className="group relative transition-all duration-300 carousel-indicator h-6 flex items-center focus:outline-none"
                        aria-label={`Ver sabor ${index + 1}`}
                        aria-selected={currentHistorySlide === index}
                        role="tab"
                      >
                        <div className="w-8 h-px bg-white/40 group-hover:bg-white/80 transition-all duration-300"></div>

                        <div className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-white transition-all duration-500 origin-left
                    ${currentHistorySlide === index ? 'w-full' : 'w-0'}`}></div>

                        <div className={`absolute -top-6 left-0 text-xs text-white/0 transition-all duration-300 tracking-wider transform 
                    ${currentHistorySlide === index ? 'text-white/90 translate-y-0' : 'translate-y-2'}`}>
                          {`0${index + 1}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón de catálogo claramente clickeable */}
              <div className="mt-8 text-center fade-in-element delay-700">
                <a
                  href="/sabores-catalogo.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link group relative inline-flex items-center px-8 py-3 bg-[#F0E6E2] hover:bg-[#E9DDD8] border border-[#4A352E]/15 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                  aria-label="Descargar catálogo completo de sabores en PDF"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#825A54]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" aria-hidden="true"></div>

                  <div className="relative flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:shadow group-hover:scale-105 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4A352E"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-y-0.5"
                        aria-hidden="true"
                      >
                        <path d="M12 3v12"></path>
                        <path d="m8 11 4 4 4-4"></path>
                        <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"></path>
                      </svg>
                    </div>

                    <div className="flex-auto text-left">
                      <h3 className="section-title text-sm text-[#4A352E] tracking-wider uppercase">Catálogo completo</h3>
                      <p className="section-text text-xs text-[#4A352E]/70 mt-1">Todos nuestros sabores en detalle</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Información del Foodtruck mejorada para legibilidad */}
            <div className="relative z-10 fade-in-element delay-500">
              <div className="max-w-xl">
                <div
                  className="absolute -left-8 top-0 w-1 h-32 bg-gradient-to-b from-[#4A352E]/5 via-[#4A352E]/20 to-transparent"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute -left-4 top-40 w-8 h-8 border border-[#4A352E]/15 rounded-full floating-element"
                  style={{ animationDelay: '-3s' }}
                  aria-hidden="true"
                ></div>

                <span className="relative inline-block text-sm tracking-[0.3em] text-[#4A352E]/80 mb-6 section-subtitle group">
                  <span className="relative z-10 group-hover:text-[#4A352E] transition-colors duration-300">EXPERIENCIA MÓVIL</span>
                  <div
                    className="absolute top-1/2 -right-12 w-8 h-px bg-[#4A352E]/30 group-hover:w-16 
                transition-all duration-500"
                    aria-hidden="true"
                  ></div>
                </span>

                <h3 className="section-title text-4xl md:text-5xl mb-8 tracking-wide leading-tight">
                  NUESTRO FOODTRUCK
                  <br />
                  PARA TUS EVENTOS
                </h3>

                <div className="space-y-6 mb-12 relative">
                  <div
                    className="absolute -left-4 top-0 w-px h-full bg-gradient-to-b from-transparent via-[#4A352E]/20 to-transparent"
                    aria-hidden="true"
                  ></div>

                  <p className="section-text text-lg text-[#4A352E]/90 leading-relaxed pl-6 relative group">
                    <span
                      className="paragraph-bar absolute left-0 top-0 w-1 h-0 bg-[#664540] group-hover:h-full"
                      aria-hidden="true"
                    ></span>
                    Nuestro foodtruck está equipado con todo lo necesario para servir los mismos
                    helados artesanales que encontrás en nuestras tiendas, manteniendo la misma calidad
                    y tradición que nos caracteriza desde 1963.
                  </p>

                  <p className="section-text text-lg text-[#4A352E]/90 leading-relaxed pl-6 relative group">
                    <span
                      className="paragraph-bar absolute left-0 top-0 w-1 h-0 bg-[#664540] group-hover:h-full"
                      aria-hidden="true"
                    ></span>
                    Una experiencia única para eventos corporativos, bodas, cumpleaños y ferias gastronómicas.
                    Llevamos nuestra tradición hasta donde la necesites.
                  </p>

                  {/* Tarjetas de estadísticas con diseño elevado y microinteracciones */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 pt-8">
                    <div
                      className="stat-card px-6 py-5 rounded-lg cursor-default relative overflow-hidden group/stat bg-gradient-to-br from-[#F0E6E2]/70 to-[#F0E6E2]/30 backdrop-blur-sm"
                      role="presentation"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"
                        aria-hidden="true"
                      ></div>
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A352E]/10 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-[#4A352E]/10 via-transparent to-transparent"></div>

                      <span className="block text-5xl font-light mb-3 relative z-10 section-title">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#664540] via-[#825A54] to-[#664540]">20+</span>
                      </span>
                      <span className="text-sm tracking-wider text-[#4A352E]/90 relative z-10 section-subtitle">SABORES<br />DISPONIBLES</span>

                      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full border border-[#4A352E]/5 opacity-0 group-hover/stat:opacity-100 transition-all duration-700 delay-100"></div>
                    </div>

                    <div
                      className="stat-card px-6 py-5 rounded-lg cursor-default relative overflow-hidden group/stat bg-gradient-to-br from-[#F0E6E2]/70 to-[#F0E6E2]/30 backdrop-blur-sm"
                      role="presentation"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"
                        aria-hidden="true"
                      ></div>
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4A352E]/10 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-[#4A352E]/10 via-transparent to-transparent"></div>

                      <span className="block text-5xl font-light mb-3 relative z-10 section-title">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#664540] via-[#825A54] to-[#664540]">100%</span>
                      </span>
                      <span className="text-sm tracking-wider text-[#4A352E]/90 relative z-10 section-subtitle">ARTESANAL<br />ITALIANO</span>

                      <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-full border border-[#4A352E]/5 opacity-0 group-hover/stat:opacity-100 transition-all duration-700 delay-100"></div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Pedidos Section*/}
      <style jsx>{`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500&display=swap');

  .pedidos-title {
    font-family: 'Cinzel', serif;
    letter-spacing: 0.05em;
    color: #f7f7f7;
  }
  
  .pedidos-text {
    font-family: 'Poppins', sans-serif;
    color: #f7f7f7;
  }

  .noise-texture {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.15;
  }

  .text-stroke {
    -webkit-text-stroke: 1px rgba(255,255,255,0.1);
    color: transparent;
  }

  @keyframes floatAnimation {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(1deg); }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.4; filter: blur(10px); }
    50% { opacity: 0.6; filter: blur(15px); }
  }

  .hover-card {
    background: linear-gradient(to right, transparent 50%, rgba(255,255,255,0.03) 50%);
    background-size: 200% 100%;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-card:hover {
    background-position: -100% 0;
  }
  
  .card-glow {
    transition: all 0.5s ease;
  }
  
  .group:hover .card-glow {
    box-shadow: 0 0 30px 5px rgba(255,255,255,0.05);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
  }
  
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  
  .hover-scale {
    transition: transform 0.3s ease;
  }
  
  .hover-scale:hover {
    transform: scale(1.03);
  }
  
  .btn-glow {
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease;
  }
  
  .btn-glow::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .btn-glow:hover::before {
    opacity: 1;
  }
  
  .btn-line {
    position: relative;
  }
  
  .btn-line::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 1px;
    background: white;
    transition: width 0.4s ease;
  }
  
  .btn-line:hover::after {
    width: 100%;
  }
  
  .hover-glow {
    transition: text-shadow 0.3s ease;
  }
  
  .hover-glow:hover {
    text-shadow: 0 0 8px rgba(255,255,255,0.4);
  }
  
  @keyframes subtlePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  .subtle-pulse {
    animation: subtlePulse 4s ease-in-out infinite;
  }
  
  .ice-cream-icon {
    position: absolute;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M65 30c0-8.3-6.7-15-15-15s-15 6.7-15 15c0 8.3 6.7 15 15 15 0 0-15 40-15 40h30c0 0-15-40-15-40 8.3 0 15-6.7 15-15z' fill='white'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    pointer-events: none;
  }
  
  .location-image {
    height: 180px;
    object-fit: cover;
    border-radius: 0.5rem;
    opacity: 0.8;
    transition: all 0.4s ease;
    filter: grayscale(20%) contrast(110%);
  }
  
  .group:hover .location-image {
    opacity: 1;
    filter: grayscale(0%) contrast(120%);
    transform: scale(1.02);
  }
  
  .image-overlay {
    background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
  }
  
  .location-badge {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    transition: all 0.3s ease;
  }
  
  .group:hover .location-badge {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.3);
  }
  
  @keyframes shine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .shine-effect {
    position: relative;
    overflow: hidden;
  }
  
  .shine-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    background-size: 200% 100%;
    animation: shine 5s infinite linear;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .group:hover .shine-effect::after {
    opacity: 1;
  }
  
  .call-button {
    position: relative;
    transition: all 0.3s ease;
    overflow: hidden;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
  }
  
  .call-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: all 0.6s ease;
  }
  
  .call-button:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.3);
  }
  
  .call-button:hover::before {
    left: 100%;
  }
`}</style>

      <section id="pedidos" className="relative py-32 bg-[#44444C] overflow-hidden">
        {/* Texturas y fondos */}
        <div className="absolute inset-0 noise-texture" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#44444C] via-[#44444C] to-[#3a3a41]" />

        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full filter blur-[100px] animate-[pulseGlow_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full filter blur-[100px] animate-[pulseGlow_4s_ease-in-out_infinite_delay-2s]" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full filter blur-[80px] animate-[pulseGlow_6s_ease-in-out_infinite_delay-3s]" />

        {/* Texto decorativo de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-light text-stroke whitespace-nowrap pointer-events-none select-none opacity-[0.07] subtle-pulse">
          GELATO
        </div>

        {/* Íconos de helado decorativos */}
        <div className="ice-cream-icon absolute top-1/4 left-1/5 w-20 h-20 rotate-12 animate-[floatAnimation_4s_ease-in-out_infinite_delay-1s]" />
        <div className="ice-cream-icon absolute bottom-1/3 right-1/4 w-16 h-16 -rotate-6 animate-[floatAnimation_5s_ease-in-out_infinite_delay-0.5s]" />
        <div className="ice-cream-icon absolute top-2/3 left-1/3 w-12 h-12 rotate-45 animate-[floatAnimation_4.5s_ease-in-out_infinite_delay-2s]" />

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 fade-in-up">
            <span className="inline-block text-sm tracking-[0.3em] text-white/60 mb-6 font-light pedidos-text">
              ELEGÍ TU ZONA
            </span>
            <h2 className="pedidos-title text-6xl lg:text-7xl tracking-wider font-light mb-6 relative inline-block">
              HACÉ TU PEDIDO
              <span className="absolute -bottom-3 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></span>
            </h2>
            <p className="text-xl text-white/70 max-w-xl mx-auto font-light pedidos-text fade-in-up delay-200">
              Seleccioná la sucursal más cercana y hacé tu pedido <span className="font-medium text-white/90">directamente por teléfono</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
  {/* Sucursal 1: Campana Rocca (ahora primero) */}
  <div className="group relative fade-in-up delay-100 hover-scale">
    {/* Card Background */}
    <div className="absolute inset-0 border border-white/10 -rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />
    <div className="absolute inset-0 border border-white/10 rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />

    {/* Main Card */}
    <div className="relative overflow-hidden border border-white/20 backdrop-blur-sm rounded-lg bg-white/5 hover-card shine-effect">
      {/* Location Image */}
      <div className="relative w-full">
        <img src="rocca.jpg" alt="Sucursal Campana Rocca" className="w-full location-image" />
        <div className="absolute inset-0 image-overlay"></div>
        <div className="absolute top-4 left-4 py-1 px-3 rounded-full text-xs location-badge">
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <span className="block text-sm tracking-[0.2em] text-white/40 mb-2 pedidos-text">SUCURSAL</span>
        <h3 className="text-3xl mb-5 font-light pedidos-title hover-glow">CAMPANA ROCCA</h3>

        <div className="space-y-4 mb-6">
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <MapPin className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">Av. Ing. Agustín Rocca 201, Campana</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Clock className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">12:00 - 01:30</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Phone className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">03489 43-2304</span>
          </p>
        </div>

        {/* Call to Action */}
        <a
          href="tel:+5492314322304"
          className="call-button w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white/80 hover:text-white mt-4 group/btn"
        >
          <span className="pedidos-text font-medium tracking-wide">PEDIR AHORA</span>
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  </div>

  {/* Sucursal 2: Rivadavia (ahora segundo y nombre cambiado) */}
  <div className="group relative fade-in-up delay-200 hover-scale">
    {/* Card Background */}
    <div className="absolute inset-0 border border-white/10 -rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />
    <div className="absolute inset-0 border border-white/10 rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />

    {/* Main Card */}
    <div className="relative overflow-hidden border border-white/20 backdrop-blur-sm rounded-lg bg-white/5 hover-card shine-effect">
      {/* Location Image */}
      <div className="relative w-full">
        <img src="rivadavia.jpg" alt="Sucursal Rivadavia" className="w-full location-image" />
        <div className="absolute inset-0 image-overlay"></div>
        <div className="absolute top-4 left-4 py-1 px-3 rounded-full text-xs location-badge">
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <span className="block text-sm tracking-[0.2em] text-white/40 mb-2 pedidos-text">SUCURSAL</span>
        <h3 className="text-3xl mb-5 font-light pedidos-title hover-glow">RIVADAVIA</h3>

        <div className="space-y-4 mb-6">
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <MapPin className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">Av. Rivadavia 573, Campana</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Clock className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">12:00 - 00:00</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Phone className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">03489 43-8655</span>
          </p>
        </div>

        {/* Call to Action */}
        <a
          href="tel:+5492314388655"
          className="call-button w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white/80 hover:text-white mt-4 group/btn"
        >
          <span className="pedidos-text font-medium tracking-wide">PEDIR AHORA</span>
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  </div>

  {/* Sucursal 3: Zárate (sigue siendo tercero) */}
  <div className="group relative fade-in-up delay-300 hover-scale">
    {/* Card Background */}
    <div className="absolute inset-0 border border-white/10 -rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />
    <div className="absolute inset-0 border border-white/10 rotate-1 transition-transform duration-500 group-hover:rotate-0 card-glow rounded-lg" />

    {/* Main Card */}
    <div className="relative overflow-hidden border border-white/20 backdrop-blur-sm rounded-lg bg-white/5 hover-card shine-effect">
      {/* Location Image */}
      <div className="relative w-full">
        <img src="zarate.jpg" alt="Sucursal Zárate" className="w-full location-image" />
        <div className="absolute inset-0 image-overlay"></div>
        <div className="absolute top-4 left-4 py-1 px-3 rounded-full text-xs location-badge">
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-6 lg:p-8">
        <span className="block text-sm tracking-[0.2em] text-white/40 mb-2 pedidos-text">SUCURSAL</span>
        <h3 className="text-3xl mb-5 font-light pedidos-title hover-glow">ZÁRATE</h3>

        <div className="space-y-4 mb-6">
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <MapPin className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">Rómulo Noya 800, Zárate</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Clock className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">12:00 - 01:00</span>
          </p>
          <p className="text-white/70 flex items-start gap-3 pedidos-text group/item">
            <Phone className="w-5 h-5 mt-1 text-white/40 group-hover/item:text-white/60 transition-colors duration-300" />
            <span className="group-hover/item:text-white/90 transition-colors duration-300">03487 44-2871</span>
          </p>
        </div>

        {/* Call to Action */}
        <a
          href="tel:+5492314428711"
          className="call-button w-full flex items-center justify-center gap-3 py-3 rounded-lg text-white/80 hover:text-white mt-4 group/btn"
        >
          <span className="pedidos-text font-medium tracking-wide">PEDIR AHORA</span>
          <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" />
        </a>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  </div>
</div>

          {/* Mensaje informativo adicional */}
          <div className="text-center mt-16 fade-in-up delay-400">
            <p className="text-white/50 text-sm pedidos-text max-w-2xl mx-auto">
              Los pedidos se hacen solamente por teléfono. Para una mejor experiencia, te recomendamos llamar con anticipación.
            </p>
          </div>
        </div>

        {/* Elementos decorativos flotantes */}
        <div className="absolute top-1/4 left-10 w-3 h-3 border border-white/20 rounded-full animate-[floatAnimation_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-3 h-3 border border-white/20 rounded-full animate-[floatAnimation_4s_ease-in-out_infinite_delay-2s]" />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-white/20 rounded-full animate-[floatAnimation_3s_ease-in-out_infinite]" />
      </section>
      {/* Footer Simplificado */}
      <footer className="relative bg-gradient-to-b from-black to-[#111111] text-white py-12 border-t border-white/10 overflow-hidden">
        {/* Estilos esenciales */}
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
          
          .footer-title {
            font-family: 'Cinzel', serif;
            letter-spacing: 0.05em;
          }
          
          .footer-text {
            font-family: 'Poppins', sans-serif;
            font-weight: 300;
          }
          
          .noise-texture {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.03;
            pointer-events: none;
          }
          
          .line-hover {
            position: relative;
          }
          
          .line-hover::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background-color: white;
            transition: width 0.3s ease;
          }
          
          .line-hover:hover::after {
            width: 100%;
          }
          
          .social-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background-color: rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
          }
          
          .social-btn:hover {
            background-color: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
          }
          
          .divider {
            height: 1px;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          .pulse-heart {
            animation: pulse 1.5s infinite;
            display: inline-block;
          }
        `}</style>

        {/* Fondo simple */}
        <div className="noise-texture"></div>

        {/* Contenido simplificado */}
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Columna 1: Acerca de */}
            <div>
              <h3 className="text-xl tracking-wider footer-title mb-4">HELADERÍA REAL</h3>
              <p className="text-white/70 leading-relaxed footer-text">
                Tradición heladera artesanal en Campana desde 1963. Sabores auténticos elaborados con pasión y los mejores ingredientes.
              </p>
            </div>

            {/* Columna 2: Sucursales */}
            <div>
              <h4 className="text-lg tracking-wider mb-4 footer-title">SUCURSALES</h4>
              <ul className="space-y-3 text-white/70 footer-text">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-white/40" />
                  <span>Av. Rivadavia 573, Campana</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-white/40" />
                  <span>Av. Ing. Agustín Rocca 201, Campana</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1 text-white/40" />
                  <span>Rómulo Noya 800, Zárate</span>
                </li>
              </ul>
            </div>

            {/* Columna 3: Contacto y redes */}
            <div>
              <h4 className="text-lg tracking-wider mb-4 footer-title">CONTACTO</h4>
              <div className="mb-4">
                <a href="tel:+5492314388655" className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors duration-300 mb-2 footer-text">
                  <Phone className="w-4 h-4" />
                  <span className="line-hover">03489 43-8655</span>
                </a>
                <a href="mailto:info@heladeriareal.com.ar" className="flex items-center gap-2 text-white/70 hover:text-white/90 transition-colors duration-300 footer-text">
                  <Mail className="w-4 h-4" />
                  <span className="line-hover">info@heladeriareal.com.ar</span>
                </a>
              </div>

              <div className="flex gap-3 mt-5">
                <a
                  href="https://instagram.com/heladeriareal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/80" />
                </a>
                <a
                  href="https://facebook.com/heladeriareal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://wa.me/5491134388655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="WhatsApp"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright con créditos OSS */}
          <div className="divider mb-6"></div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs footer-text">
            <div>
              <p>© 2025 Heladería Real. Todos los derechos reservados.</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2">
                <a href="#" className="text-white/50 hover:text-white/80 transition-colors duration-300 line-hover">Términos</a>
                <span>•</span>
                <a href="#" className="text-white/50 hover:text-white/80 transition-colors duration-300 line-hover">Privacidad</a>
              </p>

              <p className="flex items-center gap-1.5">
                Hecho con <span className="text-red-500 pulse-heart">♥</span> por
                <a
                  href="https://ossweb.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors duration-300 line-hover"
                >
                  OSS Digital
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;