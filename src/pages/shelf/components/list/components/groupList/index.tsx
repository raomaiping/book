import React from 'react';
import cx from 'classnames';
import { Grid, Popup } from '@taoyage/react-mobile-ui';

import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { BookCover } from '@/components';

import { shelfActions } from '@/pages/shelf/store';
import BookList from '@/pages/shelf/components/list/components/bookList';

import { useAppSelector, useAppDispatch } from '@/store';
import { BookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';

import styles from './index.module.scss';

const GroupList: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);
  const selectedGroup = useAppSelector<string[]>((state) => state.shelf.selectedGroup);

  const [visible, setVisible] = React.useState<boolean>(false);
  const [bookList, setBookList] = React.useState<BookInfo[]>([]);

  const groupList = useReadLocalStorage<Record<string, BookInfo[]>>('shelf-group') || {};

  const onGoup = (groupName: string) => {
    if (editMode) {
      dispatch(shelfActions.setSelectedGroup(groupName));
    } else {
      setVisible(true);
      setBookList(groupList[groupName]);
    }
  };

  const getGroupActive = (groupName: string) => {
    const index = selectedGroup.findIndex((name) => name === groupName);
    return index === -1 ? false : true;
  };

  return (
    <>
      {Object.keys(groupList).map((groupName: string) => (
        <Grid.Item key={groupName} onClick={() => onGoup(groupName)}>
          <div className={styles.group}>
            <Grid columns={2} gap={px2rem(5)}>
              {groupList[groupName].map((book) => (
                <Grid.Item key={book.id}>
                  <BookCover
                    alt={book.title}
                    src={book.imgurl}
                    style={{ '--width': px2rem(40), '--height': px2rem(57) }}
                  />
                </Grid.Item>
              ))}
            </Grid>
            {editMode && (
              <i className={cx('icon-selector', styles.icon, { [styles.active]: getGroupActive(groupName) })} />
            )}
          </div>
          <div className={styles.groupName}>{groupName}</div>
        </Grid.Item>
      ))}
      <Popup visible={visible} position="bottom" onMaskClick={() => setVisible(false)} className={styles.groupPopup}>
        <Grid columns={3} gap={px2rem(20)}>
          <BookList bookList={bookList} />
        </Grid>
      </Popup>
    </>
  );
});

export default GroupList;
