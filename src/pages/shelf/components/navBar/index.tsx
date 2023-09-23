import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@taoyage/react-mobile-ui';

import { shelfActions } from '@/pages/shelf/store';
import { useAppDispatch, useAppSelector } from '@/store';

import styles from './index.module.scss';

const Header: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const editMode = useAppSelector<boolean>((state) => state.shelf.editMode);

  const onBack = () => {
    navigate('/');
  };

  const onEdit = () => {
    dispatch(shelfActions.clearSelectedBook([]));
    dispatch(shelfActions.setEditMode(!editMode));
  };

  return (
    <NavBar
      onBack={onBack}
      right={
        <div className={styles.right} onClick={onEdit}>
          {editMode ? '完成' : '编辑'}
        </div>
      }
    >
      我的书架
    </NavBar>
  );
});

export default Header;
