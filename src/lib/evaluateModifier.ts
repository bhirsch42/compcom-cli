import mexp, { Token } from "math-expression-evaluator";
import { fromPairs, sum, toPairs } from "ramda";

const MODIFIER_VARS = ["ll", "grit"] as const;

const MODIFIER_TOKENS: Token[] = MODIFIER_VARS.map((s) => ({
  type: 3,
  token: `{${s}}`,
  show: `{${s}}`,
  value: `{${s}}`,
}));

type ModifierVarValues = { [k in typeof MODIFIER_VARS[number]]: number };

function evaluateModifier(
  modifier: number | string | number[] | string[],
  values: ModifierVarValues
): number {
  if (typeof modifier === "number") {
    return modifier;
  }

  if (typeof modifier === "object") {
    // Not sure what to do with arrays. No examples in original Compcon
    // codebase, but it accepts an array type for some reason.
    return sum(modifier.map((val) => evaluateModifier(val, values)));
  }

  const normalizedValues = fromPairs(
    toPairs(values).map(([k, v]) => [`{${k}}`, v])
  );

  return mexp.eval(modifier, MODIFIER_TOKENS, normalizedValues);
}

export default evaluateModifier;
