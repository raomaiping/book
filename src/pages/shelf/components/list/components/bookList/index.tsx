import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Space } from '@taoyage/react-mobile-ui';

import { BookCover } from '@/components';

import { shelfActions } from '@/pages/shelf/store';

import { useAppSelector, useAppDispatch } from '@/store';
import { BookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

export interface BookList {
  bookList: BookInfo[];
}

const BookList: React.FC<BookList> = React.memo((props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedBook = useAppSelector<BookInfo[]>((state) => state.shelf.selectedBook);

  const onBook = (book: BookInfo) => {
    if (!editMode) {
      navigate(`/book/${book.id}`);
    } else {
      dispatch(shelfActions.setSelectedBook(book));
    }
  };

  const getBookActive = (bookId: string) => {
    const index = selectedBook.findIndex((item) => bookId === item.id);
    return index === -1 ? false : true;
  };

  return (
    <>
      {props.bookList.map((book) => (
        <React.Fragment key={book.id}>
          <Grid.Item onClick={() => onBook(book)}>
            <div className={styles.bookCover}>
              <BookCover
                src={book.imgurl}
                alt={book.title}
                style={{ '--width': px2rem(96), '--height': px2rem(130) }}
                editMode={editMode}
                active={getBookActive(book.id)}
              />
            </div>
            <Space direction="vertical" gap={px2rem(6)}>
              <div className={styles.bookName}>{book.title}</div>
              <div className={styles.author}>{book.author}</div>
            </Space>
          </Grid.Item>
        </React.Fragment>
      ))}
    </>
  );
});

export default BookList;
