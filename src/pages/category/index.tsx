import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, ErrorBlock, Grid, Space } from '@taoyage/react-mobile-ui';

import { Category } from '@/pages/category/types';
import { BookCover, Loading } from '@/components';
import { useRequest } from '@/hooks/useRequest';

import { px2rem } from '@/utils/unit';
import { BASE_URL } from '@/constant';
import styles from './index.module.scss';

const CategoryPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { data, error } = useRequest<Category[]>({ url: `${BASE_URL}/api/yingsx/typelist` });

  const onBack = React.useCallback(() => {
    navigate(-1);
  }, []);

  const onCategoryItem = React.useCallback((key: string) => {
    navigate(`/book-list/${key}`);
  }, []);

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.category}>
      <NavBar onBack={onBack}>分类</NavBar>
      <div className={styles.categoryContent}>
        <Grid columns={2} gap={16}>
          {data?.map((category) => (
            <Grid.Item span={1} key={category.id} onClick={() => onCategoryItem(category.id)}>
              <div className={styles.categoryItem}>
                <Space gap={px2rem(12)}>
                  <div className={styles.bookCover}>
                    <BookCover
                      src={category.imgurl}
                      alt={category.name}
                      style={{ '--height': px2rem(51), '--width': px2rem(40) }}
                    />
                  </div>
                  <Space direction="vertical">
                    <div className={styles.name}>{category.name}</div>
                  </Space>
                </Space>
              </div>
            </Grid.Item>
          ))}
        </Grid>
      </div>
    </div>
  );
});

export default CategoryPage;
