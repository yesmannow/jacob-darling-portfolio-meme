import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../animations/AnimatedSection';

interface ClientLogo {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

const clientLogos: ClientLogo[] = [
  {
    name: "Graston Technique",
    logo: "/images/clients/graston-logo.svg",
    alt: "Graston Technique Official Logo",
    website: "https://grastontechnique.com"
  },
  {
    name: "Pike Medical",
    logo: "/images/clients/pike-medical-logo.svg",
    alt: "Pike Medical Consultants Logo",
    website: "https://pikemedical.com"
  },
  {
    name: "Healthcare Systems",
    logo: "/images/clients/healthcare-systems-logo.svg",
    alt: "Healthcare Systems Technology Logo"
  },
  {
    name: "Medical Marketing Co",
    logo: "/images/clients/medical-marketing-logo.svg",
    alt: "Medical Marketing Company Logo"
  },
  {
    name: "Clinical Solutions",
    logo: "/images/clients/clinical-solutions-logo.svg",
    alt: "Clinical Solutions Group Logo"
  },
  {
    name: "Tech Medical",
    logo: "/images/clients/tech-medical-logo.svg",
    alt: "Tech Medical Innovation Logo"
  }
];

const ClientLogoWall: React.FC = () => {
  return (
    <section className="client-logo-wall py-16 bg-card/50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-text mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Trusted by Healthcare & Marketing Leaders
            </motion.h2>
            <motion.p
              className="text-lg text-muted max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Delivering measurable marketing ROI for companies serving millions of users worldwide
            </motion.p>
          </div>

          <div className="logo-grid">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                className="logo-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                {client.website ? (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="logo-link"
                  >
                    <img
                      src={client.logo}
                      alt={client.alt}
                      className="client-logo"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    src={client.logo}
                    alt={client.alt}
                    className="client-logo"
                    loading="lazy"
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="trust-stats mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat-item text-center">
              <div className="stat-number text-3xl md:text-4xl font-bold text-accent mb-2">30,000+</div>
              <div className="stat-label text-muted">Users Served</div>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-3xl md:text-4xl font-bold text-accent mb-2">400+</div>
              <div className="stat-label text-muted">Marketing Automations</div>
            </div>
            <div className="stat-item text-center">
              <div className="stat-number text-3xl md:text-4xl font-bold text-accent mb-2">85%</div>
              <div className="stat-label text-muted">Average ROI Increase</div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>

      <style>{`
        .logo-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          md:grid-template-columns: repeat(3, 1fr);
          lg:grid-template-columns: repeat(6, 1fr);
          gap: 2rem;
          align-items: center;
          justify-items: center;
        }

        .logo-item {
          width: 120px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .logo-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .logo-link:hover {
          opacity: 1;
        }

        .client-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(100%) contrast(0.8);
          transition: all 0.3s ease;
        }

        .logo-item:hover .client-logo {
          filter: grayscale(0%) contrast(1);
        }

        .trust-stats {
          border-top: 1px solid var(--border);
          padding-top: 3rem;
        }

        @media (max-width: 768px) {
          .logo-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .logo-item {
            width: 100px;
            height: 50px;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientLogoWall;