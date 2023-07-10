import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
// import { TItem } from "../../utils/types";
import styles from "./list.module.css"
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { timeDelay } from "../../utils/constants";
import { LinkedList } from "./list-class";

type TListItem = {
  value: string;
  color: ElementStates;
  upCircle?: boolean;
  downCircle?: boolean;
  smallCircle?: {
    value: string,
    color: ElementStates
  }
}


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState('');
  const [array, setArray] = useState<TListItem[]>([
    {value: '0', color: ElementStates.Default},
    {value: '34', color: ElementStates.Default},
    {value: '8', color: ElementStates.Default},
    {value: '1', color: ElementStates.Default}
  ]);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState(false);
  const [isLoadingDeleteHead, setIsLoadingDeleteHead] = useState(false);
  const [isLoadingDeleteTail, setIsLoadingDeleteTail] = useState(false);
  const [isLoadingAddIndex, setIsLoadingAddIndex] = useState(false);
  const [isLoadingDeleteIndex, setIsLoadingDeleteIndex] = useState(false);

  const MAX_INPUT_LENGTH = 4;
  const MAX_ARRAY_LENGTH = 7;
  const TIMEOUT = 500;
  // const [list] = useState(new LinkedList<TListItem>(array));
  const list = new LinkedList<string>([]);

  // useEffect(() => {
  //   setArray(Array(MAX_ARRAY_LENGTH).fill({value: '', color: ElementStates.Default}));
  // }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    setInputValue(e.target.value);
  };

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(e.target.value);
  };

  const handleAddHead = async () => {
    setIsLoadingAddHead(true);
    list.prepend(inputValue);

    array[0] = {...array[0], upCircle: true, smallCircle: {value: inputValue, color: ElementStates.Changing}};
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[0] = {...array[0], upCircle: false};

    array.unshift({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[0] = {...array[0], color: ElementStates.Default};

    setArray([...array]);
    await timeDelay(TIMEOUT);
    setInputValue('');
    setIsLoadingAddHead(false);
  };

  const handleAddTail =async() => {
    setIsLoadingAddTail(true);
    list.append(inputValue);

    array[array.length - 1] = {...array[array.length - 1], upCircle: true, smallCircle: {value: inputValue, color: ElementStates.Changing}};
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[array.length - 1] = {...array[array.length - 1], upCircle: false};

    array.push({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[array.length - 1] = {...array[array.length - 1], color: ElementStates.Default};

    setArray([...array]);
    await timeDelay(TIMEOUT);
    setInputValue('');
    setIsLoadingAddTail(false);
  };

  const handleDeleteHead =async() => {
    // array[queue.getHead()].color = ElementStates.Changing
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getHead()].value = '';
    // array[queue.getHead()].color = ElementStates.Default;
    // setArray([...array]);
    // queue.dequeue();
  };

  const handleDeleteTail =async() => {
    // array[queue.getHead()].color = ElementStates.Changing
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getHead()].value = '';
    // array[queue.getHead()].color = ElementStates.Default;
    // setArray([...array]);
    // queue.dequeue();
  };

  const handleAddByIndex =async() => {
    // array[queue.getHead()].color = ElementStates.Changing
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getHead()].value = '';
    // array[queue.getHead()].color = ElementStates.Default;
    // setArray([...array]);
    // queue.dequeue();
  };

  const handleDeleteByIndex =async() => {
    // array[queue.getHead()].color = ElementStates.Changing
    // setArray([...array]);
    // await timeDelay(TIMEOUT);
    // array[queue.getHead()].value = '';
    // array[queue.getHead()].color = ElementStates.Default;
    // setArray([...array]);
    // queue.dequeue();
  };


  // const handleClearQueue = () => {
    // queue.clear();
    // setArray(Array(7).fill({value: '', color: ElementStates.Default}));
  // };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
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
            type="button"
            text="Добавить в head"
            onClick={handleAddHead}
            linkedList="small"
            isLoader={isLoadingAddHead}
            disabled={!inputValue}
          />
          <Button
            type="button"
            text="Добавить в tail"
            onClick={handleAddTail}
            linkedList="small"
            isLoader={isLoadingAddTail}
            disabled={!inputValue}
          />
          <Button
            type="button"
            text="Удалить из head"
            onClick={handleDeleteHead}
            linkedList="small"
            isLoader={isLoadingDeleteHead}
            disabled={!array.length}
            // disabled={queue.isEmpty()}
          />
          <Button
            type="button"
            text="Удалить из tail"
            onClick={handleDeleteTail}
            linkedList="small"
            isLoader={isLoadingDeleteTail}
            disabled={!array.length}
            // disabled={queue.isEmpty()}
          />
        </div>
        <div className={styles.container}>
          <Input
            type="number"
            placeholder="Введите индекс"
            value={inputIndex}
            extraClass={styles.input}
            min={0}
            max={array.length - 1}
            // isLimitText={true}
            // maxLength={MAX_INPUT_LENGTH}
            onChange={handleChangeIndex}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            onClick={handleAddByIndex}
            linkedList="big"
            isLoader={isLoadingAddIndex}
            disabled={!inputIndex}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            onClick={handleDeleteByIndex}
            linkedList="big"
            isLoader={isLoadingDeleteIndex}
            disabled={!inputIndex}
            // disabled={queue.isEmpty()}
          />
        </div>
      </form>
      <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <div className={styles.circleItem} key={index}>
            {
              item.upCircle &&
              <Circle
                letter={item.smallCircle?.value}
                state={item.smallCircle?.color}
                isSmall={true}
                extraClass={styles.upCircle}
              />
            }
            <Circle
              letter={item.value}
              // key={index}
              index={index}
              state={item?.color}
              head={(index === 0) && !item.upCircle ? 'head' : ''}
              tail={(index === array.length - 1) && !item.downCircle ? 'tail' : ''}
              // head={index=== queue.getHead() && !queue.isEmpty() ? 'head' : ''}
              // tail={index === queue.getTail() - 1 && !queue.isEmpty() ? 'tail' : ''}
            />
            {
              item.downCircle &&
              <Circle
                letter={item.smallCircle?.value}
                state={item.smallCircle?.color}
                isSmall={true}
                extraClass={styles.downCircle}
              />
            }
          </div>

        ))}
      </div>
    </SolutionLayout>
  );
};

