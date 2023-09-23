import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@taoyage/react-mobile-ui';

import styles from './index.module.scss';

const DetailNavBar: React.FC<{ title: string }> = React.memo((props) => {
  const navigate = useNavigate();
  const [fixedMode, setFixedMode] = React.useState<boolean>(false);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const onBack = () => {
    navigate(-1);
  };

  const onScroll = (e: Event) => {
    const offsetY = (e.target as HTMLElement).scrollTop || window.pageYOffset || document.body.scrollTop;
    if (offsetY > wrapRef.current!.offsetHeight) {
      setFixedMode(true);
    } else {
      setFixedMode(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return (
    <div className={styles.navBar} ref={wrapRef}>
      <NavBar onBack={onBack} style={{ background: fixedMode ? '#fff' : 'none' }}>
        {fixedMode ? props.title : null}
      </NavBar>
    </div>
  );
});

export default DetailNavBar;
