import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  SliceComponentProps,
  PrismicRichText,
  PrismicText,
} from "@prismicio/react";

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>;

/**
 * Component for "Faq" Slices.
 */
const Faq: FC<FaqProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-6xl w-[calc(100vw-3rem)] py-10 md:py-20"
    >
      {isFilled.richText(slice.primary.heading) && (
        <h2 className="text-4xl font-bold tracking-tighter text-zinc-900 md:text-5xl mb-12 text-balance">
          <PrismicText field={slice.primary.heading} />
        </h2>
      )}

      <ul>
        {slice.primary.items.map((item) => (
          <li
            key={item.question}
            className="border-t border-zinc-200 py-8 first:border-t-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-zinc-500"
          >
            <h3 className="text-lg font-medium text-zinc-900">
              {item.question}
            </h3>
            <div className="leading-relaxed">
              <PrismicRichText field={item.answer} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Faq;
