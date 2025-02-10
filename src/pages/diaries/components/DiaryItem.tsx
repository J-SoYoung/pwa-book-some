import { useState } from "react";
import styles from "../diaries.module.css";

import { DiaryWithUserType } from "@/services/types/dataTypes";
import { updateDiary } from "@/services/apis";
import { InputEditField } from "@/components";
import { validateValue } from "@/services/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DiaryPropsType {
  diary: DiaryWithUserType | null;
  isAuthor: boolean;
}

export const DiaryItem = ({ diary, isAuthor }: DiaryPropsType) => {
  const [isEditDiary, setIsEditDiary] = useState(false);
  const [editDiaryTitle, setEditDiaryTitle] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateDiary,
    onSuccess: () => {
      if (diary?.diaryId) {
        queryClient.invalidateQueries({ queryKey: ["diary", diary.diaryId] });
      }
      setIsEditDiary(false);
    },
    onError: (error) => {
      console.error("다이어리 수정 오류:", error);
      alert("다이어리 수정 중 오류가 발생했습니다.");
    }
  });

  const handleDiaryEdit = () => {
    setIsEditDiary(!isEditDiary);
  };

  const handleDiarySave = async () => {
    const validate = validateValue(editDiaryTitle);
    if (!validate.valid) return alert(validate.message);

    mutation.mutate({
      diaryId: diary?.diaryId as string,
      newTitle: editDiaryTitle
    });
  };

  return (
    <div className={styles.diaryContainer}>
      {isEditDiary ? (
        <div className={styles.editInput}>
          <InputEditField
            defaultValue={diary?.diaryTitle as string}
            name={"title"}
            onChange={(e) => setEditDiaryTitle(e.target.value)}
            inputType={"input"}
          />
          <div>
            <button onClick={handleDiarySave}>저장</button>
            <button onClick={handleDiaryEdit}>취소</button>
          </div>
        </div>
      ) : (
        <div className={styles.diaryTitleView}>
          <h3>{diary?.diaryTitle}</h3>
          {isAuthor && <button onClick={handleDiaryEdit}>수정</button>}
        </div>
      )}

      <img src={diary?.diaryImage} className={styles.bgDiaryImage} />

      <div className={styles.diaries}>
        <img
          src={diary?.book.image}
          className={styles.bookImage}
          alt="책 표지"
        />
        <div className={styles.userImage}></div>
        <div className={styles.diariesText}>
          <div>
            <span className={styles.label}>책</span>
            <p className={styles.featuredTitle}>{diary?.book.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
