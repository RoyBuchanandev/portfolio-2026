import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";
import { useLanguage } from "../context/LanguageContext";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const Skills = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    const skillsData = [
        {
            category: t('skills.categories.frontend'),
            icon: "⚛️",
            skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Redux"]
        },
        {
            category: t('skills.categories.backend'),
            icon: "🔧",
            skills: t('skills.items.backend')
        },
        {
            category: t('skills.categories.database'),
            icon: "💾",
            skills: t('skills.items.database')
        },
        {
            category: t('skills.categories.cloud'),
            icon: "☁️",
            skills: t('skills.items.cloud')
        },
        {
            category: t('skills.categories.testing'),
            icon: "✅",
            skills: t('skills.items.testing')
        },
        {
            category: t('skills.categories.tools'),
            icon: "🛠️",
            skills: ["Scrum", "Jira", "VS Code", "Figma", "Postman"]
        }
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        // Animate cards on scroll
        cardsRef.current.forEach((card, index) => {
            if (!card) return;

            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.95
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <section
            id="habilidades"
            ref={sectionRef}
            className="min-h-screen w-full bg-black text-white px-4 py-32"
            aria-label="Technical Skills"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full">
                        {t('skills.tag')}
                    </p>
                    <div className="flex flex-col items-center justify-center mt-4">
                        <AnimatedTitle
                            title={t('skills.title1')}
                            containerClass="text-4xl md:text-5xl font-black text-white tracking-tighter text-center leading-none"
                        />
                        <AnimatedTitle
                            title={t('skills.title2')}
                            containerClass="text-4xl md:text-5xl font-black text-gray-500 tracking-tighter text-center leading-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((item, index) => (
                        <div
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="group bg-black border border-white/10 rounded-lg p-8 hover:border-white/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">{item.icon}</span>
                                <h3 className="text-lg font-semibold text-white tracking-tight">{item.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(item.skills) && item.skills.map((skill, skillIndex) => (
                                    <span
                                        key={skillIndex}
                                        className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-xs text-gray-400 font-mono hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default Skills;
