import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice } from '@/store';
import { parse } from 'query-string';

interface ISearchAction {
  setSearchMode: ActionCreatorWithPayload<boolean, string>;
  setSearchKeyword: ActionCreatorWithPayload<string, string>;
}

export const searchActions: ISearchAction = {
  setSearchMode: createAction('INIT'),
  setSearchKeyword: createAction('INIT'),
};

export const createReducer = (key: string) => {
  const keyword = parse(window.location.search).keyword;
  const { set: setSearchMode, reducer: searchMode } = createTempSlice<boolean>('searchMode', false, key);
  const { set: setSearchKeyword, reducer: searchKeyword } = createTempSlice<string>(
    'searchParams',
    typeof keyword !== 'string' ? '' : keyword,
    key
  );

  searchActions.setSearchMode = setSearchMode;
  searchActions.setSearchKeyword = setSearchKeyword;

  return {
    reducers: {
      [key]: combineReducers({
        searchMode,
        searchKeyword,
      }),
    },
  };
};
