import { NextRouter } from 'next/router';

export function handleClick(url: string = "/", router: NextRouter) {
    return () => router.push(url);
  }