import React from 'react';
import { useParams } from 'react-router-dom';
import ChapterHeader from '@/pages/chapter/components/header';
import ChapterContent from '@/pages/chapter/components/content';
import ChapterFooter from '@/pages/chapter/components/footer';
import { useRequest } from '@/hooks/useRequest';
import { createReducer } from '@/pages/chapter/store';
import { useReducer } from '@/store';
import { BASE_URL } from '@/constant';
import { BookInfo } from '@/types/book';
import { MyContext } from './constants';

const Chapter: React.FC = () => {
  const { bookId } = useParams();
  const { reducers } = React.useMemo(() => createReducer('chapter'), []);

  const { data: bookInfo } = useRequest<BookInfo>({
    url: `${BASE_URL}/api/yingsx/detail/${bookId}`,
  });
  console.log(bookInfo);

  useReducer(reducers);
  return (
    <MyContext.Provider value={{ bookInfo }}>
      <ChapterHeader />
      <ChapterContent />
      <ChapterFooter />
    </MyContext.Provider>
  );
};

export default Chapter;
