import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "../components/animations/AnimatedSection";
import TextReveal from "../components/animations/TextReveal";
import ParallaxSection from "../components/animations/ParallaxSection";
import MorphingBlob from "../components/animations/MorphingBlob";
import ClientLogos from "../components/clients/ClientLogos";
import TheGapDiagram from "../components/diagrams/TheGapDiagram";
import VennDiagram from "../components/diagrams/VennDiagram";
import { fadeInUp } from "../utils/animations";
import "./About.css";

interface TimelineNode {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  year: string;
}

const timelineNodes: TimelineNode[] = [
  {
    id: "launchpad",
    title: "The Launchpad",
    subtitle: "My First Marketing Position",
    content: "Learned to stretch budgets, design visuals, and prove ROI when few believed marketing was measurable.",
    year: "Early Career"
  },
  {
    id: "pike-medical",
    title: "Pike Medical Consultants",
    subtitle: "Healthcare Meets Hustle",
    content: "Built PrimaryCare Indy & UrgentCare Indy sites. Ran Google Ads driving thousands of patient visits. Designed logos, outdoor banners, and seasonal email campaigns. Blended brand, web, and patient acquisition into one machine.",
    year: "Agency Experience"
  },
  {
    id: "graston-technique",
    title: "Graston Technique®",
    subtitle: "National Transformation",
    content: "Architected a full-stack marketing system: 400+ CRM automations, AI-powered support reducing tickets by 70%, 'Buy Now, Choose Later' checkout lifting conversions 40%. Mastered strategy + systems at scale.",
    year: "Enterprise Role"
  },
  {
    id: "current-portfolio",
    title: "Current Portfolio",
    subtitle: "Marketing Strategist & Systems Architect",
    content: "Specializing in bridging brand storytelling with technical execution. From AI and automation to SEO and design, I turn abstract goals into revenue-focused ecosystems.",
    year: "Present"
  }
];

