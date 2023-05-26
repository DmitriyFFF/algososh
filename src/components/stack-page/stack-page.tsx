import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack.module.css"
import { TItem } from "../../utils/types";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [array, setArray] = useState<TItem[]>([]);

  const MAX_INPUT_LENGTH = 4;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePushStack = () => {

  };

  const handlePopStack = () => {

  };

  const handleClearStack = () => {

  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            type="text"
            value={inputValue}
            isLimitText={true}
            maxLength={MAX_INPUT_LENGTH}
            onChange={handleChange}
          />
          <Button
            type="submit"
            text="Добавить"
            // isLoader={isLoading}
          />
          <Button
            type="submit"
            text="Удалить"
            // isLoader={isLoading}
          />
        </div>
        <Button
          type="submit"
          text="Очистить"
          // isLoader={isLoading}
        />
      </form>
      {/* <div className={styles.circleContainer}>
        {array.map((item, index) => (
          <Circle letter={item.value} key={index} state={item.color}/>
        ))}
      </div> */}
    </SolutionLayout>
  );
};
