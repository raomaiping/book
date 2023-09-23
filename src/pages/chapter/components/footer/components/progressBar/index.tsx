import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cx from 'classnames';
import { Popup, Slider, SliderRef } from '@taoyage/react-mobile-ui';
import { useAppSelector } from '@/store';
import { MyContext } from '@/pages/chapter/constants';
import styles from './index.module.scss';

const ProgressBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();

  const footerProgressBarVisible = useAppSelector<boolean>((state) => state.chapter.footerProgressBarVisible);
  const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0);

  const sliderRef = React.useRef<SliderRef>(null);
  const { bookInfo } = useContext(MyContext);

  const { chapters = [] } = bookInfo || {};

  const isFirst = chapters[currentPageIndex]?.chapterId === chapters[0]?.chapterId;
  const isLast = chapters[currentPageIndex]?.chapterId === chapters[chapters.length - 1]?.chapterId;

  const onChangeAfter = (value: number) => {
    const chapterId = chapters[value - 1].chapterId;
    navigate(`/book/${bookId}/${chapterId}`, { replace: true });
  };

  const onChange = (value: number) => {
    setCurrentPageIndex(value - 1);
  };

  const onPrev = () => {
    if (isFirst) return;
    setCurrentPageIndex(currentPageIndex - 1);
    const chapterId = chapters[currentPageIndex - 1].chapterId;
    navigate(`/book/${bookId}/${chapterId}`, { replace: true });
  };

  const onNext = () => {
    if (isLast) return;
    setCurrentPageIndex(currentPageIndex + 1);
    const chapterId = chapters[currentPageIndex + 1].chapterId;
    navigate(`/book/${bookId}/${chapterId}`, { replace: true });
  };

  React.useEffect(() => {
    if (chapters.length === 1) return;
    const currentPageIndex = chapters.findIndex((chapter) => chapter.chapterId === chapterId);
    setCurrentPageIndex(Number(currentPageIndex));
  }, [chapterId, chapters]);

  React.useEffect(() => {
    if (chapters.length === 1) return;
    const element = sliderRef.current;
    if (!element) return;
    const currentPageIndex = chapters.findIndex((chapter) => chapter.chapterId === chapterId);
    sliderRef.current.setValue(currentPageIndex);
  }, [chapterId, chapters]);

  return (
    <Popup position="bottom" visible={footerProgressBarVisible} mask={false}>
      <div className={styles.progress}>
        <div className={styles.progressVal}>{chapters[currentPageIndex]?.chapterName}</div>
        <div className={styles.progressBar}>
          <div className={cx(styles.prev, { [styles.disable]: isFirst })} onClick={onPrev}>
            上一章
          </div>
          <div className={styles.slider}>
            <Slider
              ref={sliderRef}
              value={currentPageIndex}
              onChange={onChange}
              onChangeAfter={onChangeAfter}
              min={1}
              max={bookInfo?.chapters!.length}
            />
          </div>
          <div className={cx(styles.next, { [styles.disable]: isLast })} onClick={onNext}>
            下一章
          </div>
        </div>
      </div>
    </Popup>
  );
});

export default ProgressBar;
