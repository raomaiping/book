import React from 'react';
import { Sidebar } from '@taoyage/react-mobile-ui';
import BookList from '@/pages/ranking/components/booklist';
import { TopBooks } from '@/types/book';
import styles from './index.module.scss';

const RankingContent: React.FC<{ data: TopBooks[] }> = React.memo((props) => {
  const { data } = props;

  const [activeKey, setActiveKey] = React.useState<string>(data[0].typeName);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className={styles.rankingContent}>
      <Sidebar activeKey={activeKey} onChange={onChange}>
        {data.map((item) => (
          <Sidebar.Item key={item.typeName} title={item.typeName}>
            {item.typeName === activeKey && <BookList list={item.list} />}
          </Sidebar.Item>
        ))}
      </Sidebar>
    </div>
  );
});

export default RankingContent;
