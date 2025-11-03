import React, { Component, ErrorInfo, ReactNode, Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";

// Lazy load entire PDF functionality including @react-pdf/renderer
// This prevents @react-pdf/renderer from being bundled in the main chunk
// The wrapper component imports both @react-pdf/renderer and ResumePDF together
const PDFDownloadWrapper = lazy(() => import("./PDFDownloadWrapper"));

interface LazyPDFDownloadCTAProps {
  isGeneratingPDF: boolean;
  handlePDFGeneration: () => void;
  buttonVariants: any;
}

// Error Boundary for PDF component
class PDFErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PDF Error Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}


const LazyPDFDownloadCTA: React.FC<LazyPDFDownloadCTAProps> = ({
  isGeneratingPDF,
  handlePDFGeneration,
  buttonVariants
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only render PDF component after client-side hydration
    // This prevents @react-pdf/renderer from executing during SSR/initial load
    setIsClient(true);
  }, []);

  // Return static fallback during SSR/initial render
  if (!isClient) {
    return (
      <motion.a
        href="/resume/Resume JD draft.pdf"
        download="Jacob-Darling-Resume.pdf"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
        onClick={handlePDFGeneration}
      >
        <Download size={20} />
        Download PDF
      </motion.a>
    );
  }

  // Render PDF component only after client-side is ready
  const fallbackButton = (
    <motion.a
      href="/resume/Resume JD draft.pdf"
      download="Jacob-Darling-Resume.pdf"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={handlePDFGeneration}
    >
      <Download size={20} />
      Download PDF
    </motion.a>
  );

  return (
    <PDFErrorBoundary fallback={fallbackButton}>
      <Suspense fallback={
        <motion.button
          variants={buttonVariants}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          disabled
        >
          <Sparkles size={20} className="animate-spin" />
          Loading PDF Generator...
        </motion.button>
      }>
        <PDFDownloadWrapper
          handlePDFGeneration={handlePDFGeneration}
          buttonVariants={buttonVariants}
          isGeneratingPDF={isGeneratingPDF}
        />
      </Suspense>
    </PDFErrorBoundary>
  );
};

export default LazyPDFDownloadCTA;
