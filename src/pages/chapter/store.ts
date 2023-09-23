import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice } from '@/store';

import { THEME, DEFAULT_THEME_INDEX, DEFAULT_FONT_SIZE } from '@/pages/chapter/constants';

interface IChapterActions {
  setHeaderVisible: ActionCreatorWithPayload<boolean, string>;
  setFooterNavBarVisible: ActionCreatorWithPayload<boolean, string>;
  setFooterSettingBarVisible: ActionCreatorWithPayload<boolean, string>;
  setFooterProgressBarVisible: ActionCreatorWithPayload<boolean, string>;
  setCatalogVisible: ActionCreatorWithPayload<boolean, string>;
  setTheme: ActionCreatorWithPayload<string, string>;
  setFontSize: ActionCreatorWithPayload<number, string>;
  setNightTheme: ActionCreatorWithPayload<boolean, string>;
}

export const chapterActions: IChapterActions = {
  setHeaderVisible: createAction('INIT'),
  setFooterNavBarVisible: createAction('INIT'),
  setFooterSettingBarVisible: createAction('INIT'),
  setFooterProgressBarVisible: createAction('INIT'),
  setCatalogVisible: createAction('INIT'),
  setTheme: createAction('INIT'),
  setFontSize: createAction('INIT'),
  setNightTheme: createAction('INIT'),
};

export const createReducer = (key: string) => {
  const { set: setHeaderVisible, reducer: headerVisible } = createTempSlice<boolean>('headerVisible', false, key);
  const { set: setFooterNavBarVisible, reducer: footerNavBarVisible } = createTempSlice<boolean>(
    'footerNavBarVisible',
    false,
    key
  );
  const { set: setFooterSettingBarVisible, reducer: footerSettingBarVisible } = createTempSlice<boolean>(
    'footerSettingBarVisible',
    false,
    key
  );

  const { set: setFooterProgressBarVisible, reducer: footerProgressBarVisible } = createTempSlice<boolean>(
    'footerProgressBarVisible',
    false,
    key
  );

  const { set: setCatalogVisible, reducer: catalogVisible } = createTempSlice<boolean>('catalogVisible', false, key);

  const { set: setTheme, reducer: theme } = createTempSlice<string>('theme', THEME[DEFAULT_THEME_INDEX], key);
  const { set: setFontSize, reducer: fontSize } = createTempSlice<number>('fontSize', DEFAULT_FONT_SIZE, key);
  const { set: setNightTheme, reducer: nightTheme } = createTempSlice<boolean>('nightTheme', false, key);

  chapterActions.setHeaderVisible = setHeaderVisible;
  chapterActions.setFooterNavBarVisible = setFooterNavBarVisible;
  chapterActions.setFooterSettingBarVisible = setFooterSettingBarVisible;
  chapterActions.setFooterProgressBarVisible = setFooterProgressBarVisible;
  chapterActions.setCatalogVisible = setCatalogVisible;
  chapterActions.setTheme = setTheme;
  chapterActions.setFontSize = setFontSize;
  chapterActions.setNightTheme = setNightTheme;

  return {
    reducers: {
      [key]: combineReducers({
        headerVisible,
        footerNavBarVisible,
        footerSettingBarVisible,
        footerProgressBarVisible,
        catalogVisible,
        theme,
        fontSize,
        nightTheme,
      }),
    },
  };
};
