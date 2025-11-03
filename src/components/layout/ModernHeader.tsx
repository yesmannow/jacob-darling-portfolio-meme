import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Briefcase,
  Palette,
  Camera,
  Sparkles,
  Wrench,
  FileText,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "./ModernHeader.css";

interface DropdownItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  description?: string;
  external?: boolean;
}

interface NavigationGroup {
  label: string;
  icon: React.ReactNode;
  items: DropdownItem[];
}

const ModernHeader: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrollDir, setScrollDir] = useState("up");
  const [glow, setGlow] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Navigation groups for organized dropdowns
  const navigationGroups: NavigationGroup[] = [
    {
      label: "About",
      icon: <User className="w-4 h-4" />,
      items: [
        { label: "About Me", to: "/about", icon: <User className="w-4 h-4" />, description: "My story and background" },
        { label: "Resume", to: "/resume", icon: <FileText className="w-4 h-4" />, description: "Download my CV" },
      ]
    },
    {
      label: "Work",
      icon: <Briefcase className="w-4 h-4" />,
      items: [
        { label: "Case Studies", to: "/case-studies", icon: <Briefcase className="w-4 h-4" />, description: "Detailed project breakdowns" },
        { label: "Client Work", to: "/side-projects", icon: <ExternalLink className="w-4 h-4" />, description: "Client projects and collaborations" },
        { label: "Applications", to: "/applications", icon: <Wrench className="w-4 h-4" />, description: "Interactive tools and demos" },
      ]
    },
    {
      label: "Creative",
      icon: <Palette className="w-4 h-4" />,
      items: [
        { label: "Design", to: "/design", icon: <Palette className="w-4 h-4" />, description: "Visual design portfolio" },
        { label: "Photography", to: "/photography", icon: <Camera className="w-4 h-4" />, description: "Photography gallery" },
        { label: "Inspiration", to: "/inspiration", icon: <Sparkles className="w-4 h-4" />, description: "Creative inspiration hub" },
      ]
    },
    {
      label: "Resources",
      icon: <Wrench className="w-4 h-4" />,
      items: [
        { label: "Toolbox", to: "/toolbox", icon: <Wrench className="w-4 h-4" />, description: "My tech stack and tools" },
      ]
    }
  ];

  // Detect viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll hide / reveal logic
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const direction = y > lastY ? "down" : "up";
      if (Math.abs(y - lastY) > 5) {
        setScrollDir(direction);
        setVisible(direction === "up" || y < 50);
        setGlow(direction === "up" && y > 100);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle dropdown hover
  const handleDropdownEnter = (groupLabel: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(groupLabel);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-500
        ${glow ? "bg-black/60 shadow-[0_0_25px_rgba(59,130,246,0.4)]" : "bg-black/30"}
        ${isMobile ? "min-h-[70px]" : "min-h-[80px]"}
      `}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.svg
            width="110"
            height="110"
            viewBox="0 0 120 120"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 3, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
          >
            <defs>
              <linearGradient id="navGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="55" stroke="url(#navGradient)" strokeWidth="3" fill="none" />
            <text
              x="60"
              y="70"
              textAnchor="middle"
              fontSize="28"
              fontWeight="bold"
              fill="url(#navGradient)"
              fontFamily="Inter, system-ui"
            >
              JD
            </text>
          </motion.svg>
          <span className="text-white font-semibold text-lg tracking-wide group-hover:text-blue-400 transition">
            Jacob Darling
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        {!isMobile && (
          <div className="hidden lg:flex items-center gap-8" ref={dropdownRef}>
            {navigationGroups.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(group.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors group">
                  {group.icon}
                  <span className="font-medium">{group.label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === group.label ? 'rotate-180' : ''}`} />
                </button>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {activeDropdown === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {group.items.map((item, index) => (
                          <motion.div
                            key={item.to}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={item.to}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                            >
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                  {item.label}
                                </div>
                                {item.description && (
                                  <div className="text-sm text-gray-400">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* CONTACT BUTTON */}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/25"
            >
              Contact
            </Link>
          </div>
        )}

        {/* MOBILE TOGGLE */}
        {isMobile && (
          <button
            className="text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-6 py-6">
              {navigationGroups.map((group) => (
                <div key={group.label} className="mb-6">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold mb-3">
                    {group.icon}
                    <span>{group.label}</span>
                  </div>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-white font-medium group-hover:text-blue-400 transition-colors">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-400">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* MOBILE CONTACT BUTTON */}
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium text-center hover:scale-105 transition-all"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default ModernHeader;
