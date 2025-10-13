import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResumePDF } from "../../pdf/ResumePDF";
import { Download, Share2, Mail, ExternalLink, Sparkles, FileText } from "lucide-react";
import { useState } from "react";
import resumeData from "../../data/resume.json";

export default function CTAButtons() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const { contact } = resumeData;

  const handlePDFGeneration = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => setIsGeneratingPDF(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jacob Darling - Resume",
          text: "Check out Jacob Darling's professional resume - Marketing Director & System Architect",
          url: window.location.href
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Jacob Darling - Professional Resume");
    const body = encodeURIComponent(`I'd like to share Jacob Darling's professional resume with you:\n\n${window.location.href}\n\nBest regards`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleContact = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {/* PDF Download Button */}
      <PDFDownloadLink 
        document={<ResumePDF />} 
        fileName="Jacob-Darling-Resume.pdf"
        className="group"
        onClick={handlePDFGeneration}
      >
        {({ loading }) => (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
            disabled={loading || isGeneratingPDF}
          >
            {loading || isGeneratingPDF ? (
              <>
                <Sparkles size={20} className="animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Download Resume</span>
              </>
            )}
          </motion.button>
        )}
      </PDFDownloadLink>

      {/* Share Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleShare}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Share2 size={20} />
        <span>Share Resume</span>
      </motion.button>

      {/* Email Resume Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleEmail}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Mail size={20} />
        <span>Email Resume</span>
      </motion.button>

      {/* Contact Me Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleContact}
        className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-colors duration-300"
      >
        <ExternalLink size={20} />
        <span>Contact Me</span>
      </motion.button>
    </motion.div>
  );
}
