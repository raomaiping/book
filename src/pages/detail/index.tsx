import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBlock } from '@taoyage/react-mobile-ui';

import DetailHeader from '@/pages/detail/components/detailHeader';
import DetailFooter from '@/pages/detail/components/detailFooter';
import DetailContent from '@/pages/detail/components/detailContent';

import { Loading } from '@/components';
import { BASE_URL } from '@/constant';
import useRequest from '@/hooks/useRequest/useRequest';
import { BookInfo, ChapterInfo } from '@/types/book';

const Detail: React.FC = React.memo(() => {
  const { data, error } = useRequest<BookInfo>({
    url: `${BASE_URL}/api/yingsx/detail/${useParams().id}`,
  });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <DetailHeader {...data} />
      <DetailContent chapterInfo={data.chapterInfo as ChapterInfo} />
      <DetailFooter bookInfo={data} />
    </>
  );
});

export default Detail;
