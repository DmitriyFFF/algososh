import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css"
import { TItem } from "../../utils/types";
import { Stack } from "./stack-class";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { timeDelay } from "../../utils/constants";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const [stack] = useState(new Stack<TItem>());
  const MAX_INPUT_LENGTH = 4;
  const TIMEOUT = 500;
  // const stack = new Stack<TItem>();
  console.log(stack)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePushStack = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    stack.push({value: inputValue, color: ElementStates.Changing});
    setInputValue('');
    setArray([...stack.getItems()]);
    await timeDelay(TIMEOUT);

    const peak = stack.peak();
    if (peak) {
      peak.color = ElementStates.Default;
    }
    setArray([...stack.getItems()]);
    setIsLoading(false);
  };

  const handlePopStack = async() => {
    array[array.length - 1].color = ElementStates.Changing;
    setArray([...array]);
    await timeDelay(TIMEOUT);
    stack.pop();
    setArray([...stack.getItems()]);
    // await timeDelay(TIMEOUT);
  };

  const handleClearStack = () => {
    stack.clear();
    setArray([]);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handlePushStack}>
        <div className={styles.container}>
          <Input
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={isLoading}
            disabled={!inputValue}

          />
          <Button
            type="button"
            text="Удалить"
            onClick={handlePopStack}
            disabled={!array.length}
          />
        </div>
        <Button
          type="reset"
          text="Очистить"
          onClick={handleClearStack}
          disabled={!array.length}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle
            letter={item.value}
            key={index}
            index={index}
            state={item.color}
            head={(array.length - 1) === index ? 'top' : ''} />
        ))}
      </div>
    </SolutionLayout>
  );
};
