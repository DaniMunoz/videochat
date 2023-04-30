import { createElement } from "react";

export default function TodoContainer() {
  // the data
  const myData = [
    { key: 1, name: "Hello" },
    { key: 2, name: "World" },
    { key: 3, name: "etc" },
  ];
  // the loop
  const children = myData.map((val) =>
    createElement("button", { key: val["key"] }, val["name"])
  );
  // the div with children inside
  return createElement("div", { className: "contexCon" }, children);
}
