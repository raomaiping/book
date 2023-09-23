import React from 'react';
import cx from 'classnames';
import { Space } from '@taoyage/react-mobile-ui';

import { clearHistory, deleteHistory } from '@/pages/search/utils';
import { HISTORY_SEARCH_KEY } from '@/pages/search/constants';

import { searchActions } from '@/pages/search/store';

import { setUrlParams } from '@/utils/url';

import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { useAppSelector, useAppDispatch } from '@/store';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const SearchHistory: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const historyList = useReadLocalStorage<string[]>(HISTORY_SEARCH_KEY);
  const searchMode = useAppSelector<boolean>((state) => state.search.searchMode);

  const onClear = () => {
    clearHistory();
  };

  const onDelete = (e: React.MouseEvent) => {
    const name = (e.target as HTMLElement).dataset['name'] as string;
    deleteHistory(name);
  };

  const onSearch = (e: React.MouseEvent) => {
    const keyword = (e.target as HTMLElement).dataset['keyword'] as string;
    dispatch(searchActions.setSearchMode(true));
    setUrlParams([['keyword', keyword]], '/search');
    dispatch(searchActions.setSearchKeyword(keyword));
  };

  return (
    <div className={cx(styles.searchHistory, { [styles.hidden]: searchMode })}>
      <div className={styles.header}>
        <div className={styles.title}>搜索历史</div>
        <i className="icon-delete" onClick={onClear} />
      </div>

      <div className={styles.list}>
        <Space direction="vertical" gap={px2rem(20)}>
          {Array.isArray(historyList) &&
            historyList?.map((item) => (
              <div className={styles.listItem} key={item}>
                <div className={styles.name} data-keyword={item} onClick={onSearch}>
                  {item}
                </div>
                <i className="icon-close" data-name={item} onClick={onDelete} />
              </div>
            ))}
        </Space>
      </div>
    </div>
  );
});

export default SearchHistory;
