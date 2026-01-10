import { useRef, useEffect, memo } from "react";
import gsap from "gsap";

// Componente SocialLink separado y optimizado
const SocialLink = memo(({ href, label, icon, external = false }) => {
  const linkRef = useRef(null);

  useEffect(() => {
    // Configurar animaciones hover para los enlaces
    const link = linkRef.current;

    if (!link) return;

    const enterAnimation = () => {
      gsap.to(link, {
        y: -2,
        color: "#3b82f6", // Tailwind blue-500
        duration: 0.2,
        ease: "power1.out"
      });
    };

    const leaveAnimation = () => {
      gsap.to(link, {
        y: 0,
        color: "#9ca3af", // Tailwind gray-400
        duration: 0.2,
        ease: "power1.out"
      });
    };

    link.addEventListener("mouseenter", enterAnimation);
    link.addEventListener("mouseleave", leaveAnimation);

    // Limpieza para evitar memory leaks
    return () => {
      link.removeEventListener("mouseenter", enterAnimation);
      link.removeEventListener("mouseleave", leaveAnimation);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      aria-label={label}
      className="text-gray-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
});

SocialLink.displayName = "SocialLink";

// SVG icons como componentes para mejorar rendimiento
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Footer = ({
  companyDescription = "Desarrollador Full-Stack especializado en React, Next.js y AWS. Construyendo aplicaciones web escalables con código limpio y tecnologías modernas.",
  logoPath = "/img/logooss.png",
  logoAlt = "Roy Buchanan Developer"
}) => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const contactsRef = useRef(null);
  const copyrightRef = useRef(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    const content = contentRef.current;
    const contacts = contactsRef.current;
    const copyright = copyrightRef.current;

    if (!footer || !logo || !content || !contacts || !copyright) return;

    // Crear una timeline principal para secuenciar todas las animaciones
    const mainTimeline = gsap.timeline({
      defaults: { ease: "power2.out" }
    });

    // Añadir las animaciones a la timeline
    mainTimeline
      .fromTo(
        footer,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
      .fromTo(
        content,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3" // Comenzar ligeramente antes de que termine la animación anterior
      )
      .fromTo(
        contacts,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
      .fromTo(
        copyright,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.1"
      );

    // Configuración y animación del logo
    gsap.set(logo, {
      filter: "grayscale(90%)",
      scale: 0.95
    });

    // Animación inicial del logo (se ejecuta una sola vez)
    gsap.to(logo, {
      filter: "grayscale(0%)",
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
      delay: 0.3
    });

    // Animación suave de "respiración" para el logo
    gsap.to(logo, {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Limpieza para evitar memory leaks
    return () => {
      mainTimeline.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-full bg-black py-16 text-gray-300 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Línea superior sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" aria-hidden="true"></div>

      {/* Formas decorativas */}
      <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-tr from-blue-600/10 to-purple-600/5 blur-2xl" aria-hidden="true"></div>
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/5 to-pink-500/5 blur-3xl" aria-hidden="true"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo con la ruta correcta y referencia para animación */}
        <div className="flex justify-center mb-8">
          <img
            ref={logoRef}
            src={logoPath}
            alt={logoAlt}
            className="h-auto w-[180px] transition-all duration-300"
            width="180"
            height="60"
            loading="lazy"
          />
        </div>

        <p
          ref={contentRef}
          className="text-sm mb-10 max-w-lg mx-auto font-light leading-relaxed"
        >
          {companyDescription}
        </p>

        {/* Información de contacto */}
        <div
          ref={contactsRef}
          className="flex flex-wrap justify-center items-center gap-8 mb-8"
        >
          <SocialLink
            href="mailto:roybuchanan1996@gmail.com"
            label="roybuchanan1996@gmail.com"
            icon={<EmailIcon />}
          />

          <SocialLink
            href="https://github.com/RoyBuchanandev"
            label="@RoyBuchanandev"
            icon={<GithubIcon />}
            external={true}
          />
        </div>

        <div className="border-t border-gray-800/50 my-6 max-w-sm mx-auto"></div>

        <div
          ref={copyrightRef}
          className="text-xs text-gray-600 flex items-center justify-center"
        >
          <span>© {year} Roy Buchanan. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);