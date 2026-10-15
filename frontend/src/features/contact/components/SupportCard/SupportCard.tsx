import "./SupportCard.css";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { FaArrowRight } from "react-icons/fa";

interface SupportCardProps {
  icon: IconType;
  title: string;
  description: string;
  link: string;
  buttonText?: string;
}

const SupportCard = ({
  icon: Icon,
  title,
  description,
  link,
  buttonText = "Learn More",
}: SupportCardProps) => {
  return (
    <div className="support-card">

      <div className="support-card-icon">
        <Icon />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <Link
        to={link}
        className="support-card-btn"
      >
        {buttonText}
        <FaArrowRight />
      </Link>

    </div>
  );
};

export default SupportCard;