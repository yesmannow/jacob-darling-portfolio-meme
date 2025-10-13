import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, Share2, Mail, ExternalLink } from "lucide-react";
import "./Resume.css";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies?: string[];
}

interface Education {
  degree: string;
  school: string;
  year: string;
  details?: string;
}

const Resume: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("experience");

  const experience: Experience[] = [
    {
      id: "graston",
      company: "Graston Technique",
      role: "Director of Marketing & Communications",
      period: "2016 - Present",
      location: "Indianapolis, IN",
      description: "Lead comprehensive marketing strategy and technical infrastructure for global healthcare brand serving 30,000+ practitioners.",
      achievements: [
        "Orchestrated complete brand transformation including new visual identity, messaging framework, and digital ecosystem",
        "Built and deployed 4 custom web applications (clinical decision support, pricing tools, ROI calculators) using vanilla JavaScript",
        "Designed and implemented HubSpot CRM architecture with 15+ automated workflows managing 50,000+ contacts",
        "Increased organic search traffic 300% through technical SEO and content strategy",
        "Reduced marketing technology costs 40% while improving functionality through consolidation and custom builds",
        "Manage $500K+ annual marketing budget across digital advertising, content, events, and technology"
      ],
      technologies: ["HubSpot", "WordPress", "JavaScript", "Google Analytics", "ActiveCampaign", "Photoshop", "Canva"]
    },
    {
      id: "pike",
      company: "Pike Medical Consultants",
      role: "Marketing Manager",
      period: "2014 - 2016",
      location: "Indianapolis, IN",
      description: "Led integrated marketing for healthcare consulting agency serving urgent care and primary care practices.",
      achievements: [
        "Built and launched PrimaryCare Indy and UrgentCare Indy websites driving 10,000+ patient visits",
        "Managed Google Ads campaigns with $100K+ annual budget across multiple client accounts",
        "Designed print collateral, outdoor advertising, and seasonal email campaigns",
        "Created brand identities and logo designs for healthcare clients",
        "Coordinated marketing strategy across web, paid media, email, and traditional channels"
      ],
      technologies: ["WordPress", "Google Ads", "Email Marketing", "Adobe Creative Suite", "SEO"]
    },
    {
      id: "early",
      company: "Early Career Marketing",
      role: "Marketing Coordinator",
      period: "2012 - 2014",
      location: "Indianapolis, IN",
      description: "Launched marketing career learning to stretch budgets, design visuals, and prove ROI when few believed marketing was measurable.",
      achievements: [
        "Executed multi-channel campaigns with limited budgets, maximizing ROI through creativity and testing",
        "Developed skills in graphic design, copywriting, and analytics",
        "Built foundation in data-driven decision making and performance measurement",
        "Managed vendor relationships and project timelines"
      ],
      technologies: ["Basic CRM", "Email Platforms", "Social Media", "Design Tools"]
    }
  ];

  const education: Education[] = [
    {
      degree: "Bachelor of Science in Marketing",
      school: "Indiana University",
      year: "2012",
      details: "Focus on Marketing Strategy and Consumer Behavior"
    }
  ];

  const skills = {
    "Marketing Strategy": 95,
    "Marketing Automation": 90,
    "CRM Architecture": 85,
    "JavaScript/Web Development": 80,
    "SEO & Analytics": 90,
    "Graphic Design": 75,
    "Content Strategy": 85,
    "Project Management": 90
  };

  const handleDownload = () => {
    window.open("/resume/jacob-darling-resume.pdf", "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Jacob Darling - Resume",
        text: "Check out Jacob Darling's resume - Marketing Strategist & Systems Architect",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Jacob Darling - Resume");
    const body = encodeURIComponent(`I'd like to share this resume with you:\n\n${window.location.href}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <main className="resume-page">
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="resume-header">
          <motion.h1 
            className="page-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Professional Resume
          </motion.h1>
          <motion.p 
            className="page-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Marketing Strategist & Systems Architect
          </motion.p>

          <motion.div 
            className="resume-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="action-btn primary"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download PDF
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 size={20} />
              Share
            </motion.button>
            <motion.button
              className="action-btn secondary"
              onClick={handleEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Email
            </motion.button>
          </motion.div>
        </header>
      </motion.section>

      {/* Stats Overview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="resume-stats">
          <div className="stat-card">
            <motion.div 
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              9+
            </motion.div>
            <p className="stat-label">Years Experience</p>
          </div>
          <div className="stat-card">
            <motion.div 
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              30K+
            </motion.div>
            <p className="stat-label">Practitioners Served</p>
          </div>
          <div className="stat-card">
            <motion.div 
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              14+
            </motion.div>
            <p className="stat-label">Case Studies</p>
          </div>
          <div className="stat-card">
            <motion.div 
              className="stat-number"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              4+
            </motion.div>
            <p className="stat-label">Custom Apps Built</p>
          </div>
        </div>
      </motion.section>

      {/* Section Navigation */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div className="section-nav">
          {["experience", "skills", "education"].map((section) => (
            <motion.button
              key={section}
              className={`section-btn ${activeSection === section ? "active" : ""}`}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      {activeSection === "experience" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="experience-section">
            <h2>Professional Experience</h2>
            {experience.map((job, index) => (
              <motion.div
                key={job.id}
                className="experience-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="job-header">
                  <div className="job-title-group">
                    <h3>{job.role}</h3>
                    <h4>{job.company}</h4>
                  </div>
                  <div className="job-meta">
                    <span className="period">{job.period}</span>
                    <span className="location">{job.location}</span>
                  </div>
                </div>

                <p className="job-description">{job.description}</p>

                <div className="achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {job.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                {job.technologies && (
                  <div className="technologies">
                    <h5>Technologies Used:</h5>
                    <div className="tech-tags">
                      {job.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills Section */}
      {activeSection === "skills" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="skills-section">
            <h2>Core Competencies</h2>
            <div className="skills-grid">
              {Object.entries(skills).map(([skill, level], index) => (
                <motion.div
                  key={skill}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill}</span>
                    <span className="skill-percentage">{level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${level}%` }}
                      transition={{ duration: 1, delay: index * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Education Section */}
      {activeSection === "education" && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="education-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="education-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3>{edu.degree}</h3>
                <h4>{edu.school}</h4>
                <p className="edu-year">{edu.year}</p>
                {edu.details && <p className="edu-details">{edu.details}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Download CTA */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="resume-cta">
          <h3>Interested in working together?</h3>
          <p>Download my full resume or get in touch to discuss opportunities.</p>
          <div className="cta-buttons">
            <motion.button
              className="cta-btn primary"
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={20} />
              Download Full Resume
            </motion.button>
            <Link to="/contact">
              <motion.button
                className="cta-btn secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                Contact Me
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default Resume;
