// declaration.d.ts
declare module '*.module.css';
declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}
