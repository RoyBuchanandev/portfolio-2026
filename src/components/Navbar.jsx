import React, { useEffect, useCallback, useRef, useState, memo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// Registro del plugin por fuera del componente para evitar registros duplicados
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}



const SCROLL_THRESHOLD = 10;
const NAV_OFFSET = 100;
const ANIMATION_DURATION = 0.3;
const SCROLL_ANIMATION_DURATION = 0.8;
const EMAIL = "roybuchanan1996@gmail.com";

// Tema del Navbar basado en el scroll
const getNavbarTheme = (scrollY, isMenuOpen) => {
  if (isMenuOpen) return "bg-black/90 backdrop-blur-lg";
  if (scrollY === 0) return "bg-transparent";
  return "bg-black/60 backdrop-blur-sm shadow-xl";
};

// Componente de logo extraído para mejor mantenibilidad
const Logo = memo(() => (
  <a
    href="#"
    className="z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-md px-2 py-1"
    aria-label="Inicio Roy Buchanan"
  >
    <span className="font-bold text-xl tracking-tighter text-white">RB</span>
  </a>
));

// Componente de elemento de navegación extraído
const NavItem = memo(({ item, onNavClick, isActive }) => (
  <a
    href={item.link}
    className={`
      text-white px-3 py-2 rounded-full transition-all duration-300
      hover:bg-white/10 focus:outline-none focus-visible:ring-2
      focus-visible:ring-white flex items-center
      ${isActive ? 'bg-white/20 font-medium' : 'opacity-90'}
    `}
    onClick={(e) => onNavClick(e, item.link)}
    aria-current={isActive ? "page" : undefined}
  >
    <span className="hidden sm:inline mr-1">{item.icon}</span>
    {item.name}
  </a>
));

