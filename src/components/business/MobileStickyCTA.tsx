import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const MobileStickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after user scrolls down 500px
      const scrollPosition = window.scrollY;
      if (scrollPosition > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Main Sticky CTA */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {/* Main CTA Button */}
            <motion.button
              onClick={toggleExpanded}
              className={`w-full ${isExpanded ? 'rounded-t-xl' : 'rounded-xl'}
                bear-cave-sticky-cta font-bold py-4 px-6
                shadow-2xl border border-bear-cave-accent-gold/20 relative overflow-hidden group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-bear-cave-accent-gold/80 to-bear-cave-accent-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span className="text-lg">
                  {isExpanded ? 'Close Menu' : 'Schedule Marketing ROI'}
                </span>
                {!isExpanded && (
                  <motion.div
                    className="absolute right-4"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                )}
              </div>
            </motion.button>

            {/* Expanded Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="bg-card rounded-b-xl border-t border-accent/20 shadow-2xl"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="p-4 border-b border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-bear-cave-light">Emerging from Marketing Complexity?</h3>
                        <p className="text-sm text-bear-cave-light/70">Let's discuss your marketing automation strategy</p>
                      </div>
                      <button
                        onClick={toggleExpanded}
                        className="p-2 hover:bg-bear-cave-primary-dark/20 rounded-full transition-colors"
                        aria-label="Close contact menu"
                      >
                        <X className="w-5 h-5 text-bear-cave-light/60" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Options */}
                  <div className="p-4 space-y-3">
                    {/* Strategy Call */}
                    <motion.button
                      onClick={() => {
                        window.open('https://calendly.com/jacob-darling', '_blank');
                        setIsExpanded(false);
                      }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-bear-cave-accent-gold/20 to-bear-cave-accent-gold/10 rounded-lg hover:from-bear-cave-accent-gold/30 hover:to-bear-cave-accent-gold/20 transition-all group border border-bear-cave-accent-gold/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-bear-cave-accent-gold/30 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 text-bear-cave-accent-gold font-bold">📅</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-bear-cave-light">Strategy Call</div>
                        <div className="text-sm text-bear-cave-light/70">15-minute ROI discussion</div>
                      </div>
                      <div className="text-bear-cave-accent-gold">→</div>
                    </motion.button>

                    {/* Email Consultation */}
                    <motion.a
                      href="mailto:hoosierdarling@gmail.com"
                      className="flex items-center gap-4 p-4 bg-bear-cave-primary-dark/20 rounded-lg hover:bg-bear-cave-primary-dark/30 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-bear-cave-light">Email Consultation</div>
                        <div className="text-sm text-bear-cave-light/70">Share your marketing challenges</div>
                      </div>
                      <div className="text-bear-cave-accent-gold">→</div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href="tel:317-443-8091"
                      className="flex items-center gap-4 p-4 bg-bear-cave-primary-dark/20 rounded-lg hover:bg-bear-cave-primary-dark/30 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-bear-cave-light">Direct Call</div>
                        <div className="text-sm text-bear-cave-light/70">317-443-8091</div>
                      </div>
                      <div className="text-bear-cave-accent-gold">→</div>
                    </motion.a>

                    {/* ROI Calculator */}
                    <motion.button
                      className="flex items-center gap-4 p-4 bg-bear-cave-primary-dark/20 rounded-lg hover:bg-bear-cave-primary-dark/30 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setIsExpanded(false);
                        // Could scroll to ROI calculator section
                      }}
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                        <div className="w-6 h-6 text-purple-400 font-bold">💰</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-bear-cave-light">ROI Calculator</div>
                        <div className="text-sm text-bear-cave-light/70">Calculate your potential savings</div>
                      </div>
                      <div className="text-bear-cave-accent-gold">→</div>
                    </motion.button>
                  </div>

                  {/* Bottom CTA */}
                  <div className="p-4 border-t border-border/50 bg-gradient-to-r from-bear-cave-accent-gold/5 to-bear-cave-accent-gold/10">
                    <div className="text-center">
                      <p className="text-sm text-bear-cave-light/70 mb-3">
                        Ready to emerge from marketing complexity into structured growth?
                      </p>
                      <Link
                        to="/case-studies"
                        className="block w-full bear-cave-btn-primary font-semibold py-3 px-4 rounded-lg text-center"
                        onClick={() => setIsExpanded(false)}
                      >
                        View Case Studies
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Floating Button */}
      <motion.div
        className="hidden md:block fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => window.open('https://calendly.com/jacob-darling', '_blank')}
          className="w-16 h-16 bg-gradient-to-r from-bear-cave-accent-gold to-bear-cave-accent-gold/80 text-bear-cave-primary-dark rounded-full shadow-2xl flex items-center justify-center group hover:shadow-3xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(212, 155, 65, 0.3)',
              '0 0 40px rgba(212, 155, 65, 0.6)',
              '0 0 20px rgba(212, 155, 65, 0.3)'
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 bg-bear-cave-primary-dark/95 text-bear-cave-light px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-bear-cave-accent-gold/30"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          Schedule your marketing ROI discussion
          <div className="absolute top-full right-4 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-bear-cave-primary-dark/95"></div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MobileStickyCTA;