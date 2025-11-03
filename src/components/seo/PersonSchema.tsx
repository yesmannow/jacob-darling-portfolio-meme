import React from "react";

const PersonSchema: React.FC = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jacob Darling",
    "image": "https://jacobdarling.com/images/bio/bio-photo.jpg",
    "description": "Creative Technologist and Marketing Strategist integrating strategy, design, and motion. Specializing in marketing automation, web development, and systems architecture.",
    "jobTitle": "Marketing Strategist & Systems Architect",
    "url": "https://jacobdarling.com",
    "sameAs": [
      "https://linkedin.com/in/jacobdarling",
      "https://github.com/yesmannow",
      "https://bearcavemarketing.com",
      "https://www.facebook.com/jacob.darling.44227/",
      "https://www.tiktok.com/@jadarlin",
      "https://soundcloud.com/ottodarling",
      "https://www.youtube.com/@jacobthedarling"
    ],
    "email": "hoosierdarling@gmail.com",
    "telephone": "317-443-8091",
    "knowsAbout": [
      "Marketing Strategy",
      "Marketing Automation",
      "Web Development",
      "Systems Architecture",
      "Brand Design",
      "React Development",
      "GSAP Animation",
      "SEO Optimization"
    ],
    "alumniOf": {
      "@type": "Organization",
      "name": "Various Marketing and Technology Organizations"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Jacob Darling Portfolio",
      "url": "https://jacobdarling.com"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "professional",
      "url": "https://jacobdarling.com/contact"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData, null, 2) }}
    />
  );
};

export default PersonSchema;
