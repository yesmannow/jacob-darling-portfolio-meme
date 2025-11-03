import React from "react";
import "./CaseStudyLayout.css";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

const CaseStudyLayout = ({ children }: CaseStudyLayoutProps) => {
  return <main className="case-study-layout">{children}</main>;
};

export default CaseStudyLayout;

