import React from 'react';
import { ErrorBlock, Space, PullToRefresh } from '@taoyage/react-mobile-ui';

import { Loading } from '@/components';
import Header from '@/pages/home/components/header';
import Navbar from '@/pages/home/components/navbar';
import Popular from '@/pages/home/components/popular';
import Ranking from '@/pages/home/components/ranking';
import Recommend from '@/pages/home/components/recommend';
import { HomeData } from '@/pages/home/types';
import { BASE_URL } from '@/constant';
import useRequest from '@/hooks/useRequest/useRequest';
import { px2rem } from '@/utils/unit';
import { TopBooks } from '@/types/book';
import styles from './index.module.scss';

const Home: React.FC = React.memo(() => {
  const { data, error, mutate } = useRequest<HomeData>({ url: `${BASE_URL}/api/yingsx` });
  const { data: topBooks = [] } = useRequest<TopBooks[]>({ url: `${BASE_URL}/api/yingsx/top` });
  const { rm, tj, zjgx } = data || {};

  if (error) {
    return <ErrorBlock />;
  }

  if (!data || topBooks.length === 0) {
    return <Loading />;
  }

  return (
    <PullToRefresh onRefresh={mutate}>
      <div className={styles.home}>
        <Space direction="vertical" gap={px2rem(20)}>
          <Header />
          <Navbar />

          <Recommend {...tj} />
          <Ranking data={topBooks} />
          <Popular {...rm} />
          <Recommend {...zjgx} />
        </Space>
      </div>
    </PullToRefresh>
  );
});

export default Home;
