import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Space, Grid } from '@taoyage/react-mobile-ui';
import { BookCover } from '@/components';
import { HomeCardData } from '@/pages/home/types';
import { px2rem } from '@/utils/unit';
import styles from './index.module.scss';

const Popular: React.FC<HomeCardData> = React.memo((props) => {
  const { list = [], typeName = '' } = props;

  const navigate = useNavigate();

  const renderContent = React.useMemo(() => {
    return list.map((book) => (
      <Grid.Item key={book.id} onClick={() => navigate(`/book/${book.id}`)}>
        <Space gap={px2rem(12)}>
          <BookCover src={book.imgurl} alt={book.title} />
          <Space direction="vertical" justify="between" gap={px2rem(12)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.desc}>{book.desc}</div>
            <div className={styles.meta}>
              {book.author}·{book.typeName}
            </div>
          </Space>
        </Space>
      </Grid.Item>
    ));
  }, [list, navigate]);

  return (
    <div className={styles.popular}>
      <Card title={typeName} headerClassName={styles.header}>
        <Grid columns={1} gap={px2rem(24)}>
          {renderContent}
        </Grid>
      </Card>
    </div>
  );
});

export default Popular;
