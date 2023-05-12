import React from "react";
import { Input, } from "../ui/input/input";
import { Button } from "../ui/button/button"; 
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form action="">
        <Input></Input>
        <Button></Button>
      </form>
    </SolutionLayout>
  );
};
