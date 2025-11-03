import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../animations/AnimatedSection';

interface ClientLogo {
  name: string;
  logo: string;
  alt: string;
  website?: string;
  industry: string;
}

const clientLogos: ClientLogo[] = [
  {
    name: "Graston Technique",
    logo: "/images/clients/graston-logo.svg",
    alt: "Graston Technique Official Logo",
    website: "https://grastontechnique.com",
    industry: "Healthcare Technology"
  },
  {
    name: "Pike Medical",
    logo: "/images/clients/pike-medical-logo.svg",
    alt: "Pike Medical Consultants Logo",
    website: "https://pikemedical.com",
    industry: "Medical Consulting"
  },
  {
    name: "Riley Bennett Egloff LLP",
    logo: "/images/clients/rbe-logo.svg",
    alt: "Riley Bennett Egloff LLP Logo",
    website: "https://rbelaw.com",
    industry: "Legal Services"
  },
  {
    name: "Ultimate Technologies",
    logo: "/images/clients/ultimate-tech-logo.svg",
    alt: "Ultimate Technologies Logo",
    industry: "B2B Software"
  },
  {
    name: "317 BBQ",
    logo: "/images/clients/317-bbq-logo.svg",
    alt: "317 BBQ Restaurant Group Logo",
    industry: "Hospitality"
  },
  {
    name: "Russell Painting",
    logo: "/images/clients/russell-painting-logo.svg",
    alt: "Russell Painting Services Logo",
    industry: "Home Services"
  }
];

const ClientLogoWall: React.FC = () => {
  return (
    <section className="client-logo-wall bear-cave-logo-wall py-20 bg-gradient-to-br from-bear-cave-primary-dark/95 to-bear-cave-slate/20">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-bear-cave-light mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              TRUSTED BY
              <span className="bear-cave-text-gradient"> MARKETING LEADERS</span>
            </motion.h2>
            <motion.p
              className="text-xl text-bear-cave-light/80 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Delivering measurable marketing ROI for CMOs across healthcare, legal, technology, and service industries
            </motion.p>
          </div>

          <div className="logo-grid">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                className="bear-cave-logo-item flex flex-col items-center p-6 rounded-2xl hover:bg-bear-cave-accent-gold/5 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-20 h-16 flex items-center justify-center mb-3">
                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="logo-link w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity"
                    >
                      <img
                        src={client.logo}
                        alt={client.alt}
                        className="bear-cave-client-logo max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={client.logo}
                      alt={client.alt}
                      className="bear-cave-client-logo max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                      loading="lazy"
                    />
                  )}
                </div>
                <h3 className="text-bear-cave-light font-semibold text-sm text-center mb-1 group-hover:text-bear-cave-accent-gold transition-colors">
                  {client.name}
                </h3>
                <p className="text-bear-cave-light/60 text-xs text-center">
                  {client.industry}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="trust-stats mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bear-cave-metric p-8 rounded-2xl text-center">
              <div className="bear-cave-metric-number text-4xl md:text-5xl font-extrabold mb-3">30,000+</div>
              <div className="text-bear-cave-light/70 text-lg">Users Served</div>
              <div className="text-bear-cave-light/50 text-sm mt-1">Across all platforms</div>
            </div>
            <div className="bear-cave-metric p-8 rounded-2xl text-center">
              <div className="bear-cave-metric-number text-4xl md:text-5xl font-extrabold mb-3">400+</div>
              <div className="text-bear-cave-light/70 text-lg">Marketing Automations</div>
              <div className="text-bear-cave-light/50 text-sm mt-1">Successfully deployed</div>
            </div>
            <div className="bear-cave-metric p-8 rounded-2xl text-center">
              <div className="bear-cave-metric-number text-4xl md:text-5xl font-extrabold mb-3">85%</div>
              <div className="text-bear-cave-light/70 text-lg">Average ROI Increase</div>
              <div className="text-bear-cave-light/50 text-sm mt-1">Within 6 months</div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClientLogoWall;