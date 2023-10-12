import React, { useEffect, useState, useContext, useRef } from 'react';
import { MyContext } from '@/pages/chapter/constants';
import { NavBar } from '@taoyage/react-mobile-ui';
import useSwitchPage from '@/hooks/useSwitchPage';
import PlayImage from '@/assets/images/play.png';
import PrevImage from '@/assets/images/prev.png';
import NextImage from '@/assets/images/next.png';
import PauseImage from '@/assets/images/pause.png';
import TextToSpeechReader from '@/utils/textToSpeechReader';
import styles from './index.module.scss';

interface ListenProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Listen: React.FC<ListenProps> = React.memo((props) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const { setVisible } = props;
  const { bookInfo, chapterInfo } = useContext(MyContext);
  const { imgurl, title, author, id, chapters = [] } = bookInfo || {};
  const [play, setPlay] = useState<boolean>(false);
  const [textReader, setTextReader] = useState<TextToSpeechReader>();
  const [isListening, setIsListening] = useState(false);
  const { onNext, onPrev, isFirst, isLast } = useSwitchPage(chapters);
  const prev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onPrev(e);
    setIsListening(true);
    setPlay(false);
  };
  const next = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onNext(e);
    setIsListening(true);
    setPlay(false);
  };
  useEffect(() => {
    if (id && chapterInfo) {
      if (!textReader) {
        const t = new TextToSpeechReader({
          id,
          endPlay: () => {
            // 通过ref引用来访问按钮元素，并触发点击事件
            if (buttonRef.current) {
              buttonRef.current.click();
            }
          },
        });
        setTextReader(t);
      } else {
        textReader.destroy();
        textReader.initData(id);
      }
    }
  }, [id, chapterInfo, textReader]);
  useEffect(() => {
    if (isListening && chapterInfo) {
      setTimeout(() => {
        setPlay(true);
        setIsListening(false);
      }, 3000);
    }
  }, [chapterInfo, isListening]);

  useEffect(() => {
    if (!textReader) return;
    if (play) {
      textReader.startReading();
    } else {
      textReader.stopReading();
    }
  }, [textReader, play]);
  const className = !play ? styles.cd : `${styles.cd} ${styles.playing}`;

  return (
    <div className={styles.listen}>
      <div className={styles.background}>
        <img src={imgurl} alt="" />
      </div>
      <NavBar onBack={() => setVisible(false)}>
        {title} - {author}
      </NavBar>
      <div className={styles.middle}>
        <div className={styles['middle-l']}>
          <div className={styles['cd-wrapper']}>
            <div className={className}>
              <img src={imgurl} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.operators}>
          <div className={styles.icon} onClick={prev}>
            <img src={PrevImage} alt="" />
          </div>
          <div className={styles.icon} onClick={() => setPlay(!play)}>
            <img src={play ? PauseImage : PlayImage} alt="" />
          </div>
          <div className={styles.icon} onClick={next} ref={buttonRef}>
            <img src={NextImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Listen;
