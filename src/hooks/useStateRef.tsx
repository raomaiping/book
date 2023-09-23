import React from 'react';

const useStateRef = <S,>(defaultValue: S): [S, (value: S) => void, React.RefObject<S>] => {
  const ref = React.useRef<S>(defaultValue);
  const [state, _setState] = React.useState<S>(defaultValue);

  const setState = (value: S) => {
    _setState(value);
    ref.current = value;
  };

  return [state, setState, ref];
};

export default useStateRef;
