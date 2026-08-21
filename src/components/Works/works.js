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
        desc: 'Incident Report Management System for Central Luzon State University. I built secure campus incident filing, status tracking, and CLSU account sign-in so reports can be submitted, reviewed, and resolved in one place.',
        tags: ['HTML', 'CSS', 'JavaScript', 'CodeIgniter', 'MySQL'],
        year: '2026',
    },
    {
        img: proj6,
        title: 'ERMS',
        desc: 'Emergency Response Management System for CLSU. I developed one-tap SOS alerts, live device location, and emergency tracking numbers so campus responders can act quickly during incidents.',
        tags: ['HTML', 'CSS', 'JavaScript', 'CodeIgniter', 'MySQL'],
        year: '2026',
    },
    {
        img: proj3,
        title: 'FeelAtHome Hotel',
        desc: 'Hotel booking web app with room listings, reservation flow, and a staycation-focused landing page. I handled the full stack so guests can browse rooms and complete bookings through a Laravel backend and MySQL database.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'MySQL'],
        year: '2024',
    },
    {
        img: proj1,
        title: 'TasteOfHome',
        desc: 'Food blog platform with a public site and an admin dashboard for managing posts, categories, and published recipes. I built the interface and Laravel/MySQL backend that stores and serves all content.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Laravel', 'MySQL'],
        year: '2024',
    },
    {
        img: proj5,
        title: 'YouTube Clone',
        desc: 'Front-end video platform UI inspired by YouTube, with search, video cards, and a responsive content grid. I focused on layout, interaction, and a clean watch-page experience using HTML, CSS, and JavaScript.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2024',
    },
    {
        img: proj4,
        title: 'CLSU OVPAA Portal',
        desc: 'Academic affairs website for Central Luzon State University’s Office of the Vice President for Academic Affairs. I created the pages for news, campus updates, and office information with a responsive HTML, CSS, and JavaScript front end.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        year: '2023',
    },
];

const filters = ['All', 'HTML', 'CSS', 'JavaScript', 'CodeIgniter', 'Laravel', 'MySQL'];

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
                    Selected web work from campus systems to booking platforms and front-end clones — each card covers what I built and the stack behind it.
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
