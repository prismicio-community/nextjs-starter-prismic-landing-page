import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@/components/Button";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-6xl w-[calc(100vw-3rem)] py-10 md:py-20 grid gap-12 md:grid-cols-2 items-center"
    >
      <div>
        {isFilled.keyText(slice.primary.tagline) && (
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
            {slice.primary.tagline}
          </p>
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
        {slice.variation === "default" &&
          isFilled.repeatable(slice.primary.buttons) && (
            <div className="flex flex-wrap gap-4 mt-8">
              {slice.primary.buttons.map((button) => (
                <Button key={button.text} field={button} />
              ))}
            </div>
          )}
      </div>
      {slice.variation === "default" && (
        <PrismicNextImage
          field={slice.primary.image}
          className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-sm object-cover"
        />
      )}
    </section>
  );
};

export default Hero;
