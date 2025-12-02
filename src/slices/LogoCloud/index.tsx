import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `LogoCloud`.
 */
export type LogoCloudProps = SliceComponentProps<Content.LogoCloudSlice>;

/**
 * Component for "LogoCloud" Slices.
 */
const LogoCloud: FC<LogoCloudProps> = ({ slice }) => {
  return (
    <>
      <div
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mx-auto max-w-6xl w-[calc(100vw-3rem)] py-10 md:py-20 gap-y-8 flex flex-wrap justify-center"
      >
        {slice.primary.logos.map(
          (item, index) =>
            isFilled.image(item.image) && (
              <div
                key={`${index}-${item.image.id}`}
                className="flex place-content-center w-1/2 md:w-1/3 lg:w-1/5"
              >
                <PrismicNextImage
                  field={item.image}
                  sizes="150px"
                  className="max-w-[150px] h-16 object-contain grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                  fallbackAlt=""
                />
              </div>
            ),
        )}
      </div>
    </>
  );
};

export default LogoCloud;
