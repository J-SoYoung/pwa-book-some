import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styles from "./postNew.module.css";
import { userState } from "@/recoil/atoms";
import { SelectedBookType, UserType } from "@/services/types";
import { InputField, TextareaField, BookSearchModal } from "@/components";
import { handleSubmitForm } from "./handleSubmitForm";
import { uploadCloudImage } from "@/services/cloudinayImage";

export const PostsNew = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useRecoilValue(userState);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookType>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [diaryData, setDiaryData] = useState({
    diaryTitle: "",
    todayTitle: "",
    content: ""
  });

  useEffect(() => {
    if (state) {
      const { link, isbn, author, title, image, description } = state.book;
      setSelectedBook({ link, isbn, author, title, image, description });
    }
  }, [state]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDiaryData({ ...diaryData, [e.target.name]: e.target.value });
  };

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

  const onSelectBook = (book: SelectedBookType) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = await uploadCloudImage(imageFile as File);
    if (image !== null) {
      handleSubmitForm(
        e,
        diaryData,
        image,
        selectedBook as SelectedBookType,
        user as UserType,
        navigate
      );
    }
  };

  return (
    <div className={styles.posts}>
      <h2>새 다이어리 만들기</h2>
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <button
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            책검색
          </button>
        </div>

        <div className={styles.bookInfo}>
          <img
            src={selectedBook?.image ?? ""}
            alt="읽고 있는 책"
            className={styles.bookImage}
          />
          <div className={styles.bookDetails}>
            <strong>{selectedBook?.title ?? ""}</strong>
            <p>{selectedBook?.author ?? ""}</p>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={onSubmitForm}>
        <label className={styles.label}>
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
            <img
              src={imagePreview}
              alt="미리보기 이미지"
              className={styles.previewImage}
            />
          </div>
        )}

        <InputField
          label={"나만의 다이어리리 제목을 적어주세요."}
          value={diaryData.diaryTitle}
          name={"diaryTitle"}
          onChange={onChange}
          placeholder={"다이어리 제목이 됩니다"}
        />
        <InputField
          label={"나만의 서평 제목을 적어주세요."}
          value={diaryData.todayTitle}
          onChange={onChange}
          name={"todayTitle"}
          placeholder={"포스팅 제목이 됩니다"}
        />
        <TextareaField
          label={"나의 느낀점을 자유롭게 작성해보세요."}
          value={diaryData.content}
          onChange={onChange}
          name={"content"}
          placeholder={"포스팅 내용이 됩니다"}
        />
        <button type="submit" className={styles.submitButton}>
          글작성
        </button>
      </form>

      {showModal && (
        <BookSearchModal
          onClose={() => {
            setShowModal(false);
          }}
          onSelect={onSelectBook}
        />
      )}
    </div>
  );
};
