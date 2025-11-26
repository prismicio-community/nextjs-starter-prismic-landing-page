import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `LogoCloud`.
 */
export type LogoCloudProps = SliceComponentProps<Content.LogoCloudSlice>;

/**
 * Component for "LogoCloud" Slices.
 */
const LogoCloud: FC<LogoCloudProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.group(slice.primary.logos) && (
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 items-center justify-items-center">
          {slice.primary.logos.map((item, index) => (
            <div
              key={index}
              className="flex justify-center w-full max-w-[150px] grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            >
              <div className="flex items-center justify-center w-full h-16 relative">
                {isFilled.image(item.image) && (
                  <PrismicNextImage
                    field={item.image}
                    className="max-h-full max-w-full object-contain"
                    fallbackAlt=""
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Bounded>
  );
};

export default LogoCloud;
