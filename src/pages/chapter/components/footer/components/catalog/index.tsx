import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Popup } from '@taoyage/react-mobile-ui';
import BookCatalogList from '@/components/bookCatalogList';
import { MyContext } from '@/pages/chapter/constants';
import { chapterActions } from '@/pages/chapter/store';
import { useAppSelector, useAppDispatch } from '@/store';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const catalogVisible = useAppSelector<boolean>((state) => state.chapter.catalogVisible);
  const { bookInfo } = useContext(MyContext);
  const { chapters = [], author = '', title = '', imgurl = '', id = '' } = bookInfo || {};
  const onMaskClick = () => {
    dispatch(chapterActions.setCatalogVisible(false));
  };

  const onClickChapter = (chapter: string) => {
    navigate(`/book/${bookInfo?.id}/${chapter}`, { replace: true });
    dispatch(chapterActions.setCatalogVisible(false));
  };

  return (
    <Popup visible={catalogVisible} onMaskClick={onMaskClick}>
      {bookInfo && (
        <BookCatalogList
          catalogList={chapters}
          author={author}
          title={title}
          imgUrl={imgurl}
          bookId={id}
          onClickChapter={onClickChapter}
        />
      )}
    </Popup>
  );
};

export default Catalog;
