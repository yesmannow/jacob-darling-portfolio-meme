/* globals.d.ts
   Provide minimal JSX global typings for environments where @types/react may not be picked up
   This file complements @types/react and only adds a safe fallback for custom elements.
*/
declare namespace JSX {
  interface IntrinsicElements {
    // allow any intrinsic element by default to avoid TS7026 where typings are missing
    // Common HTML elements remain typed via @types/react when present.
    [elemName: string]: any;
  }
}
