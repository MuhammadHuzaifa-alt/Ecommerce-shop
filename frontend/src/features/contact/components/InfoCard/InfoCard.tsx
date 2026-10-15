import "./InfoCard.css";
import type { IconType } from "react-icons";

interface InfoCardProps {
  icon: IconType;
  title: string;
  value: string;
  subValue?: string;
}

const InfoCard = ({
  icon: Icon,
  title,
  value,
  subValue,
}: InfoCardProps) => {
  return (
    <div className="info-card">

      <div className="info-card-icon">
        <Icon />
      </div>

      <div className="info-card-content">

        <h3>{title}</h3>

        <p>{value}</p>

        {subValue && (
          <span>{subValue}</span>
        )}

      </div>

    </div>
  );
};

export default InfoCard;