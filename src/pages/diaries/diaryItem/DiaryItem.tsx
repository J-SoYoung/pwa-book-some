import { useState } from "react";
import styles from "../diaries.module.css";

import { DiariesType } from "@/services/types";
import { updateDiary } from "@/services/apis";
import { InputField } from "@/components";
import { validateValue } from "@/services/utils";

interface DiaryPropsType {
  diary: DiariesType | null;
  isAuthor: boolean;
  setDiary: React.Dispatch<React.SetStateAction<DiariesType | null>>;
}

export const DiaryItem = ({ diary, setDiary, isAuthor }: DiaryPropsType) => {
  console.log(diary);

  const [isDiaryEdit, setIsDiaryEdit] = useState(false);
  const [editDiaryTItle, setEditDiaryTitle] = useState("");

  const handleDiaryEdit = () => {
    setIsDiaryEdit(!isDiaryEdit);
  };

  const handleDiarySave = async () => {
    const validate = validateValue(editDiaryTItle);
    if (!validate.valid) return alert(validate.message);

    try {
      const response = await updateDiary({
        diaryId: diary?.diaryId as string,
        newTitle: editDiaryTItle
      });

      setDiary((prevDiary) => ({
        ...(prevDiary as DiariesType),
        diaryTitle: response.diaryTitle as string
      }));

      setIsDiaryEdit(false); // 수정 모드 종료
    } catch (error) {
      console.error(error, "다이어리 제목 수정 에러");
    }
  };

  return (
    <div className={styles.diaries}>
      <img src={diary?.bookImage} />
      <div className={styles.diariesdText}>
        <div>
          <span className={styles.label}>다이어리</span>
          {isDiaryEdit ? (
            <InputField
              label={""}
              value={editDiaryTItle}
              name={"title"}
              onChange={(e) => setEditDiaryTitle(e.target.value)}
              placeholder={"수정할 다이어리 제목을 적어주세요"}
            />
          ) : (
            <p className={styles.featuredDescription}>{diary?.diaryTitle}</p>
          )}
        </div>

        <div>
          <span className={styles.label}>책</span>
          <p className={styles.featuredTitle}>{diary?.bookTitle}</p>
        </div>
      </div>

      {isAuthor && (
        <div className={styles.buttonBox}>
          {isDiaryEdit ? (
            <>
            <button onClick={handleDiarySave}>저장</button>
            <button onClick={handleDiaryEdit}>취소</button>
            </>
          ) : (
            <button onClick={handleDiaryEdit}>수정</button>
          )}
        </div>
      )}
    </div>
  );
};
