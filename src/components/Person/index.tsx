import "./index.scss";
import React from "react";
import { dataArray } from "./../../data";
import { url } from "inspector";
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
  const renderedChildren = (
    <div className="children">
      {currentChildren.map((e: Person) => (
        <div className="child">
          <img
            className="child__image"
            src={`/images/${e.image}`}
            onClick={() => {
              console.log(e.image);
              changeCurrentParentId(e.id);
              changeCurrentChildren(getCurrentChildren(e.id));
            }}
          ></img>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <div className="parents">
        {currentParents.map((e: Person) => (
          <div className="parent">
            <img
              className="parent__image"
              src={`/images/${e.image}`}
              onClick={() => {
                console.log(e.image);
                changeCurrentParentId(e.id);
                changeCurrentChildren(getCurrentChildren(e.id));
              }}
            ></img>
            <div className="parent__name">{e.name}</div>
            <div className="parent__post">{e.post ? e.post : ""}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Person;
