import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Sparkles } from "lucide-react";

// Lazy load the PDF component
const ResumePDF = lazy(() => import("../../pdf/ResumePDF").then(module => ({ default: module.ResumePDF })));

interface LazyPDFDownloadCTAProps {
  isGeneratingPDF: boolean;
  handlePDFGeneration: () => void;
  buttonVariants: any;
}

const LazyPDFDownloadCTA: React.FC<LazyPDFDownloadCTAProps> = ({
  isGeneratingPDF,
  handlePDFGeneration,
  buttonVariants
}) => {
  return (
    <Suspense
      fallback={
        <motion.button
          variants={buttonVariants}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          disabled
        >
          <Sparkles size={20} className="animate-spin" />
          Loading PDF...
        </motion.button>
      }
    >
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
                Generating PDF...
              </>
            ) : (
              <>
                <Download size={20} />
                Download PDF
              </>
            )}
          </motion.button>
        )}
      </PDFDownloadLink>
    </Suspense>
  );
};

export default LazyPDFDownloadCTA;
