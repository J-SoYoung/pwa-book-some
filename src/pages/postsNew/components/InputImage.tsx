import { useState } from "react";
import styles from "../styles/postNew.module.css";

interface InputImageProps {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
}
export const InputImage = ({ setImageFile }: InputImageProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.formContents} style={{ marginBottom: "10px" }}>
      <label className={styles.formLabel}>
        다이어리 이미지를 넣어주세요
        <input
          type="file"
          className={styles.input}
          accept="image/*"
          onChange={onChangeImage}
        />
      </label>
      {imagePreview && (
        <div className={styles.imagePreview}>
          <img src={imagePreview} alt="미리보기 이미지" />
        </div>
      )}
    </div>
  );
};
