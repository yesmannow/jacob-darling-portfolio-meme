import React from "react";
import "./Logo.css";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 120, animated = true, className = "" }) => {
  return (
    <div className={`logo-container ${animated ? 'animated' : ''} ${className}`}>
      <img
        src="/images/site design assests/JD Logo 2.png"
        alt="Jacob Darling Logo"
        width={size}
        height={size}
        className="logo-image"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default Logo;
