import { useState } from "react";
import styles from "../diaries.module.css";

import { DiaryWithUserType } from "@/services/types/dataTypes";
import { updateDiary } from "@/services/apis";
import { InputEditField } from "@/components";
import { validateValue } from "@/services/utils";

interface DiaryPropsType {
  diary: DiaryWithUserType | null;
  isAuthor: boolean;
  setDiary: React.Dispatch<React.SetStateAction<DiaryWithUserType | null>>;
}

export const DiaryItem = ({ diary, isAuthor, setDiary }: DiaryPropsType) => {

  const [isEditDiary, setIsEditDiary] = useState(false);
  const [editDiaryTItle, setEditDiaryTitle] = useState("");
  const handleDiaryEdit = () => {
    setIsEditDiary(!isEditDiary);
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
        ...(prevDiary as DiaryWithUserType),
        diaryTitle: response.diaryTitle as string
      }));

      setIsEditDiary(false); // 수정 모드 종료
    } catch (error) {
      console.error(error, "다이어리 제목 수정 에러");
    }
  };

  return (
    <div className={styles.diaryContainer}>
      <div>
        {isEditDiary ? (
          <InputEditField
            defaultValue={diary?.diaryTitle as string}
            name={"title"}
            onChange={(e) => setEditDiaryTitle(e.target.value)}
            inputType={"input"}
          />
        ) : (
          <div className={styles.titleBox}>
            <h3>{diary?.diaryTitle}</h3>
            {isAuthor && (
              <div className={styles.buttonBox}>
                {isEditDiary ? (
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
        )}
      </div>

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
