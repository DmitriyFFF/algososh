import { TItem, TSortItem } from "./types";

export const defaultColor = "#0032FF";
export const changingColor = "#D252E1";

export const timeDelay = async(ms: number) => await new Promise<void>((resolve) => {
  setTimeout(() => resolve(), ms)
});

export const swapItem = (arr: TItem[] | TSortItem[], i: number, j: number) => {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
};

export const choiceSort = (arr: TSortItem[]) => {
  for (let i = 0; i < arr.length; i++) {
    let max = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[max] < arr[j]) {
        max = j;
      }
    }
    if (max !== i) {
      swapItem(arr, i, max);
    }
  }
  return arr;
};

export const bubbleSort = (arr: TSortItem[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = arr[j];
      }
    }
  }
  return arr;
}
