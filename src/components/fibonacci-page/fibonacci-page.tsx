import React, { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
// import { TItem } from "../../utils/types";
import { Circle } from "../ui/circle/circle";
import { timeDelay } from "../../utils/constants";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<number[]>([]);
  const TIMEOUT = 500;
  const MAX_NUMBER = 19;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(e.target.value));
    setArray([]);
  };

  const calcFibonacci = (n: number, memo: Record<number, number> = {}): number => {
    if (n in memo) {
      return memo[n];
    }
    if (n <= 2) {
      return 1;
    }
    memo[n] = calcFibonacci(n - 1, memo) + calcFibonacci(n - 2, memo);
    return memo[n];
  };

  const memo:Record<number, number> = {};

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // const newArr = [];
    for(let i = 1; i <= inputValue + 1; i ++) {
      if(inputValue >= 1 && inputValue <= 19) {
        setArray((newArr) => [...newArr, calcFibonacci(i, memo)])
        await timeDelay(TIMEOUT);
      }
    }
    setIsLoading(false);
    await timeDelay(TIMEOUT);
    setInputValue(0)

    // if (inputValue.length > 0) {
    //   const inputArr = inputValue.split("").map((value) => ({value, color: ElementStates.Default}));
    //   reverseString(inputArr);
    // }
  };



  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={onSubmit}>
        <Input
          type="number"
          // value={inputValue}
          isLimitText={true}
          max={MAX_NUMBER}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Расчитать"
          isLoader={isLoading}
          disabled={inputValue >= 1 && inputValue <= 19 ? false : true}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle letter={String(item)} key={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
