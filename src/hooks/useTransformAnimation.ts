import { isEmpty } from "ramda";
import React, { useEffect } from "react";

const TICK_INTERVAL = 40;

type Transform = (str: string) => string;

type TransformAnimation = (
  str: string,
  delta: number,
  done: () => void
) => string;

type Animation = {
  startTime: number;
  setDelta: (delta: number) => void;
  isDone: boolean;
};

let _interval: NodeJS.Timer | null = null;
let _animations: Animation[] = [];

function _tick() {
  for (let i = 0; i < _animations.length; i++) {
    const { startTime, setDelta, isDone } = _animations[i];
    if (!isDone) setDelta(Date.now() - startTime);
  }

  _animations = _animations.filter(({ isDone }) => !isDone);

  if (isEmpty(_animations)) {
    _interval && clearInterval(_interval);
    _interval = null;
  }
}

function _startAnimating() {
  if (_interval) return;
  _interval = setInterval(_tick, TICK_INTERVAL);
}

export default function useTransformAnimation(
  fn: TransformAnimation
): Transform {
  const [delta, setDelta] = React.useState(0);

  const animation = React.useRef<Animation>({
    startTime: Date.now(),
    setDelta,
    isDone: false,
  });

  const done = () => {
    animation.current.isDone = true;
  };

  useEffect(() => {
    if (!animation.current.isDone) {
      _animations.push(animation.current);
      _startAnimating();
    }
    return done;
  }, []);

  return animation.current.isDone
    ? (str) => str
    : (str: string) => fn(str, delta, done);
}
