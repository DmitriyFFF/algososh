import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TListItem } from "../../utils/types";
import styles from "./list.module.css"
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-class";
import { timeDelay, defaultColor, changingColor } from "../../utils/constants";
import { DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputIndex, setInputIndex] = useState<number | null>(null);
  const [isLoadingAddHead, setIsLoadingAddHead] = useState(false);
  const [isLoadingAddTail, setIsLoadingAddTail] = useState(false);
  const [isLoadingDeleteHead, setIsLoadingDeleteHead] = useState(false);
  const [isLoadingDeleteTail, setIsLoadingDeleteTail] = useState(false);
  const [isLoadingAddIndex, setIsLoadingAddIndex] = useState(false);
  const [isLoadingDeleteIndex, setIsLoadingDeleteIndex] = useState(false);
  const [array, setArray] = useState<TListItem[]>([
    {value: '0', color: ElementStates.Default},
    {value: '34', color: ElementStates.Default},
    {value: '8', color: ElementStates.Default},
    {value: '1', color: ElementStates.Default}
  ]);
  const [isDisabled, setIsDisabled] = useState(false);
  const list = new LinkedList<string>([]);

  const MAX_INPUT_LENGTH = 4;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    setInputIndex(Number(e.target.value));
  };

  const handleAddHead = async () => {
    setIsDisabled(true);
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
    await timeDelay(DELAY_IN_MS);

    array[0] = {...array[0], upCircle: false};
    array.unshift({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArray([...array]);
    await timeDelay(DELAY_IN_MS);
    array[0] = {...array[0], color: ElementStates.Default};
    setArray([...array]);

    setInputValue('');
    setIsLoadingAddHead(false);
    setIsDisabled(false);
  };

  const handleAddTail = async() => {
    setIsDisabled(true);
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
    await timeDelay(DELAY_IN_MS);

    array[array.length - 1] = {...array[array.length - 1], upCircle: false};
    array.push({
      value: inputValue,
      color: ElementStates.Modified
    });
    setArray([...array]);
    await timeDelay(DELAY_IN_MS);
    array[array.length - 1] = {...array[array.length - 1], color: ElementStates.Default};
    setArray([...array]);

    setInputValue('');
    setIsLoadingAddTail(false);
    setIsDisabled(false);
  };

  const handleDeleteHead = async() => {
    setIsDisabled(true);
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
    await timeDelay(DELAY_IN_MS);

    array[0] = {...array[0], downCircle: false};
    array.shift();
    setArray([...array]);
    setIsLoadingDeleteHead(false);
    setIsDisabled(false);
  };

  const handleDeleteTail = async() => {
    setIsDisabled(true);
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
    await timeDelay(DELAY_IN_MS);

    array[array.length - 1] = {...array[array.length - 1], downCircle: false};
    array.pop();
    setArray([...array]);
    setIsLoadingDeleteTail(false);
    setIsDisabled(false);
  };

  const handleAddByIndex = async() => {
    setIsDisabled(true);
    setIsLoadingAddIndex(true);
    if (inputIndex !== null) {
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
      await timeDelay(DELAY_IN_MS);

      let currentIndex = 0;
      while (currentIndex <= inputIndex) {
        array[currentIndex] = {
          ...array[currentIndex],
          upCircle: true,
          smallCircle: {
            value: inputValue,
            color: ElementStates.Changing
          }
        };

        array[currentIndex - 1] = {
          ...array[currentIndex - 1],
          upCircle: false,
          color: ElementStates.Changing,
          arrow: true
        };
        currentIndex ++;
        setArray([...array]);
        await timeDelay(DELAY_IN_MS);
      }

      array[inputIndex] = {...array[inputIndex], upCircle: false};
      array.splice(inputIndex, 0, {value: inputValue, color: ElementStates.Modified});
      setArray([...array]);
      await timeDelay(DELAY_IN_MS);
    }

    array.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
        );
      }
    );
    setArray([...array]);
    setInputIndex(null);
    setInputValue('');
    setIsLoadingAddIndex(false);
    setIsDisabled(false);
  };

  const handleDeleteByIndex = async() => {
    setIsDisabled(true);
    setIsLoadingDeleteIndex(true);
    list.deleteByIndex(inputIndex);
    if (inputIndex !== null) {
      let currentIndex = 0;
      while (currentIndex <= inputIndex) {
        array[currentIndex] = {
          ...array[currentIndex],
          color: ElementStates.Changing,
          arrow: true
        };
        currentIndex ++;
        setArray([...array]);
        await timeDelay(DELAY_IN_MS);
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
      array.splice(inputIndex, 1);
      await timeDelay(DELAY_IN_MS);
    }

    array.forEach(item => {
      return (
        item.color = ElementStates.Default, item.arrow = false
        );
      }
    );
    setArray([...array]);
    setInputValue('');
    setInputIndex(null);
    setIsLoadingDeleteIndex(false);
    setIsDisabled(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            data-testid="inputValue"
            type="text"
            placeholder="Введите значение"
            value={inputValue}
            extraClass={styles.input}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <Button
            data-testid="addHead"
            type="button"
            text="Добавить в head"
            onClick={handleAddHead}
            linkedList="small"
            isLoader={isLoadingAddHead}
            disabled={!inputValue || isDisabled}
          />
          <Button
            data-testid="addTail"
            type="button"
            text="Добавить в tail"
            onClick={handleAddTail}
            linkedList="small"
            isLoader={isLoadingAddTail}
            disabled={!inputValue || isDisabled}
          />
          <Button
            data-testid="delHead"
            type="button"
            text="Удалить из head"
            onClick={handleDeleteHead}
            linkedList="small"
            isLoader={isLoadingDeleteHead}
            disabled={!array.length || isDisabled}
          />
          <Button
            data-testid="delTail"
            type="button"
            text="Удалить из tail"
            onClick={handleDeleteTail}
            linkedList="small"
            isLoader={isLoadingDeleteTail}
            disabled={!array.length || isDisabled}
          />
        </div>
        <div className={styles.container}>
          <Input
            data-testid="inputIndex"
            type="number"
            placeholder="Введите индекс"
            value={inputIndex ? inputIndex : ''}
            extraClass={styles.input}
            min={0}
            max={array.length - 1}
            onChange={handleChangeIndex}
            disabled={isDisabled}
          />
          <Button
            data-testid="addByIndex"
            type="button"
            text="Добавить по индексу"
            onClick={handleAddByIndex}
            linkedList="big"
            isLoader={isLoadingAddIndex}
            disabled={!inputIndex || !inputValue || isDisabled || inputIndex > array.length - 1 || inputIndex < 0}
          />
          <Button
            data-testid="delByIndex"
            type="button"
            text="Удалить по индексу"
            onClick={handleDeleteByIndex}
            linkedList="big"
            isLoader={isLoadingDeleteIndex}
            disabled={!inputIndex || isDisabled || inputIndex > array.length - 1 || inputIndex < 0}
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
                index={index}
                state={item?.color}
                head={(index === 0) && !item.upCircle ? HEAD : ''}
                tail={(index === array.length - 1) && !item.downCircle ?  TAIL : ''}
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
              <ArrowIcon fill={item.arrow ? changingColor : defaultColor} />
            }
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};

