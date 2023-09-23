import { BookInfo } from '@/types/book';

export interface HomeCardData {
  typeName?: string;
  list?: BookInfo[];
}
export interface HomeData {
  rm: HomeCardData;
  tj: HomeCardData;
  zjgx: HomeCardData;
}
