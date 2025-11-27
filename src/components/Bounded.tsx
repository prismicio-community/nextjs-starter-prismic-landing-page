import { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  fullWidth?: boolean;
  innerClassName?: string;
  children?: ReactNode;
  [key: string]: any;
};

export function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
  ...restProps
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6 py-10 md:py-20 [.header+&]:pt-12 [.header+&]:md:pt-16",
        className,
      )}
      {...restProps}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          !fullWidth && "max-w-6xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}
