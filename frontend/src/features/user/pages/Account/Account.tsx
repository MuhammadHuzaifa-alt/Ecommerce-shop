import "./Account.css";

import AccountHeader from "../../components/AccountHeader/AccountHeader";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

import { useAuth } from "../../../../hooks/useAuth";

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="account">

      <AccountHeader
        title="My Account"
        subtitle="Manage your account settings and personal information."
      />

      <div className="account-content">

        <ProfileCard
          fullname={user?.fullname || "User"}
          email={user?.email || ""}
          image=""
        />

        <div className="account-actions">

          <LogoutButton />

        </div>

      </div>

    </div>
  );
};

export default Account;