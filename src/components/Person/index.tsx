import "./index.scss";
import React from "react";
import { dataArray } from "./../../data";
interface Person {
  id: number;
  name: string;
  post?: string;
  image: string;
  parent?: number;
}
interface PersonComponentProps {}
const Person = (props: PersonComponentProps) => {
  const [data, changeData] = React.useState<Person[]>(dataArray);
  const getCurrentChildren = (parentId: number) => {
    const newChildren = data.filter((e: Person) => e.parent === parentId);
    return newChildren;
  };
  const [currentParents, changeCurrentParents] = React.useState<Person[]>(
    data.filter((e: Person) => !e.parent)
  );
  const [currentParentId, changeCurrentParentId] = React.useState<number>(1);
  const [currentChildren, changeCurrentChildren] = React.useState<Person[]>(
    getCurrentChildren(currentParentId)
  );
  return <div></div>;
};

export default Person;
