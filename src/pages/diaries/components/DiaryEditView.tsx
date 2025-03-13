import { validateValue } from "@/shared/services/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateDiary } from "../service/updateFirebaseData";
import { InputEditField } from "@/shared/components";
import styles from "../styles/diaries.module.css";
import { DiaryWithUserType } from "@/shared/types/dataTypes";

type DiaryEditViewProps = {
  setIsEditDiary: React.Dispatch<React.SetStateAction<boolean>>;
  isEditDiary: boolean;
  diary: DiaryWithUserType;
};

export const DiaryEditView = ({
  setIsEditDiary,
  isEditDiary,
  diary
}: DiaryEditViewProps) => {
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

  const handleDiarySave = async () => {
    const validate = validateValue(editDiaryTitle);
    if (!validate.valid) return alert(validate.message);

    mutation.mutate({
      diaryId: diary?.diaryId as string,
      newTitle: editDiaryTitle
    });
  };

  const handleDiaryEdit = () => {
    setIsEditDiary(!isEditDiary);
  };

  return (
    <>
      <div className={styles.diaryEditTitleView}>
        <InputEditField
          defaultValue={diary?.diaryTitle as string}
          name={"title"}
          onChange={(e) => setEditDiaryTitle(e.target.value)}
          inputType={"input"}
        />
      </div>
      <div>
        <button onClick={handleDiarySave}>저장</button>
        <button onClick={handleDiaryEdit}>취소</button>
      </div>
    </>
  );
};
