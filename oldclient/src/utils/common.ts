import NextRouter from 'next/router';

export function handleClick(url: string, router: typeof NextRouter) {
    return () => router.push(url);
  }