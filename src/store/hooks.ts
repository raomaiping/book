import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { store } from '@/store';
import { AppState, AppDispatch } from '@/store/store';

export const useReducer = (reducers: {}) => {
  const dispatch = useAppDispatch();
  store.reducerManager.addReducers(reducers);
  dispatch({ type: '@RELOAD_STATE' });
  React.useLayoutEffect(() => {
    return () => {
      store.reducerManager.removeReducers(Object.keys(reducers));
    };
  }, [reducers, dispatch]);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
