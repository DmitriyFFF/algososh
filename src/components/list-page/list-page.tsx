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
import { ArrowIcon } from "../ui/icons/arrow-icon";

type TListItem = {
  value: string;
  color: ElementStates;
  upCircle?: boolean;
  downCircle?: boolean;
  arrow?: boolean;
  smallCircle?: {
    value: string,
    color: ElementStates
  }
}


export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number>(0);
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
  const TIMEOUT = 1000;
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
    setInputIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    setIsLoadingAddHead(true);
    list.prepend(inputValue);

    array[0] = {
      ...array[0],
      upCircle: true,
      smallCircle: {
        value: inputValue,
        color: ElementStates.Changing
      }
    };
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
    // await timeDelay(TIMEOUT);
    setInputValue('');
    setIsLoadingAddHead(false);
  };

  const handleAddTail = async() => {
    setIsLoadingAddTail(true);
    list.append(inputValue);

    array[array.length - 1] = {
      ...array[array.length - 1],
      upCircle: true,
      smallCircle: {
        value: inputValue,
        color: ElementStates.Changing
      }
    };
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
    // await timeDelay(TIMEOUT);
    setInputValue('');
    setIsLoadingAddTail(false);
  };

  const handleDeleteHead = async() => {
    setIsLoadingDeleteHead(true);
    list.deleteHead();

    array[0] = {
      ...array[0],
      downCircle: true,
      value: '',
      smallCircle: {
        value: array[0].value,
        color: ElementStates.Changing
      }
    };
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[0] = {...array[0], downCircle: false};

    array.shift();
    setArray([...array]);
    // await timeDelay(TIMEOUT);
    setIsLoadingDeleteHead(false);
  };

  const handleDeleteTail = async() => {
    setIsLoadingDeleteTail(true);
    list.deleteHead();

    array[array.length - 1] = {
      ...array[array.length - 1],
      downCircle: true, value: '',
      smallCircle: {
        value: array[array.length - 1].value,
        color: ElementStates.Changing
      }
    };
    setArray([...array]);
    await timeDelay(TIMEOUT);
    array[array.length - 1] = {...array[array.length - 1], downCircle: false};

    array.pop();
    setArray([...array]);
    // await timeDelay(TIMEOUT);
    setIsLoadingDeleteTail(false);
  };

  const handleAddByIndex = async() => {
    setIsLoadingAddIndex(true);
    list.addByIndex(inputValue, inputIndex);
    array[0] = {
      ...array[0],
      upCircle: true,
      smallCircle: {
        value: inputValue,
        color: ElementStates.Changing
      }
    };
    setArray([...array]);
    await timeDelay(TIMEOUT);

    let currentIndex = 1;
    while (currentIndex <= inputIndex) {
      array[currentIndex] = {
        ...array[currentIndex],
        upCircle: true,
        smallCircle: {
          value: inputValue,
          color: ElementStates.Changing
        }
      };
      // setArray([...array]);
      array[currentIndex - 1] = {
        ...array[currentIndex - 1],
        upCircle: false,
        color: ElementStates.Changing,
        arrow: true
      };
      currentIndex ++;
      setArray([...array]);
      await timeDelay(TIMEOUT);
    }

    array[inputIndex] = {...array[inputIndex], upCircle: false};
    array.splice(inputIndex, 0, {value: inputValue, color: ElementStates.Modified});
    setArray([...array]);
    await timeDelay(TIMEOUT);

    array.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
        );
      }
    );
    setArray([...array]);
    // await timeDelay(TIMEOUT);
    setInputIndex(0);
    setInputValue('');

    setIsLoadingAddIndex(false);
  };

  const handleDeleteByIndex = async() => {
    setIsLoadingDeleteIndex(true);
    list.deleteByIndex(inputIndex);
    // array[0] = {...array[0], upCircle: true, smallCircle: {value: inputValue, color: ElementStates.Changing}};
    // setArray([...array]);
    // await timeDelay(TIMEOUT);

    let currentIndex = 0;
    while (currentIndex < inputIndex) {
      array[currentIndex] = {
        ...array[currentIndex],
        color: ElementStates.Changing,
        arrow: true
      };
      currentIndex ++;
      setArray([...array]);
      await timeDelay(TIMEOUT);
      // array[currentIndex - 1] = {...array[currentIndex - 1], upCircle: false, color: ElementStates.Changing, arrow: true};
      // setArray([...array]);
    }

    array[inputIndex] = {
      ...array[inputIndex],
      value: '',
      downCircle: true,
      color: ElementStates.Changing,
      arrow: false,
      smallCircle: {
        value: array[inputIndex].value,
        color: ElementStates.Changing
      }
    };
    setArray([...array]);
    await timeDelay(TIMEOUT);

    array.splice(inputIndex, 1);
    array.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
        );
      }
    );
    setArray([...array]);
    // await timeDelay(TIMEOUT);
    setInputIndex(0);
    // setInputValue('');


    setIsLoadingDeleteIndex(false);
  };

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
      <div className={styles.linkedList}>
        {array.map((item, index) => (
          <div className={styles.circleContainer} key={index}>
            <div className={styles.circleItems}>
              {item.upCircle &&
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
                tail={(index === array.length - 1) && !item.downCircle ?  'tail' : ''}
                // head={index=== queue.getHead() && !queue.isEmpty() ?   'head' : ''}
                // tail={index === queue.getTail() - 1 && !queue.isEmpty() ?  'tail' : ''}
              />
              {item.downCircle &&
                <Circle
                  letter={item.smallCircle?.value}
                  state={item.smallCircle?.color}
                  isSmall={true}
                  extraClass={styles.downCircle}
                />
              }
            </div>
            {index !== array.length - 1 &&
              <ArrowIcon fill={item.arrow ? "#D252E1" : "#0032FF"} />
            }
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};

