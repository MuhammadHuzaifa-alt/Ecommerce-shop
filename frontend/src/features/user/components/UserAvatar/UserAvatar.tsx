import "./UserAvatar.css";
import { FaCamera, FaUserCircle } from "react-icons/fa";

interface UserAvatarProps {
  image?: string;
  onChange?: (file: File) => void;
}

const UserAvatar = ({
  image,
  onChange,
}: UserAvatarProps) => {
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && onChange) {
      onChange(e.target.files[0]);
    }
  };

  return (
    <div className="user-avatar">

      <div className="avatar-wrapper">

        {image ? (
          <img
            src={image}
            alt="Profile"
            className="avatar-image"
          />
        ) : (
          <FaUserCircle className="default-avatar" />
        )}

      </div>

      <label className="upload-btn">

        <FaCamera />

        Change Photo

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          hidden
        />

      </label>

    </div>
  );
};

export default UserAvatar;