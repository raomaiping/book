import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ErrorBlock, Button } from '@taoyage/react-mobile-ui';
import { chapterActions } from '@/pages/chapter/store';
import { NIGHT_THEME, NIGHT_THEME_TEXT_COLOR, MyContext } from '@/pages/chapter/constants';
import Loading from '@/components/loading';
import { useRequest } from '@/hooks/useRequest';
import { useAppDispatch, useAppSelector } from '@/store';
import { ChapterInfo } from '@/types/book';
import { BASE_URL } from '@/constant';
import useSwitchPage from '@/hooks/useSwitchPage';
import styles from './index.module.scss';

const ChapterContent: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { bookId, chapterId } = useParams();

  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const footerNavBarVisible = useAppSelector<boolean>((state) => state.chapter.footerNavBarVisible);
  const theme = useAppSelector<string>((state) => state.chapter.theme);
  const fontSize = useAppSelector<number>((state) => state.chapter.fontSize);
  const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const { bookInfo, updateChapterInfo } = useContext(MyContext);
  const { error, data: chapterInfo } = useRequest<ChapterInfo>({
    url: `${BASE_URL}/api/yingsx/${bookId}/${chapterId}`,
  });
  const { chapters = [], id } = bookInfo || {};

  const onContent = () => {
    dispatch(chapterActions.setHeaderVisible(!headerVisible));
    dispatch(chapterActions.setFooterNavBarVisible(!footerNavBarVisible));
    dispatch(chapterActions.setFooterSettingBarVisible(false));
    dispatch(chapterActions.setFooterProgressBarVisible(false));
  };

  const renderChapter = (chapterInfo: ChapterInfo) => {
    return (
      <div key={chapterInfo.chapterId} data-id={chapterInfo.chapterId} id={id}>
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

  const { onNext, onPrev, isFirst, isLast } = useSwitchPage(chapters);
  React.useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    element.scrollTop = 0;
  }, [chapterId]);
  React.useEffect(() => {
    updateChapterInfo(chapterInfo);
    console.log(chapterInfo, 11);
  }, [chapterInfo, updateChapterInfo]);
  if (!chapterInfo) {
    return <Loading />;
  }

  if (error || !chapterInfo) {
    return <ErrorBlock />;
  }

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
