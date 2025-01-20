import styles from "./inputField.module.css";

interface InputFieldProps {
  label: string;
  type?: "text"; // Optional, defaults to "text"
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}
interface TextareaFieldProps {
  label: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  className?: string;
}


export const InputField = ({
  label,
  type = "text",
  value,
  name,
  onChange,
  placeholder,
  className
}: InputFieldProps) => {
  return (
    <label className={styles.label}>
      {label}
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={className || styles.input}
      />
    </label>
  );
};

export const TextareaField = ({
  label,
  value,
  name,
  onChange,
  placeholder,
  className
}: TextareaFieldProps) => (
  <label className={styles.label}>
    {label}
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={className || styles.textarea}
    ></textarea>
  </label>
);
