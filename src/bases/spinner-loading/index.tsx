import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

export interface SpinnerLoadingProps {
  type?: 'spinner';
  color?: 'default' | 'primary' | 'white' | string;
  size?: number;
  style?: React.CSSProperties;
}

const SpinnerLoading: React.FC<SpinnerLoadingProps> = React.memo((props) => {
  return (
    <div
      className={cx('ygm-spinner-loading', `ygm-spinner-loading-color-${props.color}`)}
      style={{ ...props.style, width: props.size, height: props.size }}
    />
  );
});

SpinnerLoading.defaultProps = {
  color: 'default',
  size: 32,
  type: 'spinner',
};

export default SpinnerLoading;

SpinnerLoading.displayName = 'SpinnerLoading';
