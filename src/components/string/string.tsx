import React, { FormEvent, useState } from "react";
import { Input, } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import { useForm } from "../../hooks/useForm";

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm('');//Доделать
  const [isCircle, setIsCircle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick =() => {
    let start = 0;
    let end = values.length - 1;
    const timeDelay = 1000;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
  };


  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          isLimitText={true}
          maxLength={12}
          onChange={handleChange}
        />
        <Button
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
          onClick={handleClick}
        />
      </form>
    </SolutionLayout>
  );
};
