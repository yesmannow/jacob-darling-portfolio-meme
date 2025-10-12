import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/animations/AnimatedSection";
import MagneticButton from "../components/interactive/MagneticButton";
import { fadeInUp } from "../utils/animations";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  message: string;
  reason: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    reason: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Using Web3Forms - submissions will go to your email
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b6c0916d-2dba-4faf-933e-fcdd6c683a88",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reason: formData.reason,
          subject: `Portfolio Contact: ${formData.reason || 'General Inquiry'}`,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", reason: "" });
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try emailing directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <AnimatedSection>
        <section className="contact-header">
          <motion.h1 variants={fadeInUp}>Let's Build Something Remarkable</motion.h1>
          <motion.p className="lead" variants={fadeInUp}>
            If you're looking to simplify your marketing systems, optimize workflows, or just explore an idea — I'd love to connect.
          </motion.p>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="contact-content">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="form-section">
              <h2>Send a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. I'll get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="reason">Reason for Contact</label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    >
                      <option value="">Select a reason...</option>
                      <option value="project">Project Inquiry</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="consultation">Consultation</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or idea..."
                      rows={6}
                      required
                    />
                  </div>

                  {error && <div className="error-message">{error}</div>}

                  <button type="submit" className="btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info & Links */}
            <div className="info-section">
              <div className="info-card">
                <h3>Get In Touch</h3>
                <p>Prefer to reach out directly? Use any of these options:</p>

                <div className="contact-methods">
                  <a href="mailto:jacob@jacobdarling.com" className="contact-method">
                    <span className="icon">✉️</span>
                    <div>
                      <strong>Email</strong>
                      <p>jacob@jacobdarling.com</p>
                    </div>
                  </a>

                  <a href="https://linkedin.com/in/jacobdarling" target="_blank" rel="noopener noreferrer" className="contact-method">
                    <span className="icon">💼</span>
                    <div>
                      <strong>LinkedIn</strong>
                      <p>Connect professionally</p>
                    </div>
                  </a>

                  <a href="https://github.com/JdarlingGT" target="_blank" rel="noopener noreferrer" className="contact-method">
                    <span className="icon">💻</span>
                    <div>
                      <strong>GitHub</strong>
                      <p>View my code</p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="quote-card">
                <blockquote>
                  "Systems create freedom — let's design one that works for you."
                </blockquote>
              </div>

              <div className="cta-card">
                <h3>Want to see my work?</h3>
                <p>Explore my case studies to see how I solve real business challenges.</p>
                <Link to="/case-studies" className="btn-secondary">
                  View Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Contact;