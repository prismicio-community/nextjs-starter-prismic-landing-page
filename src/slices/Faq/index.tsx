import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="text-4xl font-bold tracking-tighter text-gray-900 md:text-5xl mb-12 text-balance">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}

      <div className="flex flex-col">
        {isFilled.group(slice.primary.items) &&
          slice.primary.items.map((item, index) => (
            <div
              key={index}
              className="border-t border-gray-200 py-8 first:border-t-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="">
                  {isFilled.keyText(item.question) && (
                    <h3 className="text-lg font-medium text-gray-900">
                      {item.question}
                    </h3>
                  )}
                </div>
                <div className="">
                  {isFilled.richText(item.answer) && (
                    <div className="text-gray-500 leading-relaxed">
                      <PrismicRichText field={item.answer} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </Bounded>
  );
};

export default Faq;
