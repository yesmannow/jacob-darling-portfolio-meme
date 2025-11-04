/// <reference types="react" />

declare module 'react' {
  export = React;
  export as namespace React;

  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {
      [key: string]: any;
    }
  }

  namespace React {
    function useState<S>(initialState: S | (() => S)): [S, (newState: S | ((prevState: S) => S)) => void];
    function useState<S>(): [S | undefined, (newState: S | ((prevState: S) => S)) => void];

    function useEffect(effect: () => void | (() => void)): void;
    function useEffect(effect: () => void | (() => void), deps: any[]): void;

    function useMemo<T>(factory: () => T, deps: any[]): T;
    function useRef<T>(initialValue: T): { current: T };
    function useRef<T>(): { current: T | undefined };

    function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;

    function useContext<T>(Context: React.Context<T>): T;

    interface FC<P = {}> {
      (props: P): JSX.Element | null;
    }

    interface Context<T> {
      Provider: React.ComponentType<{ value: T; children: React.ReactNode }>;
      Consumer: React.ComponentType<{ children: (value: T) => React.ReactNode }>;
    }

    function createContext<T>(defaultValue: T): Context<T>;

    function createElement(
      type: React.ElementType,
      props?: React.PropsWithChildren<any> | null,
      ...children: React.ReactNode[]
    ): React.ReactElement;

    function forwardRef<T, P = {}>(
      render: React.ForwardRefRenderFunction<T, P>
    ): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;

    function memo<T extends React.ComponentType<any>>(
      Component: T,
      propsAreEqual?: (prevProps: React.ComponentProps<T>, nextProps: React.ComponentProps<T>) => boolean
    ): React.MemoExoticComponent<T>;

    function useReducer<R extends React.Reducer<any, any>>(
      reducer: R,
      initialState: React.ReducerState<R>
    ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];

    function useReducer<R extends React.Reducer<any, any>, I>(
      reducer: R,
      initializerArg: I,
      initializer: (arg: I) => React.ReducerState<R>
    ): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>];

    function useImperativeHandle<T>(ref: React.Ref<T>, init: () => T, deps?: any[]): void;

    function useLayoutEffect(effect: () => void | (() => void)): void;
    function useLayoutEffect(effect: () => void | (() => void), deps: any[]): void;

    function useDebugValue<T>(value: T, formatter?: (value: T) => string): void;

    function useTransition(): [boolean, (callback: () => void) => void];

    function useDeferredValue<T>(value: T): T;

    function useId(): string;

    type ReactNode = React.ReactChild | React.ReactFragment | React.ReactPortal | boolean | null | undefined;
    type ReactChild = React.ReactElement | React.ReactText;
    type ReactText = string | number;
    type ReactFragment = React.ReactNode[] | React.ReactPortal;
    type ReactPortal = React.ReactElement & { children: React.ReactNode[] };

    type Key = string | number;

    type Ref<T> = ((instance: T | null) => void) | { current: T | null } | null;

    type PropsWithChildren<P = {}> = P & { children?: React.ReactNode };

    type PropsWithoutRef<P> = Omit<P, 'ref'>;
    type RefAttributes<T> = { ref?: Ref<T> };
    type ForwardRefExoticComponent<P> = React.ComponentType<PropsWithoutRef<P> & RefAttributes<any>>;

    type ElementType = keyof JSX.IntrinsicElements | React.ComponentType<any>;

    interface ReactElement {
      type: ElementType;
      props: any;
      key: Key | null;
      ref: any;
    }

    interface Component<P = {}, S = {}> {
      render(): React.ReactNode;
      props: P;
      state: S;
      setState<K extends keyof S>(state: S[K] | ((prevState: S) => S[K])): void;
      forceUpdate(): void;
    }

    interface ComponentClass<P = {}, S = {}> extends React.ComponentClass<P> {
      new(props: P, context?: any): Component<P, S>;
    }

    type Props<T> = T & { children?: React.ReactNode };

    type Dispatch<A> = (value: A) => void;

    type Reducer<S, A> = (prevState: S, action: A) => S;
    type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
    type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<infer A, any> ? A : never;

    type EffectCallback = () => void | (() => void);
    type DependencyList = ReadonlyArray<any>;

    interface MutableRefObject<T> {
      current: T;
    }

    interface RefObject<T> {
      readonly current: T | null;
    }

    function isValidElement(element: any): boolean;

    function Fragment(props: PropsWithChildren): React.ReactElement;
    function StrictMode(props: PropsWithChildren): React.ReactElement;
    function Suspense(props: { children?: React.ReactNode; fallback?: React.ReactNode }): React.ReactElement;

    function cloneElement(element: React.ReactElement, props?: Partial<any> & { children?: React.ReactNode }, ...children: React.ReactNode[]): React.ReactElement;

    function createRef<T>(): React.MutableRefObject<T | null>;

    function findDOMNode(instance: React.Component<any, any> | React.ReactElement | null): HTMLElement | Text | null;

    const Children: {
      map<T, C>(children: C | C[], fn: (child: C, index: number) => T): T[];
      forEach<C>(children: C | C[], fn: (child: C, index: number) => void): void;
      count(children: any): number;
      only<C>(children: C): C;
      toArray(children: any): any[];
    };

    // CSS Properties
    interface CSSProperties {
      [key: string]: string | number | undefined;
    }
  }
}

declare module 'react/jsx-runtime' {
  export function jsx(type: React.ElementType, props?: React.PropsWithChildren<any> | null, ...children: React.ReactNode[]): React.ReactElement;
  export { jsx as jsxs, jsx as jsxDEV };
}

declare module 'react-dom/client' {
  import React from 'react';

  interface Root {
    render(element: React.ReactNode): void;
    unmount(): void;
  }

  function createRoot(container: HTMLElement): Root;

  export { createRoot };
}

declare module 'react-dom' {
  import React from 'react';

  function render(element: React.ReactElement, container: HTMLElement): void;
  function unmountComponentAtNode(container: HTMLElement): boolean;

  export { render, unmountComponentAtNode };
}