import React from 'react';
import cx from 'classnames';
import { Image } from '@taoyage/react-mobile-ui';

import styles from './index.module.scss';

export interface BookCoverProps {
  src: string;
  alt: string;
  style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
  editMode?: boolean;
  active?: boolean;
}

const BookCover: React.FC<BookCoverProps> = React.memo((props) => {
  return (
    <div className={styles.bookCover}>
      <Image src={props.src} alt={props.alt} lazy={true} className={styles.coverImg} style={props.style} onError={(e) => {
   const img = e.target as HTMLImageElement;
   // 图片加载失败时，将src属性替换成备用图片的URL
   img.src = "https://wap.yingsx.com/css/noimg.jpg";
  }}/>
      {props.editMode && <i className={cx('icon-selector', styles.icon, { [styles.active]: props.active })} />}
    </div>
  );
});

export default BookCover;
