import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { TSortItem } from "../../utils/types";
import styles from "./sorting.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { swapItem, timeDelay } from "../../utils/constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState({
    isLoading: false,
    isAscending: false,
    isDescending: false
  });
  const [array, setArray] = useState<TSortItem[]>([]);
  const [radioName, setRadioName] = useState("Выбор");

  const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;
    const max = 100;

    const randLen = Math.floor(Math.random() * (maxLen - minLen) + minLen);
    const arr = [...new Array(randLen)].map(() => Math.round(Math.random() * max));
    const newArray: TSortItem[] = arr.map((value) => ({
      value: value,
      color: ElementStates.Default
    }))
    setArray(newArray);
  };

  useEffect(() => {
    randomArr();
  }, []);

  const choiceSort = async(arr: TSortItem[], sort: Direction) => {
    if (sort === Direction.Ascending) {
      setIsLoading({isLoading: true, isAscending: true, isDescending: false});
    } else {
      setIsLoading({isLoading: true, isAscending: false, isDescending: true});
    }

    for (let i = 0; i < arr.length; i++) {
      let temp = i;
      arr[i].color = ElementStates.Changing;
      for (let j = i + 1; j < arr.length; j++) {
        arr[j].color = ElementStates.Changing;

        setArray([...arr]);
        await timeDelay(SHORT_DELAY_IN_MS);

        if ((sort === Direction.Ascending) && (arr[j].value < arr[temp].value)) {
          temp = j;
          swapItem(arr, j, temp);
          setArray([...arr]);
        } else if ((sort === Direction.Descending) && (arr[j].value > arr[temp].value)) {
          temp = j;
          swapItem(arr, j, temp);
          setArray([...arr]);
        }
        arr[j].color = ElementStates.Default;
        arr[i].color = ElementStates.Default;
        setArray([...arr]);
      }
      arr[temp].color = ElementStates.Modified;
      swapItem(arr, i, temp);
      setArray([...arr]);
    }
    setIsLoading({isLoading: false, isAscending: false, isDescending: false});
  };

  const bubbleSort = async(arr: TSortItem[], sort: Direction) => {
    if (sort === Direction.Ascending) {
      setIsLoading({isLoading: true, isAscending: true, isDescending: false});
    } else {
      setIsLoading({isLoading: true, isAscending: false, isDescending: true});
    }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].color = ElementStates.Changing;
        arr[j + 1].color = ElementStates.Changing;
        await timeDelay(SHORT_DELAY_IN_MS);

        if ((sort === Direction.Ascending) && (arr[j].value > arr[j + 1].value)) {
          swapItem(arr, j, j + 1);
        } else if ((sort === Direction.Descending) && (arr[j].value < arr[j + 1].value)) {
          swapItem(arr, j, j + 1);
        }
        arr[j].color = ElementStates.Default
        arr[j + 1].color = ElementStates.Default;
        setArray([...arr]);
      }
      arr[arr.length - i - 1].color = ElementStates.Modified;
    }
    setIsLoading({isLoading: false, isAscending: false, isDescending: false});
  };

  const onSortClick = (sort: Direction) => {
    if (radioName === "Выбор") {
      choiceSort(array, sort);
    } else if (radioName === "Пузырёк") {
      bubbleSort(array, sort);
    }
  };

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioName(evt.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    randomArr();
    await timeDelay(SHORT_DELAY_IN_MS)
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.radioContainer}>
          <RadioInput
            label="Выбор"
            data-testid="choiceRadio"
            checked={radioName === "Выбор" ? true : false}
            value="Выбор"
            onChange={onChange}
          />
          <RadioInput
            label="Пузырёк"
            data-testid="bubbleRadio"
            checked={radioName === "Пузырёк" ? true : false}
            value="Пузырёк"
            onChange={onChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type="button"
            text="По возрастанию"
            data-testid="ascendingButton"
            sorting={Direction.Ascending}
            isLoader={isLoading.isAscending}
            onClick={() => {onSortClick(Direction.Ascending)}}
            disabled={isLoading.isDescending}
          />
          <Button
            type="button"
            text="По убыванию"
            data-testid="descendingButton"
            sorting={Direction.Descending}
            isLoader={isLoading.isDescending}
            onClick={() => {onSortClick(Direction.Descending)}}
            disabled={isLoading.isAscending}
          />
        </div>
        <Button
          type="submit"
          text="Новый массив"
          data-testid="newArray"
          disabled={isLoading.isLoading}
        />
      </form>
      <div className={styles.container} data-testid="columns">
        {array.map((item, index) => (
          <Column index={Number(item.value)} key={index} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
