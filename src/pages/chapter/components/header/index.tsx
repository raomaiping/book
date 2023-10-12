import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Popup } from '@taoyage/react-mobile-ui';
import ListenImage from '@/assets/images/listen.png';
import { useAppSelector, useAppDispatch } from '@/store';
import Listen from '../listen';
import styles from './index.module.scss';
import { chapterActions } from '@/pages/chapter/store';
const ChapterHeader: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
  const [listenVisible, setListenVisible] = useState<boolean>(false);
  const onGoHome = () => {
    navigate('/');
  };

  const onBack = () => {
    navigate(-1);
  };
  const onShowListen = () => {
    setListenVisible(true);
    dispatch(chapterActions.setHeaderVisible(false));
    dispatch(chapterActions.setFooterNavBarVisible(false));
  };
  useEffect(() => {
    console.log(listenVisible);
  }, [listenVisible]);

  const rightRender = () => {
    return (
      <div className={styles.icons}>
        <img src={ListenImage} alt="listen" width="100%" onClick={onShowListen} />
        <i className="icon-home" onClick={onGoHome} />
      </div>
    );
  };

  return (
    <div className={styles.header}>
      <Popup position="top" visible={headerVisible} mask={false}>
        <NavBar right={rightRender()} onBack={onBack} />
      </Popup>
      <Popup position="bottom" visible={listenVisible} mask={false}>
        <Listen setVisible={setListenVisible} />
      </Popup>
    </div>
  );
});

export default ChapterHeader;
