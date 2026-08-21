import React, { Component } from 'react';
import './contact.css';
import fbIcon from '../../assets/facebook.png';
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
            sending: false,
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            error: '',
            status: '',
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, message, sending } = this.state;

        if (sending) return;

        if (!name.trim() || !email.trim() || !message.trim()) {
            this.setState({ error: 'Please fill in your name, email, and message.' });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            this.setState({ error: 'Please enter a valid email address.' });
            return;
        }

        this.setState({ sending: true, error: '', status: '' });

        try {
            const response = await fetch(
                'https://formsubmit.co/ajax/216912552363330b82c56370d7238596',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({
                        Name: name.trim(),
                        Email: email.trim(),
                        Message: message.trim(),
                        _subject: `Portfolio Message from ${name.trim()}`,
                        _replyto: email.trim(),
                        _template: 'table',
                        _captcha: 'false',
                    }),
                }
            );

            const text = await response.text();
            let result = {};
            try {
                result = JSON.parse(text);
            } catch {
                throw new Error('Unable to send message.');
            }

            if (!response.ok || result.success === 'false' || result.success === false) {
                const raw = result.message || 'Unable to send message.';
                if (/activation/i.test(raw)) {
                    throw new Error(
                        'Check Gmail for an email from FormSubmit and click Activate Form. Then send your message again.'
                    );
                }
                throw new Error(raw);
            }

            this.setState({
                status: 'Message sent. I’ll get back to you by email.',
                name: '',
                email: '',
                message: '',
                sending: false,
            });
        } catch (err) {
            this.setState({
                sending: false,
                error: err instanceof Error && err.message
                    ? err.message
                    : 'Message could not be sent. Please try again in a moment.',
            });
        }
    };

    render() {
        const { name, email, message, status, error, sending } = this.state;

        return (
            <section className="contactPage">
                <div id="contact">
                    <Reveal>
                        <p className="sectionEyebrow">Contact / 04</p>
                        <h2 className="contactTitle">
                            Let’s make
                            <span> Something Unforgettable.</span>
                        </h2>
                        <p className="contactText">
                            Got a project, internship, or idea? Fill this in and tap Send Message — it goes straight to my inbox, no new tab.
                        </p>
                    </Reveal>

                    <form className="contactForm" onSubmit={this.handleSubmit} noValidate>
                        <input type="text" name="_honey" className="srOnly" tabIndex="-1" autoComplete="off" />
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
                            <button type="submit" className="submitBtn" disabled={sending}>
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                        </Magnetic>
                    </form>

                    <div className="links">
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=hazelannecandelaria91@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Email Address"
                        >
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
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
