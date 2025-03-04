import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SubmitHandler, useForm } from "react-hook-form";

import styles from "./postNew.module.css";
import { userState } from "@/recoil/atoms";
import { SelectedBookType, UserType } from "@/services/types/dataTypes";
import { BookSearchModal } from "@/components";
import { handleSubmitForm } from "./handleSubmitForm";
import { uploadCloudImage } from "@/services/cloudinayImage";

export const PostsNew = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useRecoilValue(userState);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookType>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  interface DiaryFormDataType {
    diaryTitle: string;
    todayTitle: string;
    content: string;
    uploadImageFile: File;
  }

  useEffect(() => {
    if (state) {
      const { link, isbn, author, title, image, description } = state.book;
      setSelectedBook({ link, isbn, author, title, image, description });
    }
  }, [state]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = useForm<DiaryFormDataType>();

  const watchImageFileList = watch("uploadImageFile");

  useEffect(() => {
    // watch 메서드 내부에 unsubscribe있음 구독해지가능
    // watch가 처음 동작할 때 기본값 / watch가 변할때의 값을 주시하고 있다가 setFile에 넣어줌.
    const { unsubscribe } = watch((value) => {
      const image = value.uploadImageFile[0]
      setImageFile(image);
      console.log(value);
    });
    return () => unsubscribe();
  }, [watch, watchImageFileList]);

  const onSelectBook = (book: SelectedBookType) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const onSubmit: SubmitHandler<DiaryFormDataType> = async (data) => {
    if (imageFile) {
      const uploadCloudinaryImage = await uploadCloudImage(imageFile);
      handleSubmitForm(
        selectedBook as SelectedBookType,
        uploadCloudinaryImage as string,
        data,
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
        <div className={styles.formContents} style={{ marginBottom: "10px" }}>
          <label className={styles.formLabel} htmlFor="uploadImageFile">
            다이어리 이미지를 넣어주세요
          </label>
          <input
            id="uploadImageFile"
            type="file"
            accept="image/*"
            {...register("uploadImageFile")}
          />
        </div>
        {imageFile && (
          <div className={styles.imagePreview}>
            <img
              src={`${URL.createObjectURL(imageFile)}`}
              alt="미리보기 이미지"
              className={styles.previewImage}
            />
          </div>
        )}

        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="diaryTitle">
            다이어리 제목을 적어주세요
          </label>
          <input
            id="diaryTitle"
            type="text"
            placeholder="오늘의 다이어리"
            {...register("diaryTitle", {
              required: "다이어리 제목은 필수입니다.",
              minLength: {
                value: 5,
                message: "제목은 5자리 이상으로 작성해주세요."
              }
            })}
          />
          {errors?.diaryTitle && (
            <small className={styles.errorMessage}>
              {errors.diaryTitle.message}
            </small>
          )}
        </div>
        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="todayTitle">
            오늘의 독서 포스팅 제목을 적어주세요
          </label>
          <input
            id="todayTitle"
            type="text"
            placeholder="오늘 작성할 포스팅 제목은"
            {...register("todayTitle", {
              required: "독서 포스팅 제목은 필수입니다.",
              minLength: {
                value: 5,
                message: "제목은 5자리 이상으로 작성해주세요."
              }
            })}
          />
          {errors.todayTitle && (
            <small className={styles.errorMessage}>
              {errors.todayTitle.message}
            </small>
          )}
        </div>
        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="content">
            책을 읽고 느낀점을 적어보세요.
          </label>
          <textarea
            id="content"
            placeholder="오늘 독서 후 느낀점은은"
            {...register("content", {
              required: "독서 포스팅 내용용은 필수입니다.",
              minLength: {
                value: 30,
                message: "포스팅 내용은 30자리 이상으로 작성해주세요."
              }
            })}
          />
          {errors.content && (
            <small className={styles.errorMessage}>
              {errors.content.message}
            </small>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          글작성
        </button>

        {showModal && (
          <BookSearchModal
            onClose={() => {
              setShowModal(false);
            }}
            onSelect={onSelectBook}
          />
        )}
      </form>
    </div>
  );
};
