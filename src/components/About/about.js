import React from 'react';
import './about.css';
import html from '../../assets/html.png';
import css from '../../assets/css.png';
import js from '../../assets/js.png';
import rjs from '../../assets/react.png';
import Reveal from '../Reveal/reveal';
import codeigniter from '../../assets/CI.png';
import laravel from '../../assets/laravel.png';
import mysql from '../../assets/mysql.png';
import ai from '../../assets/ai.png';

const skills = [
    {
        img: html,
        name: 'HTML',
        text: 'Semantic, accessible markup that stays structured and easy to maintain.',
    },
    {
        img: css,
        name: 'CSS',
        text: 'Responsive layouts with Flexbox and Grid, focused on rhythm and polish.',
    },
    {
        img: js,
        name: 'JavaScript',
        text: 'Interactive interfaces through events, motion, and thoughtful DOM updates.',
    },
    {
        img: rjs,
        name: 'ReactJS',
        text: 'Reusable component systems with clear state and scalable UI structure.',
    },
    {
        img: laravel,
        name: 'Laravel',
        text: 'Laravel is a web application framework with expressive, elegant syntax. We\'ve already laid the foundation for you, so you can focus on building an amazing app!',
    },
    {
        img: codeigniter,
        name: 'CodeIgniter',
        text: 'CodeIgniter is a web application framework that is open source and free to use.',
    },
    {
        img: mysql,
        name: 'MySQL',
        text: 'MySQL is a relational database management system (RDBMS) that uses SQL as its query language.',
    },
    {
        img: ai,
        name: 'AI',
        text: 'AI is a technology that is used to create intelligent systems that can learn and make decisions.',
    },
];

const marqueeItems = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Laravel',
    'Web Development',
    'Project Management',
    'PHP',
];

const About = () => {
    return (
        <section id="skills">
            <div className="marquee" aria-hidden="true">
                <div className="marqueeTrack">
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <span key={`${item}-${index}`}>
                            {item} <b>✦</b>
                        </span>
                    ))}
                </div>
            </div>
            <div className="marquee marqueeReverse" aria-hidden="true">
                <div className="marqueeTrack">
                    {[...marqueeItems, ...marqueeItems].map((item, index) => (
                        <span key={`rev-${item}-${index}`}>
                            {item} <b>✦</b>
                        </span>
                    ))}
                </div>
            </div>

            <Reveal className="aboutHead">
                <p className="sectionEyebrow">About / 02</p>
                <h2 className="skillTitle">
                    I Develop Interfaces
                    <span> that feel alive.</span>
                </h2>
            </Reveal>

            <div className="bento">

                {skills.map((skill, index) => (
                    <Reveal key={skill.name} delay={index * 80}>
                        <article className="skillIndiv">
                            <img src={skill.img} alt="" className="skillImg" />
                            <h3>{skill.name}</h3>
                            <p>{skill.text}</p>
                        </article>
                    </Reveal>
                ))}
            </div>
        </section>
    );
};

export default About;
