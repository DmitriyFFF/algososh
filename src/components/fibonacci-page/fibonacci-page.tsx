import React, { useState, FormEvent, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { Circle } from "../ui/circle/circle";
import { timeDelay } from "../../utils/constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<number[]>([]);
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
    for(let i = 1; i <= inputValue + 1; i ++) {
      if(inputValue >= 1 && inputValue <= 19) {
        setArray((newArr) => [...newArr, calcFibonacci(i, memo)])
        await timeDelay(SHORT_DELAY_IN_MS);
      }
    }
    setIsLoading(false);
    // await timeDelay(SHORT_DELAY_IN_MS);
    setInputValue(0);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={onSubmit}>
        <Input
          data-testid="inputValue"
          type="number"
          isLimitText={true}
          max={MAX_NUMBER}
          onChange={handleChange}
        />
        <Button
          data-testid="submitButton"
          type="submit"
          text="Расчитать"
          isLoader={isLoading}
          disabled={inputValue >= 1 && inputValue <= 19 ? false : true}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle
            letter={String(item)}
            key={index}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
