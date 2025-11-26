import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@/components/Button";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      innerClassName="grid gap-12 md:grid-cols-2 items-center"
    >
      <div className="grid">
        {isFilled.keyText(slice.primary.tagline) && (
          <span className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            {slice.primary.tagline}
          </span>
        )}
        {isFilled.richText(slice.primary.headline) && (
          <div className="text-5xl font-bold tracking-tight leading-tighter md:text-7xl text-gray-900 text-balance mt-2">
            <PrismicRichText field={slice.primary.headline} />
          </div>
        )}
        {isFilled.richText(slice.primary.description) && (
          <div className="max-w-md mt-6 text-lg text-gray-500 leading-relaxed">
            <PrismicRichText field={slice.primary.description} />
          </div>
        )}
        {slice.variation === "default" && (
          <>
            {slice.primary.buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-8">
                {slice.primary.buttons.map((button, index) => (
                  <Button key={index} field={button} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {slice.variation === "default" && (
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-sm">
          {isFilled.image(slice.primary.image) && (
            <PrismicNextImage
              field={slice.primary.image}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      )}
    </Bounded>
  );
};

export default Hero;
