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
          ? "border-gray-200 bg-white text-gray-900 hover:bg-gray-50 hover:border-gray-300"
          : "bg-gray-900 text-white hover:bg-gray-700 hover:text-gray-100 border-gray-900 hover:border-gray-700",
        className,
      )}
      {...props}
    />
  );
}
