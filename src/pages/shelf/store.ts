import { combineReducers, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit';
import { createTempSlice, AppThunk } from '@/store';
import { BookInfo } from '@/types/book';

interface IActions {
  setEditMode: ActionCreatorWithPayload<boolean, string>;
  setSelectedBook: (bookId: BookInfo) => AppThunk<void>;
  setSelectedGroup: (groupName: string) => AppThunk<void>;
  clearSelectedBook: ActionCreatorWithPayload<BookInfo[], string>;
  clearSelectedGroup: ActionCreatorWithPayload<string[], string>;
}

export const shelfActions: IActions = {
  setEditMode: createAction('INIT'),
  setSelectedBook: () => () => {},
  setSelectedGroup: () => () => {},
  clearSelectedBook: createAction('INIT'),
  clearSelectedGroup: createAction('INIT'),
};

const createReducer = (key: string) => {
  const { set: setEditMode, reducer: editMode } = createTempSlice<boolean>('editMode', false, key);
  const { set: setSelectedBook, reducer: selectedBook } = createTempSlice<BookInfo[]>('selectedBook', [], key);
  const { set: setSelectedGroup, reducer: selectedGroup } = createTempSlice<string[]>('selectedGroup', [], key);

  shelfActions.setSelectedBook = (book: BookInfo) => (dispatch, getState) => {
    const state = getState();
    let books = [...state.shelf.selectedBook];
    const index = books.findIndex((item) => book.id === item.bookId);
    if (index !== -1) {
      books.splice(index, 1);
    } else {
      books.push(book);
    }
    dispatch(setSelectedBook(books));
  };

  shelfActions.setSelectedGroup = (groupName: string) => (dispatch, getState) => {
    const state = getState();
    const groups = [...state.shelf.selectedGroup];
    const index = groups.findIndex((name) => groupName === name);
    if (index !== -1) {
      groups.splice(index, 1);
    } else {
      groups.push(groupName);
    }
    dispatch(setSelectedGroup(groups));
  };

  shelfActions.setEditMode = setEditMode;

  shelfActions.clearSelectedBook = setSelectedBook;
  shelfActions.clearSelectedGroup = setSelectedGroup;

  return {
    reducers: {
      [key]: combineReducers({
        editMode,
        selectedBook,
        selectedGroup,
      }),
    },
  };
};

export default createReducer;
