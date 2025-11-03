import React from "react";
import "./CaseStudyLayout.css";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ children }) => {
  return <main className="case-study-layout">{children}</main>;
};

export default CaseStudyLayout;
