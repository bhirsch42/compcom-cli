import React from "react";
import { Text, Transform } from "ink";
import { slice } from "ramda";
import useTransformAnimation from "./hooks/useTransformAnimation";

const DURATION = 400;

const TypeyText: typeof Text = ({ children, ...props }) => {
  const rand = React.useRef(Math.random());

  const transform = useTransformAnimation((str, delta, done) => {
    const lengthBasedDelay = rand.current * (Math.log(str.length) - 2) * 400;
    const extraDelay = Math.max(lengthBasedDelay, 0);

    const endSlice = Math.ceil((delta / (DURATION + extraDelay)) * str.length);

    if (endSlice > str.length) {
      done();
      return str;
    }

    const strStart = slice(0, endSlice, str);
    const strEnd = slice(endSlice, str.length, str);
    const fillEnd = strEnd.replaceAll(/./g, " ");

    return `${strStart}${"░"}${fillEnd}`;
  });

  return (
    <Text {...props}>
      <Transform transform={transform}>{children}</Transform>
    </Text>
  );
};

export default TypeyText;
