export interface BookInfo {
  id: string;
  imgurl: string;
  title: string;
  remark?: string;
  typeName?: string;
  author?: string;
  desc?: string | [];
  time?: string;
  chapters?: ChapterInfo[];
  chapterInfo?: ChapterInfo;
}
export interface ChapterInfo {
  id?: string;
  chapterId: string;
  chapterName: string;
  content?: [];
}

export interface TopBooks {
  typeName: string;
  list: BookInfo[];
}

export interface IMyContext {
  bookInfo?: BookInfo;
}
