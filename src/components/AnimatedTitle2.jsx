import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle2 = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup animation
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });

      // Simple slide-up & fade-in animation for lines
      titleAnimation.from(
        ".animated-line",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title-container", containerClass)}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="animated-line overflow-hidden"
        >
          <div 
            className="font-inherit"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle2;