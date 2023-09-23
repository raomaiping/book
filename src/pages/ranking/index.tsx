import React from 'react';
import { ErrorBlock } from '@taoyage/react-mobile-ui';
import { Loading } from '@/components';
import { useRequest } from '@/hooks/useRequest';
import RankingHeader from '@/pages/ranking/components/header';
import RankingContent from '@/pages/ranking/components/content';
import { BASE_URL } from '@/constant';
import { TopBooks } from '@/types/book';
import styles from './index.module.scss';

const Ranking: React.FC = React.memo(() => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>('allvote');
  const { data, error } = useRequest<TopBooks[]>({ url: `${BASE_URL}/api/yingsx/top?type=${activeTabKey}` });
  if (error) {
    return <ErrorBlock />;
  }
  return (
    <div className={styles.ranking}>
      <RankingHeader activeTabKey={activeTabKey} setActiveTabKey={setActiveTabKey} />
      {!data ? <Loading /> : <RankingContent data={data} />}
    </div>
  );
});

export default Ranking;