// Componente para los enlaces de redes sociales
const SocialLink = memo(({ href, icon, label, className }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
      text-white/80 hover:text-white transition-colors flex items-center
      px-3 py-2 rounded-full hover:bg-white/10 focus:outline-none 
      focus-visible:ring-2 focus-visible:ring-white ${className || ''}
    `}
    aria-label={label}
  >
    {icon}
  </a>
));

// Componente para el menú de navegación móvil
const MobileMenu = memo(({ isOpen, items, onNavClick, currentSection, language, toggleLanguage }) => {
  // Ref para el elemento que debería recibir el foco al abrir el menú
  const firstLinkRef = useRef(null);

  // Gestión del foco y eventos de teclado
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      // Dar foco al primer enlace cuando se abre el menú
      setTimeout(() => firstLinkRef.current.focus(), 100);
    }

    // Manejador para cerrar con Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onNavClick(null, null, true);
      }
    };

    // Manejador para clicks fuera del menú
    const handleClickOutside = (e) => {
      const menuElement = document.getElementById('mobile-menu');
      if (isOpen && menuElement && !menuElement.contains(e.target) &&
        !e.target.closest('button[aria-controls="mobile-menu"]')) {
        onNavClick(null, null, true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onNavClick]);

  return (
    <div
      className={`
          fixed inset-0 bg-gradient-to-b from-black/95 to-black/90 z-40 
          flex flex-col p-8 pt-24 transition-all duration-500 ease-in-out
          ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}
        `}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal={isOpen}
      aria-labelledby="mobile-menu-title"
      id="mobile-menu"
    >
      <h2 id="mobile-menu-title" className="sr-only">Menú de navegación</h2>

      <div className="flex flex-col space-y-6">
        {items.map((item, index) => (
          <a
            key={index}
            ref={index === 0 ? firstLinkRef : null}
            href={item.link}
            className={`
                text-white text-xl font-mono flex items-center p-3
                transition-all duration-300 hover:bg-white/10 rounded-lg
                ${currentSection === item.link.substring(1) ? 'bg-white/10 font-medium' : ''}
              `}
            onClick={(e) => onNavClick(e, item.link)}
            aria-current={currentSection === item.link.substring(1) ? "page" : undefined}
          >
            <span className="mr-3 text-2xl" aria-hidden="true">{item.icon}</span>
            {item.name}
          </a>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>
      </div>

      <div className="mt-auto pt-12 border-t border-white/10 mt-8">
        <div className="flex flex-col space-y-4">
          <p className="text-white/60 font-mono text-sm">
            <a
              href={`mailto:${EMAIL}`}
              className="hover:text-white transition-colors inline-flex items-center"
              aria-label="Enviar email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {EMAIL}
            </a>
          </p>
        </div>

        <div className="flex mt-6 space-x-4">
          {/* Social links removed or updated as needed */}
        </div>
      </div>
    </div>
  );
});

// Hook para detectar la sección actual basado en el scroll
function useActiveSection(sections, offset = 100) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset + 50;

      // Encontrar la sección actual basada en la posición de scroll
      const section = sections.find(section => {
        const element = document.querySelector(section.link);
        if (!element) return false;

        const top = element.offsetTop;
        const height = element.offsetHeight;

        return scrollPosition >= top && scrollPosition < top + height;
      });

      setActiveSection(section ? section.link.substring(1) : '');
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar una vez al inicio

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, offset]);

  return activeSection;
}

// Custom hook para la lógica de visibilidad en scroll
function useNavbarVisibility(threshold = 10) {
  const { y: scrollY } = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    if (scrollY === 0) {
      setIsVisible(true);
    } else if (scrollY > lastScroll + threshold) {
      setIsVisible(false);
    } else if (scrollY < lastScroll - threshold) {
      setIsVisible(true);
    }

    setLastScroll(scrollY);
  }, [scrollY, lastScroll, threshold]);

  return { isVisible, scrollY };
}

// Hook personalizado para manejar el scroll suave
function useSmoothScroll() {
  const scrollToSection = useCallback((e, link) => {
    if (!e || !link) return;

    e.preventDefault();

    const element = document.querySelector(link);
    if (element) {
      gsap.to(window, {
        duration: SCROLL_ANIMATION_DURATION,
        scrollTo: {
          y: element.offsetTop - NAV_OFFSET,
          autoKill: true
        },
        ease: "power3.inOut"
      });
    }
  }, []);

  return scrollToSection;
}

// Componente principal de la barra de navegación
const NavBar = () => {
  const { language, toggleLanguage, t } = useLanguage();

  const NAV_ITEMS = React.useMemo(() => [
    { name: t('navbar.about'), link: "#experiencia", icon: "👨‍💻" },
    { name: t('navbar.projects'), link: "#proyectos", icon: "🚀" },
    { name: t('navbar.contact'), link: "#contacto", icon: "📧" }
  ], [t]);

  // Estados
  const [menuOpen, setMenuOpen] = useState(false);

  // Custom hooks
  const { isVisible, scrollY } = useNavbarVisibility(SCROLL_THRESHOLD);
  const scrollToSection = useSmoothScroll();
  const currentSection = useActiveSection(NAV_ITEMS, NAV_OFFSET);

  // Refs
  const navRef = useRef(null);

  // Handlers memoizados
  const toggleMenu = useCallback(() => {
    setMenuOpen(prevState => !prevState);
  }, []);

  const handleNavClick = useCallback((e, link, forceClose = false) => {
    if (forceClose) {
      setMenuOpen(false);
      return;
    }

    setMenuOpen(false);

    // Pequeño retraso para asegurar que el menú móvil se cierre primero
    if (link) {
      setTimeout(() => {
        scrollToSection(e, link);
      }, 100);
    }
  }, [scrollToSection]);

  // Efecto para animar la visibilidad del navbar
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: ANIMATION_DURATION,
        ease: "power3.out"
      });
    }
  }, [isVisible]);

  // Manejo del overflow del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';

    // Cleanup al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <>
      {/* NavBar principal con notificación de skip para accesibilidad */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
      >
        Saltar al contenido principal
      </a>

      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3"
        role="banner"
      >
        <nav
          className={`
            flex items-center justify-between p-3 sm:p-4 rounded-full transition-all duration-300
            ${getNavbarTheme(scrollY, menuOpen)}
          `}
          aria-label="Navegación principal"
        >
          <Logo />

          {/* Links de escritorio */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.name}
                item={item}
                onNavClick={handleNavClick}
                isActive={currentSection === item.link.substring(1)}
              />
            ))}
          </div>

          {/* Selector de idioma y Social Links (Desktop) */}
          <div className="hidden md:flex items-center ml-4">
            <button
              onClick={toggleLanguage}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-all border border-white/10"
              aria-label="Toggle language"
            >
              {language === 'es' ? 'EN' : 'ES'}
            </button>
          </div>

          {/* Botón de menú móvil con iconos perfectamente alineados */}
          <button
            className={`
              md:hidden text-white p-2 rounded-full z-50 transition-all duration-300
              ${menuOpen
                ? 'bg-white/20 hover:bg-white/30'
                : 'bg-black/30 hover:bg-black/50'}
            `}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <IoClose
                className={`absolute w-5 h-5 transition-all duration-300 ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
                aria-hidden={!menuOpen}
                size={20}
              />
              <HiMenuAlt4
                className={`absolute w-5 h-5 transition-all duration-300 ${menuOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}
                aria-hidden={menuOpen}
                size={20}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Menú móvil */}
      <MobileMenu
        isOpen={menuOpen}
        items={NAV_ITEMS}
        onNavClick={handleNavClick}
        currentSection={currentSection}
        language={language}
        toggleLanguage={toggleLanguage}
      />


      {/* Identificador para "skip to content" */}
      <div id="main-content" tabIndex="-1" className="sr-only">Contenido principal comienza aquí</div>
    </>
  );
};

// Exportar componente memoizado para prevenir re-renders innecesarios
export default memo(NavBar);