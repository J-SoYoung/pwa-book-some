import { useState } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import styles from "./post.module.css";
import { userState } from "@/recoil/atoms";
import { getDiaryList } from "@/services/apis";
import { UserType } from "@/services/types/dataTypes";
import { InputField, TextareaField } from "@/components";
import { handleSubmitForm } from "./handleSubmitForm";
import { useQuery } from "@tanstack/react-query";

export const Posts = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [newDiaryData, setNewDiaryData] = useState({
    diaryId: "",
    title: "",
    content: ""
  });

  const {
    data: diaryList,
    isLoading,
    error
  } = useQuery({
    queryKey: ["diaryList", user.userId],
    queryFn: async () => {
      return await getDiaryList(user.userId as string);
    }
  });

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setNewDiaryData({ ...newDiaryData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmitForm(e, newDiaryData, navigate);
  };

  return (
    <div className={styles.posts}>
      <h2>BookDiary 작성</h2>

      <form className={styles.form} onSubmit={onSubmitForm}>
        <label className={styles.label}>
          다이어리 검색
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              name="diaryId"
              onChange={onChange}
              value={newDiaryData.diaryId}
            >
              <option value="" disabled>
                다이어리를 선택해주세요
              </option>
              {diaryList?.map((diary, idx) => (
                <option key={diary.diaryId} value={diary.diaryId}>
                  {`[${idx + 1}] ${diary.diaryTitle} - ${diary.book.title.slice(
                    0,
                    10
                  )}..`}
                </option>
              ))}
            </select>
          </div>
        </label>
        <InputField
          label={"오늘의 독서 제목을 적어주세요."}
          value={newDiaryData.title}
          name={"title"}
          onChange={onChange}
          placeholder={"오늘 작성된 감상평의 제목이 됩니다."}
        />
        <TextareaField
          label={"오늘 읽은 부분을 기록해보세요."}
          value={newDiaryData.content}
          name={"content"}
          onChange={onChange}
          placeholder={"나의 느낀점을 자유롭게 작성해보세요."}
        />
        <button type="submit" className={styles.submitButton}>
          글작성
        </button>
      </form>
    </div>
  );
};
