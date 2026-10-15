import "./Input.css";

interface InputProps {
  label?: string;
  type?: string;
  name?: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  error,
  required = false,
  disabled = false,
  autoComplete,
  onChange,
}: InputProps) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <input
        className={`input-field ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        onChange={onChange}
      />

      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default Input;