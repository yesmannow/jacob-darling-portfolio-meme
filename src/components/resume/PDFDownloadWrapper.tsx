import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import { ResumePDF } from "../../pdf/ResumePDF";

interface PDFDownloadWrapperProps {
  handlePDFGeneration: () => void;
  buttonVariants: any;
  isGeneratingPDF: boolean;
}

const PDFDownloadWrapper: React.FC<PDFDownloadWrapperProps> = ({
  handlePDFGeneration,
  buttonVariants,
  isGeneratingPDF
}) => {
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
    <PDFDownloadLink
      document={<ResumePDF />}
      fileName="Jacob-Darling-Resume.pdf"
      className="group"
      onClick={handlePDFGeneration}
    >
      {({ loading, error: pdfError }) => {
        if (pdfError) {
          console.error("PDF generation error:", pdfError);
          return fallbackButton;
        }

        return (
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
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFDownloadWrapper;

