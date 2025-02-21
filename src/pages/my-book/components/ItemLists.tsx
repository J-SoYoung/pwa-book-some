import { DiariesType } from "@/services/types/dataTypes";
import { Items } from "@/components/items/Items";
import styles from "./itemLists.module.css";

interface ItemListsProps {
  diaries: DiariesType[];
  noDataText: string;
}

export const ItemLists = ({
  diaries,
  noDataText
}: ItemListsProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.itemListsBox}>
        {diaries.length > 0 ? (
          <>
            {diaries.map((diary) => {
              const data = {
                url: `/diaries/${diary.diaryId}`,
                imageUrl: diary.book.image,
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
