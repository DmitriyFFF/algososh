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
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [stack] = useState(new Stack<TItem>());
  const MAX_INPUT_LENGTH = 4;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePushStack = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsAddLoading(true);

    stack.push({value: inputValue, color: ElementStates.Changing});
    setInputValue('');
    setArray([...stack.getItems()]);
    await timeDelay(SHORT_DELAY_IN_MS);

    const peak = stack.peak();
    if (peak) {
      peak.color = ElementStates.Default;
    }
    setArray([...stack.getItems()]);
    setIsAddLoading(false);
    setIsDisabled(false);
  };

  const handlePopStack = async() => {
    setIsDisabled(true);
    setIsDelLoading(true);
    array[array.length - 1].color = ElementStates.Changing;
    setArray([...array]);
    await timeDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArray([...stack.getItems()]);
    setIsDelLoading(false);
    setIsDisabled(false);
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
            data-testid="inputValue"
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button
            data-testid="addButton"
            type="submit"
            text="Добавить"
            isLoader={isAddLoading}
            disabled={!inputValue || isDisabled}

          />
          <Button
            data-testid="delButton"
            type="button"
            text="Удалить"
            isLoader={isDelLoading}
            onClick={handlePopStack}
            disabled={!array.length || isDisabled}
          />
        </div>
        <Button
          data-testid="clearButton"
          type="reset"
          text="Очистить"
          onClick={handleClearStack}
          disabled={!array.length || isDisabled}
        />
      </form>
      <div className={styles.circleContainer} data-testid="circle-container">
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
