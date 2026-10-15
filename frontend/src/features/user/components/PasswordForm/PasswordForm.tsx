import "./PasswordForm.css";

import { useState } from "react";

import PasswordInput from "../../../../shared/components/PasswordInput/PasswordInput";
import Button from "../../../../shared/components/Button/Button";

const PasswordForm = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      formData.new_password !==
      formData.confirm_password
    ) {
      alert("Passwords do not match.");
      return;
    }

    console.log(formData);

    // Later:
    // await changePassword(formData)
  };

  return (
    <form
      className="password-form"
      onSubmit={handleSubmit}
    >
      <PasswordInput
        label="Current Password"
        name="current_password"
        value={formData.current_password}
        placeholder="Enter current password"
        onChange={handleChange}
      />

      <PasswordInput
        label="New Password"
        name="new_password"
        value={formData.new_password}
        placeholder="Enter new password"
        onChange={handleChange}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirm_password"
        value={formData.confirm_password}
        placeholder="Confirm new password"
        onChange={handleChange}
      />

      <Button type="submit">
        Update Password
      </Button>
    </form>
  );
};

export default PasswordForm;