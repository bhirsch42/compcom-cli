import mexp, { Token } from "math-expression-evaluator";
import { fromPairs, toPairs } from "ramda";

const MODIFIER_VARS = ["ll", "grit"] as const;

const MODIFIER_TOKENS: Token[] = MODIFIER_VARS.map((s) => ({
  type: 3,
  token: `{${s}}`,
  show: `{${s}}`,
  value: `{${s}}`,
}));

type ModifierVarValues = { [k in typeof MODIFIER_VARS[number]]: number };

function evaluateModifier(
  modifier: number | string,
  values: ModifierVarValues
): number {
  if (typeof modifier === "number") {
    return modifier;
  }

  const normalizedValues = fromPairs(
    toPairs(values).map(([k, v]) => [`{${k}}`, v])
  );

  return mexp.eval(modifier, MODIFIER_TOKENS, normalizedValues);
}

export default evaluateModifier;
