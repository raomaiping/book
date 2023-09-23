import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavBar, Tabs } from '@taoyage/react-mobile-ui';
import { TABS } from '@/pages/ranking/constants';

const RankingHeader: React.FC<{ activeTabKey: string; setActiveTabKey: React.Dispatch<React.SetStateAction<string>> }> =
  React.memo((props) => {
    const { activeTabKey, setActiveTabKey } = props;
    const navigate = useNavigate();

    const onBack = React.useCallback(() => {
      navigate(-1);
    }, [navigate]);

    const onTab = React.useCallback(
      (key: string) => {
        setActiveTabKey(key);
      },
      [setActiveTabKey]
    );

    return (
      <NavBar onBack={onBack}>
        <Tabs activeKey={activeTabKey} onChange={onTab}>
          {TABS.map((item) => (
            <Tabs.Tab key={item.key} title={item.name} />
          ))}
        </Tabs>
      </NavBar>
    );
  });

export default RankingHeader;
