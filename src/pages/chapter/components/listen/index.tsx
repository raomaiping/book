import React, { useEffect, useRef } from 'react';
import { NavBar } from '@taoyage/react-mobile-ui';
import styles from './index.module.scss';

interface ListenProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Listen: React.FC<ListenProps> = React.memo((props) => {
  const { visible, setVisible } = props;
  const rightRender = <div />;
  return (
    <div className={styles.listen}>
      <div className="background">
        <img src="" alt="" />
      </div>
      <NavBar right={rightRender} onBack={() => setVisible(false)} />
    </div>
  );
});

export default Listen;
