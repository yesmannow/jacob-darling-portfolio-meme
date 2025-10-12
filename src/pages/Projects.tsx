import React from "react";
import { Link } from "react-router-dom";

const Projects: React.FC = () => (
  <main className="projects">
    <h1>Value & Side Projects</h1>
    <p>These are playground projects — experiments in data, automation, and creative systems.</p>
    {/* TODO: Map over project data */}
    <section className="projects-list">
      {/* Example card */}
      {/* <Link to={`/projects/project-slug`}>Project Card</Link> */}
    </section>
  </main>
);

export default Projects;