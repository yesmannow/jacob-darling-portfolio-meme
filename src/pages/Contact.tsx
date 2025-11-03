import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Linkedin, Github, Send, MessageSquare, User, Building2, Phone, FileText, Globe, Facebook, Youtube } from "lucide-react";

// Simple TikTok icon component since lucide-react doesn't have it
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// SoundCloud icon component
const SoundCloudIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.175 13.5c.352 0 .638-.143.857-.43.219-.286.38-.635.38-1.045 0-.352-.143-.638-.43-.857-.286-.219-.635-.38-1.045-.38-.41 0-.76.161-1.046.38-.287.219-.429.505-.429.857 0 .41.161.76.38 1.046.22.287.505.429.857.429zm2.343 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.286 0 .524-.1.71-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.186-.2-.424-.3-.71-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.714 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm1.715 0c.287 0 .524-.1.711-.3.188-.2.327-.457.327-.771s-.139-.571-.327-.771c-.187-.2-.424-.3-.711-.3-.287 0-.524.1-.711.3-.188.2-.327.457-.327.771s.139.571.327.771c.187.2.424.3.711.3zm2.43 0c.352 0 .638-.143.857-.43.219-.286.38-.635.38-1.045 0-.352-.143-.638-.43-.857-.286-.219-.635-.38-1.045-.38-.41 0-.76.161-1.046.38-.287.219-.429.505-.429.857 0 .41.161.76.38 1.046.22.287.505.429.857.429z"/>
    <path d="M21.165 12.333c-.697 0-1.263.215-1.697.645-.434.43-.651.995-.651 1.697v3.569c0 .697.217 1.263.651 1.697.434.434.999.651 1.697.651.697 0 1.263-.217 1.697-.651.434-.434.651-.999.651-1.697v-3.569c0-.702-.217-1.268-.651-1.697-.434-.43-1-.645-1.697-.645z"/>
  </svg>
);
import AnimatedSection from "../components/animations/AnimatedSection";
import MagneticButton from "../components/interactive/MagneticButton";
// SimpleIcon removed - using Lucide icons for UI elements
import { fadeInUp } from "../utils/animations";
import "./Contact.css";

interface FormData {
  name: string;
  email: string;
  message: string;
  reason: string;
  company?: string;
  phone?: string;
}

const CONTACT_REASONS = [
  { value: "job-opportunity", label: "Job Opportunity", description: "Interested in hiring me" },
  { value: "collaboration", label: "Collaboration", description: "Want to work together" },
  { value: "consulting", label: "Consulting Inquiry", description: "Need marketing expertise" },
  { value: "interview", label: "Interview Request", description: "Would like to interview" },
  { value: "question", label: "General Question", description: "Have a question" },
  { value: "other", label: "Other", description: "Something else" }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    reason: "",
    company: "",
    phone: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track form interactions
  React.useEffect(() => {
    import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
      trackPortfolioEngagement.contactFormStart();
    });
  }, []);

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
        setFormData({ name: "", email: "", message: "", reason: "", company: "", phone: "" });

        // Track successful submission
        import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
          trackPortfolioEngagement.contactFormSubmit(formData.reason || "general");
        });
      } else {
        setError("Failed to send message. Please try again.");
        import("../utils/analytics").then(({ trackPortfolioEngagement }) => {
          trackPortfolioEngagement.contactFormError(result.message || "Unknown error");
        });
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
          <motion.h1 variants={fadeInUp}>Let's Create What Doesn't Exist Yet.</motion.h1>
          <motion.p className="lead" variants={fadeInUp}>
            I'm currently open to new opportunities in marketing leadership and tech integration.
            <br /><br />
            Have a challenge that needs solving? A system that needs building? A campaign that needs optimizing?
            <br /><br />
            Let's discuss how I can drive marketing ROI for your team.
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
                    <label htmlFor="name">
                      <User size={16} className="inline mr-2" />
                      Name *
                    </label>
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
                    <label htmlFor="email">
                      <Mail size={16} className="inline mr-2" />
                      Email *
                    </label>
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
                    <label htmlFor="reason">
                      <MessageSquare size={16} className="inline mr-2" />
                      Reason for Contact *
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a reason...</option>
                      {CONTACT_REASONS.map((reason) => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label} - {reason.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">
                      <Building2 size={16} className="inline mr-2" />
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <Phone size={16} className="inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone (optional)"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">
                      <FileText size={16} className="inline mr-2" />
                      Message *
                    </label>
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

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send size={18} className="inline mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>

            {/* Contact Info & Links */}
            <div className="info-section">
              <div className="info-card">
                <h3>Get In Touch</h3>
                <p>Prefer to reach out directly? Use any of these options:</p>

                <div className="contact-methods">
                  <motion.a
                    href="mailto:hoosierdarling@gmail.com"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Mail size={24} />
                    </span>
                    <div>
                      <strong>Email</strong>
                      <p>hoosierdarling@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="tel:317-443-8091"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Phone size={24} />
                    </span>
                    <div>
                      <strong>Phone</strong>
                      <p>317-443-8091</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://linkedin.com/in/jacobdarling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Linkedin size={24} />
                    </span>
                    <div>
                      <strong>LinkedIn</strong>
                      <p>Connect professionally</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://github.com/yesmannow"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Github size={24} />
                    </span>
                    <div>
                      <strong>GitHub</strong>
                      <p>View my code</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://bearcavemarketing.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Globe size={24} />
                    </span>
                    <div>
                      <strong>Website</strong>
                      <p>bearcavemarketing.com</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.facebook.com/jacob.darling.44227/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Facebook size={24} />
                    </span>
                    <div>
                      <strong>Facebook</strong>
                      <p>Connect on Facebook</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.tiktok.com/@jadarlin?_r=1&_t=ZT-915gl9DL6wX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <TikTokIcon size={24} />
                    </span>
                    <div>
                      <strong>TikTok</strong>
                      <p>@jadarlin</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://soundcloud.com/ottodarling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <SoundCloudIcon size={24} />
                    </span>
                    <div>
                      <strong>SoundCloud</strong>
                      <p>ottodarling</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href="https://www.youtube.com/@jacobthedarling"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="icon">
                      <Youtube size={24} />
                    </span>
                    <div>
                      <strong>YouTube</strong>
                      <p>@jacobthedarling</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="quote-card">
                <blockquote>
                  "Systems create freedom — let's design one that works for you."
                </blockquote>
              </div>

              <div className="cta-card">
                <h3>Want to see my work?</h3>
                <p>Explore my case studies to see measurable business impact and ROI-driven results.</p>
                <Link to="/case-studies" className="btn-secondary">
                  See Case Studies with Measurable Business Impact →
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