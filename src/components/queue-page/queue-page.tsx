import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TItem } from "../../utils/types";
import styles from "./queue.module.css"
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./queue-class";
import { timeDelay } from "../../utils/constants";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const MAX_INPUT_LENGTH = 4;
  const MAX_ARRAY_LENGTH = 7;
  const [queue] = useState(new Queue<TItem>(MAX_ARRAY_LENGTH));

  useEffect(() => {
    setArray(Array(MAX_ARRAY_LENGTH).fill({value: '', color: ElementStates.Default}));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQueue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsAddLoading(true);
    queue.enqueue({value: inputValue, color: ElementStates.Default});
    array[queue.getTail() - 1] = {value: inputValue, color: ElementStates.Changing}
    setInputValue('');
    setArray([...array]);
    await timeDelay(SHORT_DELAY_IN_MS);
    array[queue.getTail() - 1] = {value: inputValue, color: ElementStates.Default};
    setArray([...array]);
    setIsAddLoading(false);
    setIsDisabled(false);
  };

  const handleDequeue =async() => {
    setIsDisabled(true);
    setIsDelLoading(true);
    array[queue.getHead()].color = ElementStates.Changing
    setArray([...array]);
    await timeDelay(SHORT_DELAY_IN_MS);
    array[queue.getHead()].value = '';
    array[queue.getHead()].color = ElementStates.Default;
    setArray([...array]);
    queue.dequeue();
    setIsDelLoading(false);
    setIsDisabled(false);
  };

  const handleClearQueue = () => {
    queue.clear();
    setArray(Array(7).fill({value: '', color: ElementStates.Default}));
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onSubmit={handleQueue}>
        <div className={styles.container}>
          <Input
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button
            type="submit"
            text="Добавить"
            isLoader={isAddLoading}
            disabled={!inputValue || queue.getTail() === MAX_ARRAY_LENGTH || isDisabled}
          />
          <Button
            type="button"
            text="Удалить"
            isLoader={isDelLoading}
            onClick={handleDequeue}
            disabled={queue.isEmpty() || isDisabled}
          />
        </div>
        <Button
          type="reset"
          text="Очистить"
          onClick={handleClearQueue}
          disabled={queue.isEmpty() || isDisabled}
        />
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle
            letter={item.value}
            key={index}
            index={index}
            state={item?.color}
            head={index=== queue.getHead() && !queue.isEmpty() ? HEAD : ''}
            tail={index === queue.getTail() - 1 && !queue.isEmpty() ? TAIL : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
