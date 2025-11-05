declare module 'react-syntax-highlighter' {
  import type { ComponentType } from 'react';

  export const Prism: ComponentType<any>;
  export const Light: ComponentType<any>;

  const SyntaxHighlighter: ComponentType<any>;
  export default SyntaxHighlighter;
}
