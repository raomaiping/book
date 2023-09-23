import { BookInfo } from '@/types/book';

export interface BookListData {
  list: BookInfo[];
  pages: number;
  page: number;
}

export type TPageKey = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type TTitleKeyMap = Record<TPageKey, string>;
