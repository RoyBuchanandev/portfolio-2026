import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import { TiLocationArrow } from "react-icons/ti";
import { useLanguage } from "../context/LanguageContext";


const ProjectCard = ({ project }) => {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-black border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all duration-300 hover:bg-white/5 h-full flex flex-col cursor-pointer"
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className="text-gray-400 group-hover:text-white transition-colors ml-auto"
                >
                    <TiLocationArrow className="text-xl transform group-hover:rotate-45 transition-transform duration-300" />
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                {project.title}
            </h3>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {project.description}
            </p>

            <div className="mt-auto"></div>
        </a>
    );
};

const Projects = () => {
    const { t } = useLanguage();

    const projects = [
        {
            id: 1,
            title: t('projects.list.p1.title'),
            description: t('projects.list.p1.desc'),
            link: "https://github.com/RoyBuchanandev/RadarDev"
        },
        {
            id: 2,
            title: t('projects.list.p2.title'),
            description: t('projects.list.p2.desc'),
            link: "https://maxiforestieri.com"
        },
        {
            id: 3,
            title: t('projects.list.p3.title'),
            description: t('projects.list.p3.desc'),
            link: "https://heladeriareal.com"
        },
        {
            id: 4,
            title: t('projects.list.p4.title'),
            description: t('projects.list.p4.desc'),
            link: "https://cgarden.com.ar"
        },
        {
            id: 5,
            title: t('projects.list.p5.title'),
            description: t('projects.list.p5.desc'),
            link: "https://ossweb.tech"
        },
        {
            id: 6,
            title: t('projects.list.p6.title'),
            description: t('projects.list.p6.desc'),
            link: "https://estilonapoles.com"
        }
    ];

    return (
        <section id="proyectos" className="bg-black py-12 md:py-24 px-4 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-16 gap-6 text-center">
                    <div className="text-center">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-4 inline-block border border-white/20 px-3 py-1 rounded-full">
                            {t('projects.tag')}
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            {t('projects.title1')} <br /> <span className="text-gray-500">{t('projects.title2')}</span>
                        </h2>
                    </div>

                    <p className="text-gray-400 max-w-md text-sm md:text-base mb-2 mx-auto">
                        Una colección de trabajos seleccionados que demuestran mi capacidad para entregar soluciones robustas y escalables para clientes reales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
