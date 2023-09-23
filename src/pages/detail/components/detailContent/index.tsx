import React from 'react';
import { ChapterInfo } from '@/types/book';
import styles from './index.module.scss';

const DetailContent: React.FC<{ chapterInfo: ChapterInfo }> = React.memo((props) => {
  const { content = [], chapterName = '' } = props.chapterInfo;
  return (
    <div className={styles.detailContent}>
      <h1>{chapterName}</h1>
      {content.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
});

export default DetailContent;
