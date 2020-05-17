import "./index.scss";
import React from "react";
import { dataArray } from "./../../data";
import * as _ from "lodash";
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
  const [parentIds, changeParentIds] = React.useState<Array<number>>([]);
  const [currentChildren, changeCurrentChildren] = React.useState<Person[]>([]);
  const onBackButtonClick = () => {
    const ids = [...parentIds];
    ids.pop();
    if (!ids.length) {
      changeParentIds(ids);
      changeCurrentParents(data.filter((e: Person) => !e.parent));
      changeCurrentChildren([]);
      return;
    }
    const newParent = ids[ids.length - 1];
    changeCurrentChildren(newParent ? getCurrentChildren(newParent) : []);
    changeCurrentParents(data.filter((p: Person) => p.id === newParent));
    changeParentIds(ids);
  };

  const renderedChildren = (
    <div className="children">
      {currentChildren.map((e: Person) => (
        <div className="child">
          <img
            className="child__image"
            src={`/images/${e.image}`}
            onClick={() => {
              if (e.id !== parentIds[parentIds.length - 1]) {
                changeParentIds([...parentIds, e.id]);
                changeCurrentParents(data.filter((p: Person) => p.id === e.id));
                changeCurrentChildren(getCurrentChildren(e.id));
              }
            }}
          ></img>
          <div className="child__name">{e.name}</div>
          <div className="child__post">{e.post ? e.post : ""}</div>
        </div>
      ))}
    </div>
  );
  const onLogoClick = () => {
    changeCurrentChildren([]);
    changeCurrentParents(data.filter((e: Person) => !e.parent));
    changeParentIds([]);
  };
  return (
    <div>
      {parentIds.length ? (
        <div className="navbar-buttons">
          <span className="navbar-buttons__back" onClick={onBackButtonClick}>
            Back
          </span>
          <img
            className="navbar-buttons__logo"
            src="./logo.png"
            onClick={onLogoClick}
          />
        </div>
      ) : !currentChildren.length ? (
        <div className="main-page__logo">
          <img src="./logo.png" />
        </div>
      ) : (
        <div className="navbar-buttons" onClick={onBackButtonClick}>
          <span className="navbar-buttons__back">Back</span>
          <img
            className="navbar-buttons__logo"
            src="./logo.png"
            onClick={onLogoClick}
          />
        </div>
      )}
      <div className="parents">
        {currentParents.map((e: Person) => (
          <div className="parent">
            <img
              className="parent__image"
              src={`/images/${e.image}`}
              onClick={() => {
                if (e.id !== parentIds[parentIds.length - 1]) {
                  changeCurrentParents(
                    data.filter((p: Person) => p.id === e.id)
                  );
                  changeCurrentChildren(getCurrentChildren(e.id));
                }
              }}
            ></img>
            <div className="parent__name">{e.name}</div>
            <div className="parent__post">{e.post ? e.post : ""}</div>
          </div>
        ))}
      </div>
      {renderedChildren}
    </div>
  );
};

export default Person;
