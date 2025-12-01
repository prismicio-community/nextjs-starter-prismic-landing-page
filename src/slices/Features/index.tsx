import { FC } from "react";
import { asText, Content, isFilled } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
  PrismicText,
} from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features: FC<FeaturesProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-2xl lg:max-w-6xl w-[calc(100vw-3rem)] py-10 md:py-20 grid grid-cols-1 gap-x-8 lg:gap-x-12 gap-y-16 sm:gap-y-20 lg:grid-cols-2 items-center"
    >
      <div className="lg:max-w-lg">
        {isFilled.richText(slice.primary.heading) && (
          <h2 className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl">
            <PrismicText field={slice.primary.heading} />
          </h2>
        )}

        {isFilled.richText(slice.primary.description) && (
          <div className="mt-6 text-lg leading-relaxed text-gray-500">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}

        {isFilled.group(slice.primary.features) && (
          <ul className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
            {slice.primary.features.map((item, index) => (
              <li
                key={`${index}-${asText(item.text)}`}
                className="flex gap-3 items-start"
              >
                <CheckIcon
                  className="mt-1 size-5 shrink-0 text-black"
                  aria-hidden="true"
                />
                <div>
                  <PrismicRichText field={item.text} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PrismicNextImage
        field={slice.primary.image}
        className="rounded-2xl bg-gray-900 border border-gray-200 shadow-sm"
      />
    </section>
  );
};

export default Features;
