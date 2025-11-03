import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Building2, Award, User, GraduationCap, Eye, EyeOff } from 'lucide-react';
import { scrollToSection } from '../../utils/narrativeMotion';
import { scrollToTop } from '../../utils/scroll';
import resumeData from '../../data/resume.json';
import './TimelineNavigation.css';

interface TimelineNavigationProps {
  className?: string;
}

const TimelineNavigation: React.FC<TimelineNavigationProps> = ({ className = '' }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Map company names to theme keys
  const getCompanyTheme = (companyName: string) => {
    const name = companyName.toLowerCase();
    if (name.includes('graston')) return 'graston';
    if (name.includes('pike')) return 'pike';
    return 'early-career';
  };

  // Navigation items
  const navItems = [
    ...resumeData.experience.map((job, index) => ({
      id: `experience-${index}`,
      label: job.company,
      sublabel: job.role,
      icon: <Building2 className="w-4 h-4" />,
      themeKey: getCompanyTheme(job.company),
      type: 'experience'
    })),
    {
      id: 'awards-section',
      label: 'Awards',
      sublabel: 'Recognition',
      icon: <Award className="w-4 h-4" />,
      themeKey: 'awards' as const,
      type: 'awards'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);

      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id));
      const currentSection = sections.findIndex(section => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection !== -1) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (sectionId: string, index: number) => {
    setActiveSection(index);
    scrollToSection(sectionId);
  };

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Navigation Container */}
          <div className="relative">
            {/* Background */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl" />

            {/* Hide Button */}
            <motion.button
              className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg text-gray-400 hover:text-white transition-colors duration-200"
              onClick={toggleVisibility}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isHidden ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </motion.button>

            {/* Navigation Items */}
            <div className={`relative p-4 space-y-2 ${isHidden ? 'hidden' : ''}`}>
              {navItems.map((item, index) => {
                const isActive = activeSection === index;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id, index)}
                    className="timeline-nav-item relative w-full text-left group"
                    data-theme={item.themeKey}
                    data-active={isActive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Active Background */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-lg active-background"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Content */}
                    <div className="relative flex items-center gap-3 p-3 rounded-lg transition-colors duration-200">
                      {/* Dot Indicator */}
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 border-white/30 flex-shrink-0 nav-dot"
                        animate={{
                          scale: isActive ? 1.2 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Text Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="nav-icon">
                            {item.icon}
                          </div>
                          <span
                            className="text-sm font-semibold truncate nav-label"
                          >
                            {item.label}
                          </span>
                        </div>
                        <p
                          className="text-xs truncate nav-sublabel"
                        >
                          {item.sublabel}
                        </p>
                      </div>

                      {/* Hover Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-glow"
                      />
                    </div>
                  </motion.button>
                );
              })}

              {/* Divider */}
              <div className="my-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-2 p-3 text-gray-400 hover:text-white transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronUp className="w-4 h-4 group-hover:animate-bounce" />
                <span className="text-sm">Top</span>
              </motion.button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute -right-4 top-0 bottom-0 w-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"
                initial={{ height: 0 }}
                animate={{ height: `${((activeSection + 1) / navItems.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Connection Line to Content */}
          <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-8 h-px bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TimelineNavigation;
