import "./Profile.css";

import AccountHeader from "../../components/AccountHeader/AccountHeader";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import UserInfo from "../../components/UserInfo/UserInfo";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

import { useAuth } from "../../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const handleImageUpload = (file: File) => {
    console.log(file);

    
  };

  return (
    <div className="profile">

      <AccountHeader
        title="My Profile"
        subtitle="View and update your personal information."
      />

      <div className="profile-grid">

        {/* Left Side */}
        <div className="profile-left">

          <UserAvatar
            image={user && "image" in user && typeof user.image === "string" ? user.image : ""}
            onChange={handleImageUpload}
          />

          <UserInfo
            fullname={user?.fullname || ""}
            email={user?.email || ""}
            phone=""
            address=""
          />

        </div>

        {/* Right Side */}
        <div className="profile-right">

          <ProfileForm />

        </div>

      </div>

    </div>
  );
};

export default Profile;
