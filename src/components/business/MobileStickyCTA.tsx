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
                bg-gradient-to-r from-accent to-accent/80 text-white font-bold py-4 px-6
                shadow-2xl border border-accent/20 relative overflow-hidden group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                <span className="text-lg">
                  {isExpanded ? 'Close Menu' : 'Get In Touch'}
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
                        <h3 className="font-bold text-text">Let's Connect</h3>
                        <p className="text-sm text-muted">Choose your preferred way to reach out</p>
                      </div>
                      <button
                        onClick={toggleExpanded}
                        className="p-2 hover:bg-bg rounded-full transition-colors"
                        aria-label="Close contact menu"
                      >
                        <X className="w-5 h-5 text-muted" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Options */}
                  <div className="p-4 space-y-3">
                    {/* Email */}
                    <motion.a
                      href="mailto:hoosierdarling@gmail.com"
                      className="flex items-center gap-4 p-4 bg-bg rounded-lg hover:bg-bg/80 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text">Email Me</div>
                        <div className="text-sm text-muted">hoosierdarling@gmail.com</div>
                      </div>
                      <div className="text-accent">→</div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href="tel:317-443-8091"
                      className="flex items-center gap-4 p-4 bg-bg rounded-lg hover:bg-bg/80 transition-colors group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                        <Phone className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text">Call Me</div>
                        <div className="text-sm text-muted">317-443-8091</div>
                      </div>
                      <div className="text-accent">→</div>
                    </motion.a>

                    {/* Contact Form */}
                    <Link
                      to="/contact"
                      className="flex items-center gap-4 p-4 bg-bg rounded-lg hover:bg-bg/80 transition-colors group"
                      onClick={() => setIsExpanded(false)}
                    >
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                        <MessageCircle className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text">Contact Form</div>
                        <div className="text-sm text-muted">Send a detailed message</div>
                      </div>
                      <div className="text-accent">→</div>
                    </Link>

                    {/* Calendar */}
                    <motion.button
                      onClick={() => {
                        window.open('https://calendly.com/jacob-darling', '_blank');
                        setIsExpanded(false);
                      }}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg hover:from-accent/30 hover:to-accent/20 transition-all group border border-accent/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 text-accent font-bold">📅</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text">Schedule a Call</div>
                        <div className="text-sm text-muted">Book 15 minutes on my calendar</div>
                      </div>
                      <div className="text-accent">→</div>
                    </motion.button>
                  </div>

                  {/* Bottom CTA */}
                  <div className="p-4 border-t border-border/50 bg-gradient-to-r from-accent/5 to-accent/10">
                    <div className="text-center">
                      <p className="text-sm text-muted mb-3">
                        Ready to scale your marketing through automation?
                      </p>
                      <Link
                        to="/case-studies"
                        className="block w-full bg-accent text-white font-semibold py-3 px-4 rounded-lg text-center hover:bg-accent/90 transition-colors"
                        onClick={() => setIsExpanded(false)}
                      >
                        See My Results
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
          className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 text-white rounded-full shadow-2xl flex items-center justify-center group hover:shadow-3xl transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(59, 130, 246, 0.3)',
              '0 0 40px rgba(59, 130, 246, 0.6)',
              '0 0 20px rgba(59, 130, 246, 0.3)'
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
          className="absolute bottom-full right-0 mb-2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ y: 10, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
        >
          Let's talk about your marketing goals
          <div className="absolute top-full right-4 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/90"></div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MobileStickyCTA;