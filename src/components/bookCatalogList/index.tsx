import React, { useEffect, useRef } from 'react';
import { Space } from '@taoyage/react-mobile-ui';
import { ChapterInfo } from '@/types/book';
import BookCover from '@/components/bookCover';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

interface BookCatalogListProps {
  catalogList: ChapterInfo[];
  imgUrl: string;
  title: string;
  author: string;
  bookId: string;
  onClickChapter?: (chapterId: string) => void;
}

const BookCatalogList: React.FC<BookCatalogListProps> = React.memo((props) => {
  const { chapterId } = useParams();
  const currentIndex = props.catalogList.findIndex((item) => item.chapterId === chapterId);

  const scrollToRef = useRef(null);

  useEffect(() => {
    if (scrollToRef.current) {
      (scrollToRef.current as any).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [currentIndex]);

  const onGoChapter = async (chapterId: string) => {
    props?.onClickChapter?.(chapterId);
  };

  return (
    <div className={styles.catalogList}>
      <div className={styles.header}>
        <Space>
          <BookCover src={props.imgUrl} alt={props.title} />
          <div className={styles.meta}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.author}>{props.author}</div>
          </div>
        </Space>
      </div>
      <div className={styles.content}>
        {props.catalogList.map((item, index) => (
          <div
            key={item.chapterId}
            className={styles.catalogItem}
            style={{ color: currentIndex === index ? '#FFB7C5' : '' }}
            onClick={() => onGoChapter(item.chapterId)}
            ref={currentIndex === index ? scrollToRef : null}
          >
            {item.chapterName}
          </div>
        ))}
      </div>
    </div>
  );
});

export default BookCatalogList;
