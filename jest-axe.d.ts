declare module 'jest-axe' {
  import { AxeResults, RunOptions, ElementContext } from 'axe-core';

  export function axe(
    container: Element | Document | Node,
    options?: RunOptions
  ): Promise<AxeResults>;

  export type JestAxeMatchers = {
    toHaveNoViolations(): void;
  };
}
