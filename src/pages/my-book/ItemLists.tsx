import { DiariesType } from "@/services/types/dataTypes";
import { Items } from "@/components/items/Items";
import styles from "./mybook.module.css";

interface ItemListsProps {
  sectionTitle: string;
  diaries: DiariesType[];
  noDataText: string;
}

export const ItemLists = ({
  sectionTitle,
  diaries,
  noDataText
}: ItemListsProps) => {
  return (
    <section className={styles.section}>
      <h3>{sectionTitle}</h3>
      <div className={styles.itemListsBox}>
        {diaries.length > 0 ? (
          <>
            {diaries.map((diary) => {
              const data = {
                url: `/diaries/${diary.diaryId}`,
                imageUrl: diary.bookImage,
                title: diary.diaryTitle
              };
              return <Items data={data} key={diary.diaryId} />;
            })}
          </>
        ) : (
          <p>{noDataText}</p>
        )}
      </div>
    </section>
  );
};
