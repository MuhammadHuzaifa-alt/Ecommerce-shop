import "./ProfileForm.css";
import { useState } from "react";

import Input from "../../../../shared/components/Input/Input";
import Button from "../../../../shared/components/Button/Button";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
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

    console.log(formData);

    // Later:
    // Update Profile API
  };

  return (
    <form
      className="profile-form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Full Name"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />

      <Input
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
      />

      <Input
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />

      <Button type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileForm;