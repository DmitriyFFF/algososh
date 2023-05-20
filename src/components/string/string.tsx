import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";

type TItem = {
  value: string;
  color: ElementStates;
}

export const StringComponent: React.FC = () => {
  const [inputValue, setInpetValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const TIMEOUT = 1000;
  const MAX_INPUT_LENGTH = 12;

  const timeDelay = async(ms: number) => await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms)
  })

  const swapItem = (arr: TItem[], i: number, j: number) => {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInpetValue(e.target.value);
  };

  const reverseString = async (inputArray: TItem[]) => {
    setIsLoading(true);
    setArray([...inputArray]);

    await timeDelay(TIMEOUT);

    let start = 0;
    let end = inputValue.length - 1;

    while(start <= end) {
      if(start === end) {
        inputArray[start].color = ElementStates.Modified;
        setArray([...inputArray]);
      } else {
        inputArray[start].color = ElementStates.Changing;
        inputArray[end].color = ElementStates.Changing;
        setArray([...inputArray]);

        await timeDelay(TIMEOUT);
        swapItem(inputArray, start, end);

        inputArray[start].color = ElementStates.Modified;
        inputArray[end].color = ElementStates.Modified;
        setArray([...inputArray]);

        await timeDelay(TIMEOUT);
      }
      start ++;
      end --;
    }
    setIsLoading(false);
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.length > 0) {
      const inputArr = inputValue.split("").map((value) => ({value, color: ElementStates.Default}));
      reverseString(inputArr);
    }
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          isLimitText={true}
          maxLength={MAX_INPUT_LENGTH}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle letter={item.value} key={index} state={item.color}/>
        ))}
      </div>
    </SolutionLayout>
  );
};