const About: React.FC = () => {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    setExpandedNode(expandedNode === nodeId ? null : nodeId);
  };

  return (
    <main className="about-page">
      <AnimatedSection>
        <section className="about-intro">
          <motion.h1 variants={fadeInUp}>About Me</motion.h1>
          
          <motion.div className="intro-content" variants={fadeInUp}>
            <div className="bio-photo-wrapper">
              <motion.img 
                src="/images/bio/bio-photo.jpg" 
                alt="Jacob Darling - Marketing Strategist & Systems Architect"
                className="bio-photo"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </div>
            <div className="intro-text">
              <p className="lead">
                Great marketing ideas often break at the handoff—the critical point where a creative vision meets 
                the complex reality of technical execution. My career has been built to solve this problem.
              </p>
              <p>
                I'm Jacob Darling, a marketing leader who operates as both a brand strategist and a systems architect. 
                On one side, I direct bold rebrands, craft compelling narratives, and launch creative campaigns. 
                On the other, I design and build the underlying technical infrastructure—the CRM logic, automation workflows, 
                and web architecture—that makes those campaigns scalable, measurable, and sustainable.
              </p>
              <p>
                This hybrid approach allows me to create deeply integrated solutions that don't just look good, 
                but function brilliantly. Whether I'm relaunching a national brand or building a custom GPT-powered tool, 
                I thrive on turning abstract goals into powerful, revenue-focused marketing engines.
              </p>
            </div>
          </motion.div>
        </section>
      </AnimatedSection>

      <TheGapDiagram />

      <VennDiagram />

      <AnimatedSection delay={0.2}>
        <section className="philosophy-section">
          <h2>My Philosophy</h2>
          
          <div className="philosophy-quote">
            <blockquote>
              Strategy without architecture is a daydream; architecture without strategy is a machine with no purpose.
            </blockquote>
          </div>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <div className="icon">🏗️</div>
              <h3>Build for the System</h3>
              <p>
                Every component works in concert with the whole for scalability and seamless experience.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">🔄</div>
              <h3>Translate Complexity</h3>
              <p>
                Bridge the gap between creative vision and technical implementation.
              </p>
            </div>

            <div className="philosophy-card">
              <div className="icon">📈</div>
              <h3>Measure & Automate</h3>
              <p>
                Focus on KPIs that drive growth while automating repetitive tasks.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <section className="timeline-section">
          <h2>Career Journey</h2>

          <div className="timeline">
            <div className="timeline-line"></div>

            {timelineNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="timeline-node"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-year">{node.year}</div>

                <button
                  onClick={() => toggleNode(node.id)}
                  className={`timeline-card ${expandedNode === node.id ? 'expanded' : ''}`}
                >
                  <div className="card-header">
                    <div>
                      <h3>{node.title}</h3>
                      <p className="subtitle">{node.subtitle}</p>
                    </div>
                    <svg
                      className="chevron"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <AnimatePresence mode="wait">
                    {expandedNode === node.id && (
                      <motion.div 
                        className="card-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <p>{node.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <section className="volunteering-section">
          <h2>Community & Volunteer Work</h2>
          <p className="section-intro">
            Beyond professional work, I believe in giving back to the community through leadership, 
            creative support, and strategic guidance. Whether leading homeowner associations, 
            supporting local arts, or mentoring students, I apply the same systems-thinking 
            and strategic approach to community initiatives.
          </p>

          <div className="volunteering-grid">
            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="volunteer-icon">🏛️</div>
              <h3>President</h3>
              <h4>School 80 Condominiums HOA</h4>
              <p className="volunteer-period">Oct 2019 - Present · 6+ years</p>
              <p className="volunteer-description">
                Lead governance, financial planning, and community relations for residential 
                condominium association, applying strategic thinking to property management 
                and community building.
              </p>
            </motion.div>

            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="volunteer-icon">🎨</div>
              <h3>Board Member & Marketing Lead</h3>
              <h4>Primary Colours</h4>
              <p className="volunteer-period">2017 - Present · 8+ years</p>
              <p className="volunteer-description">
                Design website and print materials for annual Installation Nation event. 
                Served as Board Member (2018-2019) for this non-profit dedicated to connecting 
                visual artists with their communities through exhibitions and cultural events.
              </p>
            </motion.div>

            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="volunteer-icon">👥</div>
              <h3>Board Member</h3>
              <h4>School 80 Condominiums HOA</h4>
              <p className="volunteer-period">2015 - 2019 · 4 years</p>
              <p className="volunteer-description">
                Served as board member before assuming presidency, contributing to strategic 
                planning, community communications, and operational improvements.
              </p>
            </motion.div>

            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="volunteer-icon">🎓</div>
              <h3>Design Volunteer</h3>
              <h4>Frances W Parker IPS School 56</h4>
              <p className="volunteer-period">2017 · 2 months</p>
              <p className="volunteer-description">
                Designed 12 posters for the school's Situational VALUES project, 
                creating visual materials to reinforce positive character development.
              </p>
            </motion.div>

            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="volunteer-icon">💼</div>
              <h3>Business Mentor</h3>
              <h4>SMART - Anti Bullying at School #96</h4>
              <p className="volunteer-period">2013 · 5 months</p>
              <p className="volunteer-description">
                Guided students in developing business and marketing plan for their 
                anti-bullying program, teaching real-world strategy and planning skills.
              </p>
            </motion.div>

            <motion.div 
              className="volunteer-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <div className="volunteer-icon">⚽</div>
              <h3>Designer</h3>
              <h4>Eastwood Middle School Soccer Team</h4>
              <p className="volunteer-period">2017 - Present · 8+ years</p>
              <p className="volunteer-description">
                Design and print custom shirts for Eastwood Middle School women's soccer team, 
                supporting youth athletics through visual identity.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <ClientLogos />
      </AnimatedSection>

      <AnimatedSection delay={0.6}>
        <section className="cta-section">
          <h2>Let's Build Something Together</h2>
          <p>
            Inspired by structured creativity and system automation, I bring a relentless work ethic 
            and Indiana roots to every project.
          </p>
          <div className="cta-buttons">
            <Link to="/case-studies" className="btn-primary">
              See My Work →
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
};

export default About;