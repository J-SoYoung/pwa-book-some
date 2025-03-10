import styles from "./styles/inputField.module.css";

interface InputFieldProps {
  label: string;
  type?: "text" | "file";
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}
interface InputEditFieldProps {
  type?: "text";
  inputType: "input" | "textarea";
  defaultValue: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
  value = "/",
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
export const InputEditField = ({
  defaultValue,
  name,
  onChange,
  inputType
}: InputEditFieldProps) => {
  return (
    <label className={styles.label}>
      {inputType === "input" ? (
        <input
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          className={styles.input}
        />
      ) : (
        <textarea
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          className={styles.textarea}
        ></textarea>
      )}
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
}: TextareaFieldProps) => {
  return (
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
};
