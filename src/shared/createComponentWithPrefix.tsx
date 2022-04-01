import React from "react";

interface ComponentWithPrefixOptions<T extends React.ElementType = "div"> {
  Component?: T;
  displayName?: string;
  defaultProps?: Partial<React.ComponentProps<T>>;
}

interface ExtendedProps {
  element?: React.ElementType;
}

interface ComponentWithPreffix<T extends React.ElementType> {
  (
    props: Partial<React.ComponentProps<T> | ExtendedProps>
  ): React.ReactElement | null;
  displayName?: string;
  defaultProps?: Partial<React.ComponentProps<T>>;
}

export default function createComponentWithPrefix<
  T extends React.ElementType = "div"
>(
  prefix: string,
  { Component, displayName, defaultProps }: ComponentWithPrefixOptions<T> = {}
): ComponentWithPreffix<T> {
  const ComponentWithPreffix = React.forwardRef(
    (
      { className, element: Element = Component || "div", ...props }: any,
      ref
    ) => (
      <Element
        ref={ref}
        className={`${prefix} ${className ? className : ""}`}
        {...props}
      />
    )
  );

  ComponentWithPreffix.defaultProps = defaultProps;
  ComponentWithPreffix.displayName = displayName;

  return ComponentWithPreffix as any;
}
