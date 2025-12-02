import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export function Button(props: PrismicNextLinkProps) {
  const { field, className } = props;
  const variant = field?.variant || "Filled";

  return (
    <PrismicNextLink
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium transition-colors duration-200 border",
        variant === "Outline"
          ? "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300"
          : "bg-zinc-900 text-white hover:bg-zinc-700 hover:text-zinc-100 border-zinc-900 hover:border-zinc-700",
        className,
      )}
      {...props}
    />
  );
}
