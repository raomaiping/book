import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorBlock, Button } from '@taoyage/react-mobile-ui';

import { chapterActions } from '@/pages/chapter/store';
import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR, MyContext } from '@/pages/chapter/constants';

import Loading from '@/components/loading';
import { useRequest } from '@/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/store';
import { ChapterInfo } from '@/types/book';
import { BASE_URL } from '@/constant';
import styles from './index.module.scss';

const ChapterContent: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const { bookInfo } = useContext(MyContext);
  const { error, data: chapterInfo } = useRequest<ChapterInfo>({
    url: `${BASE_URL}/api/yingsx/${bookId}/${chapterId}`,
  });
  const { chapters = [] } = bookInfo || {};

  const isFirst = chapterId === chapters[0]?.chapterId;
  const isLast = chapterId === chapters[chapters.length - 1]?.chapterId;

  const onContent = () => {
    dispatch(chapterActions.setHeaderVisible(!headerVisible));
    dispatch(chapterActions.setFooterNavBarVisible(!footerNavBarVisible));
    dispatch(chapterActions.setFooterSettingBarVisible(false));
    dispatch(chapterActions.setFooterProgressBarVisible(false));
  };

  const renderChapter = (chapterInfo: ChapterInfo) => {
    return (
      <div key={chapterInfo.chapterId} data-id={chapterInfo.chapterId}>
        <h1>{chapterInfo.chapterName}</h1>
        {(chapterInfo?.content || []).map((item, index) => {
          return (
            <p
              key={index}
              style={{
                lineHeight: `${fontSize * 2.5}px`,
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    );
  };

  const onPrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isFirst) return;
    const index = chapters.findIndex((chapter) => chapter.chapterId === chapterId) - 1;
    navigate(`/book/${bookId}/${chapters[index].chapterId}`, { replace: true });
  };

  const onNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isLast) return;
    const index = chapters.findIndex((chapter) => chapter.chapterId === chapterId) + 1;
    navigate(`/book/${bookId}/${chapters[index].chapterId}`, { replace: true });
  };

  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    element.scrollTop = 0;
  }, [chapterId]);

  if (!chapterInfo) {
    return <Loading />;
  }

  if (error || !chapterInfo) {
    return <ErrorBlock />;
  }
  console.log(fontSize);

  return (
    <div
      className={styles.content}
      ref={contentRef}
      onClick={onContent}
      style={{
        background: nightTheme ? NIGHT_THEME : theme,
        fontSize: fontSize,
        color: nightTheme ? NIGHT_THEME_TEXT_COLOR : '',
      }}
    >
      {renderChapter(chapterInfo)}
      <div className={styles.pagination}>
        <Button onClick={onPrev} disabled={isFirst}>
          上一章
        </Button>
        <Button onClick={onNext} disabled={isLast}>
          下一章
        </Button>
      </div>
    </div>
  );
});

export default ChapterContent;
