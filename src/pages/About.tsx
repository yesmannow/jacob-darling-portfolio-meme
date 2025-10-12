import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => (
  <main className="about">
    <section>
      <h1>Marketing Strategist meets Systems Architect.</h1>
      <p>
        I blend creative strategy with technical implementation to deliver results in complex environments.
      </p>
    </section>
    <section className="philosophy">
      <h2>Philosophy</h2>
      <ul>
        <li>Clarity</li>
        <li>Connection</li>
        <li>Consistency</li>
        <li>Conversion</li>
      </ul>
      <p>
        I believe marketing isn’t just communication — it’s architecture.
      </p>
    </section>
    <section className="timeline">
      <h2>My Journey</h2>
      {/* TODO: Timeline component */}
    </section>
    <section className="personal-touch">
      <h2>Personal Touch</h2>
      <p>
        Inspired by structured creativity and system automation, I bring a relentless work ethic and Indiana roots to every project.
      </p>
    </section>
    <section className="cta">
      <Link to="/case-studies">See how I apply these principles in my projects →</Link>
    </section>
  </main>
);

export default About;