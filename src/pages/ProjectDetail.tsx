import React from "react";
import { useParams, Link } from "react-router-dom";
// TODO: Import project data

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  // TODO: Find project from data using slug

  return (
    <main className="project-detail">
      <Link to="/projects">← Back to Projects</Link>
      <section>
        <h1>Project Title</h1>
        <p>Purpose, problem, process, screenshots, links...</p>
      </section>
    </main>
  );
};

export default ProjectDetail;