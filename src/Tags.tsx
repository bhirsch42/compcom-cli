import { complement, equals, filter, join, pipe, pluck, where } from "ramda";
import React from "react";
import { Tag } from "./store/selectors/selectMech/getTag";
import TypeyText from "./TypeyText";

const Tags: React.FC<{ tags: Tag[] }> = ({ tags }) => {
  const str = pipe<[Tag[]], Tag[], string[], string>(
    filter(complement(where({ hidden: equals(true) }))),
    pluck("name"),
    join(", ")
  )(tags);

  return <TypeyText>{str}</TypeyText>;
};

export default Tags;
