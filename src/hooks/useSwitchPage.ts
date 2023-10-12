import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChapterInfo } from '@/types/book';

export default function useSwitchPage(chapters: ChapterInfo[]) {
  const navigate = useNavigate();
  const { bookId, chapterId } = useParams();
  const isFirst = chapterId === chapters[0]?.chapterId;
  const isLast = chapterId === chapters[chapters.length - 1]?.chapterId;
  const onPrev = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isFirst) return;
    const index = chapters.findIndex((chapter) => chapter.chapterId === chapterId) - 1;
    navigate(`/book/${bookId}/${chapters[index].chapterId}`, { replace: true });
  };

  const onNext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (isLast) return;
    const index = chapters.findIndex((chapter) => chapter.chapterId === chapterId) + 1;
    navigate(`/book/${bookId}/${chapters[index].chapterId}`, { replace: true });
  };

  return {
    onPrev,
    onNext,
    isFirst,
    isLast,
  };
}
