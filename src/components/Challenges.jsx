import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";

// Datos de los challenges


const ChallengeCard = ({ challenge }) => {
    return (
        <a
            href={challenge.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:bg-white/5 h-full flex flex-col cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest bg-white/10 rounded text-gray-300 border border-white/5">
                    {challenge.type}
                </span>
                <div
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <TiLocationArrow className="text-xl transform group-hover:rotate-45 transition-transform duration-300" />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                {challenge.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {challenge.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {challenge.tech.map((t, i) => (
                    <span key={i} className="text-xs font-mono text-gray-500">
                        #{t}
                    </span>
                ))}
            </div>
        </a>
    );
};

const Challenges = () => {
    const { t } = useLanguage();

    const challenges = [
        {
            id: 1,
            title: t('challenges.list.c1.title'),
            description: t('challenges.list.c1.desc'),
            tech: ["Node.js", "Express", "TypeScript"],
            link: "https://github.com/RoyBuchanandev/backend-challenge",
            type: "Backend"
        },
        {
            id: 2,
            title: t('challenges.list.c2.title'),
            description: t('challenges.list.c2.desc'),
            tech: ["React", "Node.js", "PostgreSQL"],
            link: "https://github.com/RoyBuchanandev/ChallengeSiriusSoftware",
            type: "Fullstack"
        },
        {
            id: 3,
            title: t('challenges.list.c3.title'),
            description: t('challenges.list.c3.desc'),
            tech: ["React", "Tailwind", "Figma"],
            link: "https://github.com/RoyBuchanandev/Challenge-Buchanan-CreativeDog",
            type: "Frontend"
        }
    ];

    return (
        <section className="bg-black py-24 px-4 w-full border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 gap-6 text-center">
                    <div className="text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full">
                            {t('challenges.tag')}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            {t('challenges.title1')} <br /> <span className="text-gray-500">{t('challenges.title2')}</span>
                        </h2>
                    </div>

                    <p className="text-gray-400 max-w-md text-sm md:text-base mb-2 mx-auto">
                        Selección de pruebas técnicas y experimentos de código donde exploro nuevas tecnologías y arquitecturas.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {challenges.map((challenge) => (
                        <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Challenges;
