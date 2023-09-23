import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Popup } from '@taoyage/react-mobile-ui';
import BookCatalogList from '@/components/bookCatalogList';
import { BookInfo } from '@/types/book';
import styles from './index.module.scss';

const DetailBookCatalog: React.FC<BookInfo> = React.memo((props) => {
  const { chapters = [], id = '', imgurl = '', author = '', title = '' } = props;
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState<boolean>(false);

  const threeChapters = React.useMemo(() => {
    return chapters.slice(-3).reverse();
  }, [chapters]);

  const onCancel = () => {
    setVisible(false);
  };

  const onShow = () => {
    setVisible(true);
  };

  const onClickChapter = (chapter: string) => {
    navigate(`/book/${id}/${chapter}`);
  };

  return (
    <div className={styles.catalog}>
      <Space direction="vertical">
        {threeChapters.map((item) => (
          <div className={styles.catalogItem} key={item.chapterId} onClick={() => onClickChapter(item.chapterId)}>
            {item.chapterName}
          </div>
        ))}
      </Space>

      <div className={styles.catalogBtn} onClick={onShow}>
        <div className={styles.icon}>
          <i className="icon-catalog" />
        </div>
        <div>目录</div>
      </div>

      <Popup visible={visible} onMaskClick={onCancel}>
        <BookCatalogList
          catalogList={chapters}
          author={author}
          title={title}
          imgUrl={imgurl}
          bookId={id}
          onClickChapter={onClickChapter}
        />
      </Popup>
    </div>
  );
});

export default DetailBookCatalog;
