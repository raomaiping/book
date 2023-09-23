import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Grid, Space } from '@taoyage/react-mobile-ui';
import { BookCover } from '@/components';
import { px2rem } from '@/utils/unit';
import { HomeCardData } from '@/pages/home/types';
import styles from './index.module.scss';

const Recommend: React.FC<HomeCardData> = React.memo((props) => {
  const { list = [], typeName = '' } = props;
  const navigate = useNavigate();

  const renderContent = React.useMemo(() => {
    return list.map((book) => (
      <React.Fragment key={book.id}>
        <Grid.Item onClick={() => navigate(`/book/${book.id}`)}>
          <BookCover src={book.imgurl} alt={book.title} />
          <Space direction="vertical" gap={px2rem(6)}>
            <div className={styles.bookName}>{book.title}</div>
            <div className={styles.author}>{book.author}</div>
          </Space>
        </Grid.Item>
      </React.Fragment>
    ));
  }, [list, navigate]);
  const columns = list.length < 4 ? list.length : 4;

  return (
    <div className={styles.recommend}>
      <Card title={typeName} titleClassName={styles.title} headerClassName={styles.header}>
        <Grid columns={columns} gap={px2rem(16)}>
          {renderContent}
        </Grid>
      </Card>
    </div>
  );
});

export default Recommend;
