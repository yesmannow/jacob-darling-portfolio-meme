import React, { useState } from "react";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Implement real form handling
    setSubmitted(true);
  }

  return (
    <main className="contact">
      <h1>Let’s Build Something Smarter.</h1>
      <p>
        If you’re looking to simplify your marketing systems, optimize workflows, or just explore an idea — I’d love to connect.
      </p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows={4} required />
        <select name="type">
          <option value="">Select reason</option>
          <option value="project">Project Inquiry</option>
          <option value="collaboration">Collaboration</option>
          <option value="consultation">Consultation</option>
        </select>
        <button type="submit">Send</button>
      </form>
      {submitted && <div className="confirmation">Thank you! I’ll be in touch soon.</div>}
      <div className="alt-ctas">
        <a className="cta" href="mailto:jacob@example.com">Email Directly</a>
        <a className="cta secondary" href="/resume/jacob-darling-resume.pdf" target="_blank" rel="noopener noreferrer">Download Résumé</a>
        {/* TODO: Add "Schedule a Call" link if you have one */}
        <div className="socials">
          {/* TODO: Add real profile links */}
          <a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://behance.net/" target="_blank" rel="noopener noreferrer">Behance</a>
        </div>
      </div>
      <blockquote>“Systems create freedom — let’s design one that works for you.”</blockquote>
    </main>
  );
};

export default Contact;