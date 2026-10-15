import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";

interface PasswordInputProps {
  label?: string;
  name?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-group">
      {label && (
        <label className="password-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          className={`password-input ${error ? "password-error" : ""}`}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          onChange={onChange}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && <small className="password-error-text">{error}</small>}
    </div>
  );
};

export default PasswordInput;