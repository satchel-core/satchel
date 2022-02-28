import { NextRouter } from 'next/router';

export function handleClick(url: string = "/", router: NextRouter) {
  return () => router.push(url);
}

export function makeAddress(hex: string) {
  return "0x" + hex;
}

export function goBack(router: NextRouter) {
  return () => router.back();
}

export function stripAddress(address: string) {
  if (address.substring(0, 2) == "0x") {
    return address.substring(2);
  }
  return address;
}

export function handleCustomUrl(ext: string, address: string, router: NextRouter) {
  return () => router.push(ext + stripAddress(address));
}

export function totalBalances(tokenPrices: any, amounts: any) {

}

export function getKeys(tokens: any) {
  return Object.keys(tokens);
}