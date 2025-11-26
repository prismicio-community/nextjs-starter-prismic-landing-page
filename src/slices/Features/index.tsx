import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

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
 * Component for "Features" Slices.
 */
const Features: FC<FeaturesProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
        <div className="lg:pr-8 lg:pt-4">
          <div className="lg:max-w-lg">
            {isFilled.richText(slice.primary.heading) && (
              <div className="text-3xl font-bold tracking-tighter text-gray-900 sm:text-4xl md:text-5xl">
                <PrismicRichText field={slice.primary.heading} />
              </div>
            )}

            {isFilled.richText(slice.primary.description) && (
              <div className="mt-6 text-lg leading-relaxed text-gray-500">
                <PrismicRichText field={slice.primary.description} />
              </div>
            )}

            {slice.primary.features.length > 0 && (
              <ul className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {slice.primary.features.map((item, index) => (
                  <li key={index} className="flex gap-x-3 items-start">
                    <CheckIcon
                      className="mt-1 h-5 w-5 flex-none text-black"
                      aria-hidden="true"
                    />
                    <div className="text-gray-600">
                      <PrismicRichText field={item.text} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex items-start justify-center lg:justify-end">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-sm w-full max-w-3xl">
            {isFilled.image(slice.primary.image) ? (
              <PrismicNextImage
                field={slice.primary.image}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="flex h-[400px] w-full items-center justify-center bg-gray-100 text-gray-400">
                Image Placeholder
              </div>
            )}
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Features;
