import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tabs, Grid, Space } from '@taoyage/react-mobile-ui';
import { BookCover } from '@/components';
import { TopBooks } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const Ranking: React.FC<{ data: TopBooks[] }> = React.memo((props) => {
  const navigate = useNavigate();
  const { data } = props;

  const renderList = React.useCallback(
    (item: TopBooks) => {
      return item.list.map((book) => (
        <React.Fragment key={book.id}>
          <Grid.Item onClick={() => navigate(`/book/${book.id}`)}>
            <Space>
              <BookCover src={book.imgurl} alt={book.title} style={{ '--width': px2rem(47), '--height': px2rem(66) }} />
              <div className={styles.bookInfo}>
                <div className={styles.bookName}>{book.title}</div>
              </div>
            </Space>
          </Grid.Item>
        </React.Fragment>
      ));
    },
    [navigate]
  );

  const renderTab = React.useMemo(() => {
    return data.slice(0, 3).map((item, index) => (
      <Tabs.Tab title={item.typeName} key={`${index + 1}`}>
        <Grid columns={2} gap={[0, px2rem(16)]}>
          {renderList(item)}
        </Grid>
      </Tabs.Tab>
    ));
  }, [data, renderList]);

  const onHeaderClick = React.useCallback(() => {
    navigate('/ranking');
  }, [navigate]);

  return (
    <div className={styles.ranking}>
      <Card
        title="排行榜"
        extra="更多"
        titleClassName={styles.title}
        headerClassName={styles.header}
        onHeaderClick={onHeaderClick}
      >
        <Tabs
          activeKey="1"
          showTabLine={false}
          type="card"
          tabActiveClassName={styles.tabActive}
          tabListClassName={styles.tabList}
          tabContentClassName={styles.tabContent}
        >
          {renderTab}
        </Tabs>
      </Card>
    </div>
  );
});

export default Ranking;
