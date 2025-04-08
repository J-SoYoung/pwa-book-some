import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";

import styles from "./styles/postNew.module.css";
import "react-quill/dist/quill.snow.css";
import { InputImage, BookSearchModal, handleSubmitForm } from "./index";

import { LoadingSpinner } from "@/shared/components";
import { userState } from "@/shared/recoil/atoms";
import { SelectedBookType, UserType } from "@/shared/types/dataTypes";
import { uploadCloudImage } from "@/shared/apis/cloudinayImage";

export const PostsNew = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const user = useRecoilValue(userState);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookType>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    control,
    formState: { isSubmitting, errors }
  } = useForm<DiaryFormDataType>();

  const onSelectBook = (book: SelectedBookType) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const onSubmit: SubmitHandler<DiaryFormDataType> = async (data) => {
    setIsLoading(true);
    let image = "";
    if (imageFile) {
      const uploadCloudinaryImage = await uploadCloudImage(imageFile);
      if (uploadCloudinaryImage) image = uploadCloudinaryImage;
    }
    handleSubmitForm(
      selectedBook as SelectedBookType,
      image as string,
      data,
      user as UserType,
      navigate
    );
  };

  return (
    <div className={styles.posts}>
      {isLoading && <LoadingSpinner />}
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
      <InputImage setImageFile={setImageFile} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.postForm}>
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
          <Controller
            name="content"
            control={control}
            rules={{
              required: "독서 포스팅 내용은 필수입니다.",
              validate: (value) =>
                value.replace(/<(.|\n)*?>/g, "").length >= 30 ||
                "포스팅 내용은 30자 이상으로 작성해주세요."
            }}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                placeholder="오늘 독서 후 느낀점은?"
                {...field}
              />
            )}
          />
          {errors.content && (
            <small className={styles.errorMessage}>
              {errors.content.message}
            </small>
          )}
        </div>
        {/* <textarea
              id="content"
              placeholder="오늘 독서 후 느낀점은은"
              {...register("content", {
                required: "독서 포스팅 내용용은 필수입니다.",
                minLength: {
                  value: 30,
                  message: "포스팅 내용은 30자리 이상으로 작성해주세요."
                }
              })}
            /> */}
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
