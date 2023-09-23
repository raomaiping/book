import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Space } from '@taoyage/react-mobile-ui';
import { BookCover } from '@/components';
import { BookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

interface RankingBookListProps {
  list: BookInfo[];
}

const RankingBookList: React.FC<RankingBookListProps> = React.memo((props) => {
  const { list } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.rankingBookList}>
      <Grid columns={1} gap={px2rem(24)}>
        {list.map((book) => (
          <Grid.Item key={book.id} onClick={() => navigate(`/book/${book.id}`)}>
            <Space gap={px2rem(12)}>
              <BookCover src={book.imgurl} alt={book.title} />
              <Space direction="vertical" justify="between" gap={px2rem(12)}>
                <div className={styles.bookName}>{book.title}</div>
                {/* <div className={styles.desc}>{book.desc}</div> */}
                <div className={styles.meta}>
                  {book.author}·{book.typeName}
                </div>
              </Space>
            </Space>
          </Grid.Item>
        ))}
      </Grid>
    </div>
  );
});

export default RankingBookList;
