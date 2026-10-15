import "./PageHero.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
}

const PageHero = ({
  badge,
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
}: PageHeroProps) => {
  return (
    <section
      className="page-hero"
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(17,24,39,.75), rgba(17,24,39,.75)), url(${backgroundImage})`,
            }
          : undefined
      }
    >
      <div className="page-hero-container">

        {badge && (
          <span className="page-hero-badge">
            {badge}
          </span>
        )}

        <h1>{title}</h1>

        <p>{description}</p>

        {(primaryButtonText || secondaryButtonText) && (
          <div className="page-hero-buttons">

            {primaryButtonText && primaryButtonLink && (
              <Link
                to={primaryButtonLink}
                className="hero-btn primary"
              >
                {primaryButtonText}
                <FaArrowRight />
              </Link>
            )}

            {secondaryButtonText && secondaryButtonLink && (
              <Link
                to={secondaryButtonLink}
                className="hero-btn secondary"
              >
                {secondaryButtonText}
              </Link>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default PageHero;