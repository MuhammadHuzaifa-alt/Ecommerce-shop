import "./ProfileCard.css";
import { FaUserCircle } from "react-icons/fa";

interface ProfileCardProps {
  fullname: string;
  email: string;
  image?: string;
}

const ProfileCard = ({
  fullname,
  email,
  image,
}: ProfileCardProps) => {
  return (
    <div className="profile-card">
      {image ? (
        <img src={image} alt={fullname} />
      ) : (
        <FaUserCircle className="profile-card-icon" />
      )}

      <h3>{fullname}</h3>

      <p>{email}</p>
    </div>
  );
};

export default ProfileCard;