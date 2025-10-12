import React from "react";

const Resume: React.FC = () => (
  <main className="resume">
    <h1>Résumé</h1>
    <a href="/resume/jacob-darling-resume.pdf" target="_blank" rel="noopener noreferrer" className="cta">
      Download PDF
    </a>
    {/* TODO: Interactive preview, skills heatmap */}
  </main>
);

export default Resume;