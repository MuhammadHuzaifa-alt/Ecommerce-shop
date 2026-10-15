import "./AccountHeader.css";

interface AccountHeaderProps {
  title: string;
  subtitle: string;
}

const AccountHeader = ({
  title,
  subtitle,
}: AccountHeaderProps) => {
  return (
    <div className="account-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
};

export default AccountHeader;