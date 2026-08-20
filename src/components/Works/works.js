import React, { useState } from 'react';
import './works.css';
import Reveal from '../Reveal/reveal';

import proj1 from '../../assets/proj1.png';
import proj2 from '../../assets/proj2.png';
import proj3 from '../../assets/proj3.png';
import proj4 from '../../assets/proj4.png';
import proj5 from '../../assets/proj5.png';
import proj6 from '../../assets/proj6.png';

const projects = [
    {
        img: proj2,
        title: 'IRMS',
        desc: 'Incident Report Management System for Central Luzon State University — secure campus incident reporting, tracking, and CLSU account sign-in built with HTML, CSS, JavaScript, and CodeIgniter.',
        tags: ['HTML', 'CSS', 'JavaScript', 'CodeIgniter'],
        year: '2026',
    },
    {
        img: proj6,
        title: 'ERMS',
        desc: 'Emergency Response Management System for CLSU — one-tap SOS alerts, live device location, and emergency tracking numbers built with HTML, CSS, JavaScript, and CodeIgniter.',
        tags: ['HTML', 'CSS', 'JavaScript', 'CodeIgniter'],
        year: '2026',
    },
    {
        img: proj3,
        title: 'FeelAtHome Hotel',
        desc: 'Hotel booking site with room listings, navigation, and a staycation-focused landing page.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2024',
    },
    {
        img: proj1,
        title: 'TasteOfHome',
        desc: 'Food blog admin dashboard for managing posts, categories, and the public site.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2024',
    },
    {
        img: proj5,
        title: 'YouTube Clone',
        desc: 'Video platform UI with search, video cards, and a responsive content grid.',
        tags: ['HTML', 'CSS'],
        year: '2024',
    },
    {
        img: proj4,
        title: 'CLSU OVPAA Portal',
        desc: 'Academic affairs website for Central Luzon State University with news and campus content.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2023',
    },
];

const filters = ['All', 'HTML', 'CSS', 'JavaScript', 'CodeIgniter'];

const Works = () => {
    const [filter, setFilter] = useState('All');

    const visible =
        filter === 'All'
            ? projects
            : projects.filter((project) => project.tags.includes(filter));

    const handleMove = (event) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateX = (0.5 - y) * 9;
        const rotateY = (x - 0.5) * 11;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        card.style.setProperty('--mx', `${x * 100}%`);
        card.style.setProperty('--my', `${y * 100}%`);
    };

    const handleLeave = (event) => {
        event.currentTarget.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    };

    return (
        <section id="works">
            <Reveal>
                <p className="sectionEyebrow">Selected Work / 03</p>
                <h2 className="workTitle">Projects with Presence.</h2>
                <p className="workText">
                    Web work that mixes function, visuals, and user experience — from campus systems built with <strong>HTML, CSS, JavaScript, and CodeIgniter</strong> to interactive front-end interfaces.
                </p>
            </Reveal>

            <div className="filterRow">
                {filters.map((item) => (
                    <button
                        key={item}
                        type="button"
                        className={`filterChip ${filter === item ? 'is-active' : ''}`}
                        onClick={() => setFilter(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="workImgs">
                {visible.map((project, index) => (
                    <Reveal key={project.title} delay={index * 70}>
                        <article
                            className="workCard"
                            onMouseMove={handleMove}
                            onMouseLeave={handleLeave}
                        >
                            <span className="workIndex">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            <img src={project.img} alt={project.title} className="workImg" />
                            <div className="workOverlay">
                                <div className="workMeta">
                                    <h3>{project.title}</h3>
                                    <span>{project.year}</span>
                                </div>
                                <p>{project.desc}</p>
                                <div className="workTags">
                                    {project.tags.map((tag) => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default Works;
