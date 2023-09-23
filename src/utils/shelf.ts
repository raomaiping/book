import storage from '@/utils/storage';
import { BookInfo } from '@/types/book';

export const setShelf = (value: BookInfo): string => {
  let arr: BookInfo[] = storage.get('shelf') || [];
  let group: Record<string, BookInfo[]> = storage.get('shelf-group') || {};

  const index = arr.findIndex((item) => item.id === value.id);

  if (index !== -1) {
    arr.splice(index, 1);
    storage.set('shelf', arr);
    return '已从书架中移除';
  }

  for (const name in group) {
    if (group.hasOwnProperty(name)) {
      const index = group[name].findIndex((item) => item.id === value.id);

      if (index !== -1) {
        group[name].splice(index, 1);
        if (!Object.keys(group[name]).length) {
          delete group[name];
        }
        storage.set('shelf-group', group);
        return '已从书架中移除';
      }
    }
  }

  arr.unshift(value);
  storage.set('shelf', arr);

  return '已加入书架';
};

export const getShelfList = (): BookInfo[] => {
  let arr: BookInfo[] = storage.get('shelf') || [];

  return arr;
};

export const isShelf = (bookId: string): boolean => {
  let arr: BookInfo[] = storage.get('shelf') || [];
  let group: Record<string, BookInfo[]> = storage.get('shelf-group') || {};

  const index = arr.findIndex((item) => item.id === bookId);

  if (index !== -1) {
    return true;
  }

  for (const name in group) {
    if (group.hasOwnProperty(name)) {
      const index = group[name].findIndex((item) => item.id === bookId);

      if (index !== -1) {
        return true;
      }
    }
  }

  return false;
};

export const deleteShelf = (books: BookInfo[]) => {
  let arr: BookInfo[] = storage.get('shelf') || [];

  books.forEach((book) => {
    const index = arr.findIndex((item) => item.id === book.id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  });

  storage.set('shelf', arr);

  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'shelf' } }));
};

export const deleteShelfGroup = (groupList: string[]) => {
  let group: Record<string, BookInfo[]> = storage.get('shelf-group') || {};

  groupList.forEach((groupName) => {
    if (group[groupName]) {
      delete group[groupName];
    }
  });

  storage.set('shelf-group', group);

  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'shelf-group' } }));
};

/**
 * 移动选中书籍或书籍组到另一个书籍组中
 * @param name
 * @param books
 * @param groups
 * @returns
 */
export const setGroup = (name: string, books: BookInfo[], groups: string[]) => {
  let group: Record<string, BookInfo[]> = storage.get('shelf-group') || {};
  const groupBooks: BookInfo[] = [];

  groups.forEach((groupName) => {
    groupBooks.push(...group[groupName]);
    delete group[groupName];
  });

  group[name] = group[name] || [];

  group[name] = [...group[name], ...groupBooks, ...books];

  storage.set('shelf-group', group);
  deleteShelf(books);

  window.dispatchEvent(new CustomEvent('local-storage', { detail: { key: 'shelf-group' } }));
  return '已添加至分组';
};
