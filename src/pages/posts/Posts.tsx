import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import styles from "./post.module.css";
import { userState } from "@/recoil/atoms";
import { createDiaryPost, getDiaryList } from "@/services/apis";
import { DiariesType, UserType } from "@/types";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userState) as UserType;
  const [diaryList, setDiaryList] = useState<DiariesType[]>([]);

  const [newDiaryData, setNewDiaryData] = useState({
    diaryId: "",
    title: "",
    content: ""
  });

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diaryData = await getDiaryList(user.userId);
      setDiaryList(diaryData);
    };

    fetchDiaryList();
  }, [user.userId]);


  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postId = uuidv4();
    try {
      const newPostData = {
        diaryId : newDiaryData.diaryId , 
        post : {
          id: postId,
          title: newDiaryData.title,
          content: newDiaryData.content,
          createdAt: new Date().toISOString()
        } 
      }
      const result = await createDiaryPost(newPostData)
      if(result) navigate(`/diaries/${newDiaryData.diaryId}`)
    } catch (error) {
      console.error(error);
    }
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
              onChange={(e) =>
                setNewDiaryData({ ...newDiaryData, diaryId: e.target.value })
              }
            >
              <option value="" disabled selected>
                다이어리를 선택해주세요
              </option>
              {diaryList.map((diary, idx) => (
                <option key={diary.id} value={diary.id}>
                  {`[${idx + 1}] ${diary.title} - ${diary.bookTitle?.slice(
                    0,
                    10
                  )}..`}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label className={styles.label}>
          오늘의 독서 제목을 적어주세요.
          <input
            type="text"
            value={newDiaryData.title}
            onChange={(e) =>
              setNewDiaryData({ ...newDiaryData, title: e.target.value })
            }
            placeholder="오늘 작성된 감상평의 제목이 됩니다."
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          오늘 읽은 부분을 기록해보세요.
          <textarea
            placeholder="나의 느낀점을 자유롭게 작성해보세요"
            className={styles.textarea}
            value={newDiaryData.content}
            onChange={(e) =>
              setNewDiaryData({ ...newDiaryData, content: e.target.value })
            }
          ></textarea>
        </label>

        <button type="submit" className={styles.submitButton}>
          글작성
        </button>
      </form>
    </div>
  );
};
