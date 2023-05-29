// import React from "react";
// import { SolutionLayout } from "../ui/solution-layout/solution-layout";

// export const ListPage: React.FC = () => {
//   return (
//     <SolutionLayout title="Связный список">

//     </SolutionLayout>
//   );
// };
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TItem } from "../../utils/types";
import styles from "./list.module.css"
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { timeDelay } from "../../utils/constants";
import { List } from "./list-class";


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);
  const MAX_INPUT_LENGTH = 4;
  const MAX_ARRAY_LENGTH = 7;
  const TIMEOUT = 500;
  const [list] = useState(new List<TItem>(MAX_ARRAY_LENGTH));

  // useEffect(() => {
  //   setArray(Array(MAX_ARRAY_LENGTH).fill({value: '', color: ElementStates.Default}));
  // }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleQueue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // queue.enqueue({value: inputValue, color: ElementStates.Default});
    // array[queue.getTail() - 1] = {value: inputValue, color: ElementStates.Changing}
    // setInputValue('');
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getTail() - 1] = {value: inputValue, color: ElementStates.Default};
    // setArray([...array]);
    setIsLoading(false);
  };

  const handleDequeue =async() => {
    // array[queue.getHead()].color = ElementStates.Changing
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getHead()].value = '';
    // array[queue.getHead()].color = ElementStates.Default;
    // setArray([...array]);
    // queue.dequeue();
  };

  const handleClearQueue = () => {
    // queue.clear();
    // setArray(Array(7).fill({value: '', color: ElementStates.Default}));
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form} onSubmit={handleQueue}>
        <div className={styles.container}>
          <Input
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            extraClass={styles.input}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text="Добавить в head"
            isLoader={isLoading}
            disabled={!inputValue}
          />
          <Button
            type="submit"
            text="Добавить в tail"
            isLoader={isLoading}
            disabled={!inputValue}
          />
          <Button
            type="button"
            text="Удалить из head"
            onClick={handleDequeue}
            // disabled={queue.isEmpty()}
          />
          <Button
            type="button"
            text="Удалить из tail"
            onClick={handleDequeue}
            // disabled={queue.isEmpty()}
          />
        </div>
        <div className={styles.container}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputValue}
            extraClass={styles.input}
            // isLimitText={true}
            // maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text="Добавить по индексу"
            isLoader={isLoading}
            disabled={!inputValue}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            onClick={handleClearQueue}
            // disabled={queue.isEmpty()}
          />
        </div>
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle
            letter={item.value}
            key={index}
            index={index}
            state={item?.color}
            // head={index=== queue.getHead() && !queue.isEmpty() ? 'head' : ''}
            // tail={index === queue.getTail() - 1 && !queue.isEmpty() ? 'tail' : ''}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};

