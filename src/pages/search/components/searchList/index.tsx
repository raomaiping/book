import React from 'react';
import { useNavigate } from 'react-router-dom';
import cx from 'classnames';
import { ErrorBlock, Grid, Space } from '@taoyage/react-mobile-ui';
import { Loading, BookCover } from '@/components';
import { useRequest } from '@/hooks/useRequest';
import { BookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';
import { useAppSelector } from '@/store';
import { BASE_URL } from '@/constant';
import styles from './index.module.scss';

const SearchList: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const searchKeyword = useAppSelector<string>((state) => state.search.searchKeyword);
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);

  const { data, error, mutate } = useRequest<BookInfo[]>({
    url: `${BASE_URL}/api/yingsx/search`,
    params: { keyWord: searchKeyword },
  });

  // todo: update
  React.useEffect(() => {
    if (searchKeyword) {
      mutate();
    }
  }, [mutate, searchKeyword]);

  if (error && searchMode) {
    return <ErrorBlock />;
  }

  if (!data && searchMode) {
    return <Loading />;
  }

  return (
    <div className={cx(styles.searchList, { [styles.hidden]: !searchMode })}>
      <Grid columns={1} gap={px2rem(24)}>
        {data?.map((book) => (
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
        ))}
      </Grid>
    </div>
  );
});

export default SearchList;
