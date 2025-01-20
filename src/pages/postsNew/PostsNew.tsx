import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./postNew.module.css";
import { SearchModal } from "./modal/SearchModal";
import { createNewDiaryPost } from "@/services/apis";
import { userState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";
import { NewDiaryDataType, SelectedBookType, UserType } from "@/services/types";
import { useLocation, useNavigate } from "react-router-dom";
import { InputField, TextareaField } from "@/components";

export const PostsNew = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = useRecoilValue(userState);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SelectedBookType>();
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
    console.log([e.target.name], e.target.value);
    setDiaryData({ ...diaryData, [e.target.name]: e.target.value });
  };
  const onSelectBook = (book: SelectedBookType) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const diaryId = uuidv4();
    const postId = uuidv4();
    try {
      if (selectedBook) {
        const newDiaryData: NewDiaryDataType = {
          books: {
            link: selectedBook.link,
            isbn: selectedBook.isbn,
            author: selectedBook.author,
            title: selectedBook.title,
            image: selectedBook.image,
            description: selectedBook.description
          },
          diaries: {
            diaryId: diaryId,
            diaryTitle: diaryData.diaryTitle,
            createdAt: new Date().toISOString()
          },
          posts: {
            id: postId,
            title: diaryData.todayTitle,
            content: diaryData.content,
            createdAt: new Date().toISOString()
          },
          user: user as UserType
        };
        const result = await createNewDiaryPost(newDiaryData);
        if (result) navigate("/home");
      }
    } catch (error) {
      console.error(error);
      alert(error);
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
            📓 BOOK{" "}
          </button>
          {showModal && (
            <SearchModal
              onClose={() => {
                setShowModal(false);
              }}
              onSelect={onSelectBook}
            />
          )}
        </div>

        <div className={styles.bookInfo}>
          <img src={selectedBook?.image ?? ""} className={styles.bookImage} />
          <div className={styles.bookDetails}>
            <strong>{selectedBook?.title ?? ""}</strong>
            <p>{selectedBook?.author ?? ""}</p>
          </div>
        </div>
      </div>

      <form className={styles.form} onSubmit={onSubmitForm}>
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
          placeholder={"포스팅 내용용이 됩니다"}
        />
        <button type="submit" className={styles.submitButton}>
          글작성
        </button>
      </form>
    </div>
  );
};
