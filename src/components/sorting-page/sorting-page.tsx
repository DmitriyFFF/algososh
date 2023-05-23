import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { TItem, TSortItem } from "../../utils/types";
import styles from "./sorting.module.css";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { timeDelay } from "../../utils/constants";
// import { TIMEOUT } from "dns";

export const SortingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<TSortItem[]>([]);
  const [radioName, setRadioName] = useState("Выбор");
  const TIMEOUT = 500;


  const randomArr = () => {
    const minLen = 3;
    const maxLen = 17;
    const max = 100;
    // const arr = [];

    const randLen = Math.floor(Math.random() * (maxLen - minLen) + minLen);
    // console.log(randLen)
    const arr = [...new Array(randLen)].map(() => Math.round(Math.random() * max));
    const newArray: TSortItem[] = arr.map((value) => ({
      value: value,
      color: ElementStates.Default
    }))
    setArray(newArray);
  };

  const choiceSort = () => {

  };

  const bubbleSort = () => {

  };

  const onSortClick = () => {
    if (radioName === "Выбор") {
      choiceSort();
    } else if (radioName === "Пузырёк") {
      bubbleSort();
    }
  };
    // console.log(randomArr())


  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRadioName(evt.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    randomArr();
    await timeDelay(TIMEOUT)
    setIsLoading(false);
    // console.log(randomArr())
  };










  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.radioContainer}>
          <RadioInput label="Выбор" checked={radioName === "Выбор" ? true : false} value="Выбор" onChange={onChange} />
          <RadioInput label="Пузырёк" checked={radioName === "Пузырёк" ? true : false} value="Пузырёк" onChange={onChange} />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="button" text="По возрастанию" sorting={Direction.Ascending} onClick={onSortClick} />
          <Button type="button" text="По убыванию" sorting={Direction.Descending} onClick={onSortClick} />
        </div>
        <Button type="submit" text="Новый массив" isLoader={isLoading} />
      </form>
      <div className={styles.container}>
        {array.map((item, index) => (
          <Column index={Number(item.value)} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
