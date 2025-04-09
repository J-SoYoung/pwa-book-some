import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";

import styles from "./styles/post.module.css";
import "react-quill/dist/quill.snow.css";
import { handleSubmitForm } from "./service/handleSubmitForm";

import { userState } from "@/shared/recoil/atoms";
import { getDiaryList } from "@/shared/apis/apis";
import { LoadingSpinner } from "@/shared/components";
import { UserType } from "@/shared/types/dataTypes";

interface DiaryFormDataType {
  diaryId: string;
  title: string;
  content: string;
}

export const Posts = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors }
  } = useForm<DiaryFormDataType>();

  const { data: diaryList, error: diaryListError } = useQuery({
    queryKey: ["diaryList", user.userId],
    queryFn: async () => {
      return await getDiaryList(user.userId as string);
    }
  });

  const onSubmit: SubmitHandler<DiaryFormDataType> = async (data) => {
    setIsLoading(true);
    handleSubmitForm(data, navigate);
  };

  return (
    <div className={styles.posts}>
      {isLoading && <LoadingSpinner />}
      <h2>BookDiary 작성</h2>
      <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="title">
            다이어리 검색
            {diaryListError && (
              <p className={styles.errorMessage}>
                다이어리 리스트를 가져오지 못했습니다
              </p>
            )}
          </label>
          <select
            id="diaryId"
            className={styles.select}
            {...register("diaryId", {
              required: true
            })}
          >
            <option value="" className={styles.option}>
              다이어리를 선택해주세요
            </option>
            {diaryList?.map((diary, idx) => (
              <option
                key={diary.diaryId}
                value={diary.diaryId}
                className={styles.option}
              >
                {`[${idx + 1}] ${diary.diaryTitle} - ${diary.book.title.slice(
                  0,
                  10
                )}..`}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="title">
            오늘의 독서 포스팅 제목을 적어주세요
          </label>
          <input
            id="title"
            type="text"
            placeholder="오늘 작성할 포스팅 제목은"
            {...register("title", {
              required: "독서 포스팅 제목은 필수입니다.",
              minLength: {
                value: 5,
                message: "제목은 5자리 이상으로 작성해주세요."
              }
            })}
          />
          {errors.title && (
            <small className={styles.errorMessage}>
              {errors.title.message}
            </small>
          )}
        </div>

        <div className={styles.formContents}>
          <label className={styles.formLabel} htmlFor="content">
            오늘 읽은 부분을 기록해보세요.
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

        <button type="submit" disabled={isSubmitting}>
          글작성
        </button>
      </form>
    </div>
  );
};
