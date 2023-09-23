import React from 'react';
import { Ellipsis, Space } from '@taoyage/react-mobile-ui';
import BookCover from '@/components/bookCover';
import { BookInfo } from '@/types/book';
import styles from './index.module.scss';
import { px2rem } from '@/utils/unit';

const DetailBookInfo: React.FC<BookInfo> = React.memo((props) => {
  const { desc = [], typeName = '', author = '', title = '', imgurl = '' } = props;
  const newDesc = (desc as []).join('\n');
  return (
    <div className={styles.bookInfo}>
      <Space gap={px2rem(12)}>
        <BookCover src={imgurl} alt={title} style={{ '--width': px2rem(84), '--height': px2rem(112) }} />
        <Space direction="vertical" justify="center" gap={px2rem(10)}>
          <div className={styles.bookName}>{title}</div>
          <div className={styles.author}>{author}</div>
          <div className={styles.category}>{typeName}</div>
        </Space>
      </Space>
      <div className={styles.desc}>
        <Ellipsis text={newDesc} rows={4} expand="展开" collapse="收起" />
      </div>
    </div>
  );
});

export default DetailBookInfo;
