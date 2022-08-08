declare module "math-expression-evaluator" {
  export type Token = {
    token: string;
    type: number;
    value?: string | ((a: number, b?: number) => number) | undefined;
    show: string;
    preced?: number | undefined;
  };

  // declare class Mexp {
  //   static lex(inp: string, tokens?: Token[]): Mexp;
  //   formulaEval(): Mexp;
  //   toPostfix(): Mexp;
  //   postfixEval(pair?: object): number | string;
  //   static eval(exp: string, tokens?: Token[], pair?: object): string;
  //   static eval(exp: string, mexp?: object): string;
  //   static addToken(tokens: Token[]): void;
  // }

  function eval(exp: string, tokens?: Token[], pair?: object): number;

  const mexp = {
    eval,
  };

  export default mexp;
}
