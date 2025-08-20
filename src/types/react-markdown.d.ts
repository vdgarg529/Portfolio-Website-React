// src/types/react-markdown.d.ts
declare module 'react-markdown' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface Components {
    [nodeType: string]: ComponentType<any>;
  }
  
  export interface ReactMarkdownProps {
    children: string;
    components?: Components;
  }
  
  const ReactMarkdown: ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}