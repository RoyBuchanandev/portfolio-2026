import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const ImpactTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación principal
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.from(".impact-title-word", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out"
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Procesamiento del título con HTML
  const processTitle = () => {
    return title.split("<br />").map((line, index) => {
      // Manejamos etiquetas HTML dentro del texto
      let processedLine = line;
      const words = [];
      
      // Dividir en palabras preservando HTML
      let inTag = false;
      let currentWord = "";
      
      for (let i = 0; i < processedLine.length; i++) {
        const char = processedLine[i];
        
        if (char === "<") inTag = true;
        if (char === ">") {
          inTag = false;
          currentWord += char;
          continue;
        }
        
        if (char === " " && !inTag) {
          if (currentWord) words.push(currentWord);
          currentWord = "";
        } else {
          currentWord += char;
        }
      }
      
      if (currentWord) words.push(currentWord);
      
      return {
        lineIndex: index,
        words
      };
    });
  };

  const processedLines = processTitle();

  return (
    <div 
      ref={containerRef} 
      className={clsx("impact-title-container", containerClass)}
    >
      {processedLines.map(({ lineIndex, words }) => (
        <div 
          key={lineIndex} 
          className="impact-title-line"
        >
          {words.map((word, wordIndex) => (
            <span
              key={`${lineIndex}-${wordIndex}`}
              className="impact-title-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImpactTitle;