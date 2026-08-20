import React, { Component } from 'react';
import './contact.css';
import fbIcon from '../../assets/facebook.png';
import igIcon from '../../assets/insta.png';
import emailIcon from '../../assets/email.png';
import linkIcon from '../../assets/linkedin.png';
import Magnetic from '../Magnetic/magnetic';
import Reveal from '../Reveal/reveal';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: '',
            status: '',
            error: '',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
            status: '',
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, email, message } = this.state;

        if (!name.trim() || !email.trim() || !message.trim()) {
            this.setState({ error: 'Please fill in your name, email, and message.' });
            return;
        }

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        window.location.href = `mailto:hazelannecandelaria91@gmail.com?subject=${subject}&body=${body}`;
        this.setState({
            status: 'Your email app should open with the message ready to send.',
            name: '',
            email: '',
            message: '',
        });
    };

    render() {
        const { name, email, message, status, error } = this.state;

        return (
            <section className="contactPage">
                <div id="contact">
                    <Reveal>
                        <p className="sectionEyebrow">Contact / 04</p>
                        <h2 className="contactTitle">
                            Let’s make
                            <span> something unforgettable.</span>
                        </h2>
                        <p className="contactText">
                            Got a project, internship, or idea? Drop a message and I’ll get back to you.
                        </p>
                    </Reveal>

                    <form className="contactForm" onSubmit={this.handleSubmit} noValidate>
                        <label className="srOnly" htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="name"
                            placeholder="Your name"
                            value={name}
                            onChange={this.handleChange}
                            autoComplete="name"
                        />
                        <label className="srOnly" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="email"
                            placeholder="Email address"
                            value={email}
                            onChange={this.handleChange}
                            autoComplete="email"
                        />
                        <label className="srOnly" htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            className="msg"
                            name="message"
                            rows="5"
                            placeholder="Tell me about the idea..."
                            value={message}
                            onChange={this.handleChange}
                        />
                        {error && <p className="formAlert error">{error}</p>}
                        {status && <p className="formAlert success">{status}</p>}
                        <Magnetic>
                            <button type="submit" className="submitBtn">
                                Send message
                            </button>
                        </Magnetic>
                    </form>

                    <div className="links">
                        <a href="mailto:hazelannecandelaria91@gmail.com" aria-label="Email">
                            <img src={emailIcon} alt="" className="link" />
                        </a>
                        <a
                            href="https://www.facebook.com/hazel.candelaria.39"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <img src={fbIcon} alt="" className="link" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/hazel-anne-candelaria-72b243230/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                        >
                            <img src={linkIcon} alt="" className="link" />
                        </a>
                        <a
                            href="https://www.instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <img src={igIcon} alt="" className="link" />
                        </a>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
