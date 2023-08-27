import React, { ChangeEvent, FormEvent, useState } from "react";
import { Input, } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { swapItem, timeDelay } from "../../utils/constants";
import { TItem } from "../../utils/types";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled,setIsDisabled] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const MAX_INPUT_LENGTH = 12;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reverseString = async (inputArray: TItem[]) => {
    setIsDisabled(true);
    setIsLoading(true);
    setArray([...inputArray]);

    await timeDelay(DELAY_IN_MS);

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

        await timeDelay(DELAY_IN_MS);
        swapItem(inputArray, start, end);

        inputArray[start].color = ElementStates.Modified;
        inputArray[end].color = ElementStates.Modified;
        setArray([...inputArray]);

        await timeDelay(DELAY_IN_MS);
      }
      start ++;
      end --;
    }
    setIsLoading(false);
    setIsDisabled(false);
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
          data-testid="inputValue"
          type="text"
          value={inputValue}
          isLimitText={true}
          maxLength={MAX_INPUT_LENGTH}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <Button
          data-testid="submitButton"
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
          disabled={!inputValue}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle letter={item.value} key={index} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
