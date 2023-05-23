import { TItem } from "./types";

export const timeDelay = async(ms: number) => await new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
});

export const swapItem = (arr: TItem[], i: number, j: number) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};
