import React from 'react';

import { Divider } from '@taoyage/react-mobile-ui';

import DetailNavBar from '@/pages/detail/components/detailHeader/components/detailNavBar';
import DetailBookInfo from '@/pages/detail/components/detailHeader/components/detailBookInfo';
import DetailBookCatalog from '@/pages/detail/components/detailHeader/components/detailBookCatalog';
import { BookInfo } from '@/types/book';
import styles from './index.module.scss';

const DetailHeader: React.FC<BookInfo> = React.memo((props) => {
  const { title } = props;
  return (
    <div className={styles.header}>
      <DetailNavBar title={title} />
      <DetailBookInfo {...props} />
      <Divider />
      <DetailBookCatalog {...props} />
    </div>
  );
});

export default DetailHeader;
