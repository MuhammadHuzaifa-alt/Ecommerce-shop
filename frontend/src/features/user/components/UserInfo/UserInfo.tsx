import "./UserInfo.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

interface UserInfoProps {
  fullname: string;
  email: string;
  phone: string;
  address: string;
}

const UserInfo = ({
  fullname,
  email,
  phone,
  address,
}: UserInfoProps) => {
  return (
    <div className="user-info">

      <div className="info-item">
        <FaUser />
        <div>
          <span>Full Name</span>
          <h4>{fullname}</h4>
        </div>
      </div>

      <div className="info-item">
        <FaEnvelope />
        <div>
          <span>Email</span>
          <h4>{email}</h4>
        </div>
      </div>

      <div className="info-item">
        <FaPhone />
        <div>
          <span>Phone</span>
          <h4>{phone}</h4>
        </div>
      </div>

      <div className="info-item">
        <FaMapMarkerAlt />
        <div>
          <span>Address</span>
          <h4>{address}</h4>
        </div>
      </div>

    </div>
  );
};

export default UserInfo;