import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicText } from "@prismicio/react";
import { Button } from "@/components/Button";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mx-auto max-w-4xl w-[calc(100vw-3rem)] py-10 md:py-20 flex flex-col items-center gap-8 text-center"
    >
      {isFilled.richText(slice.primary.heading) && (
        <h2 className="text-5xl font-bold tracking-tighter md:text-7xl text-balance text-gray-900">
          <PrismicText field={slice.primary.heading} />
        </h2>
      )}

      {isFilled.repeatable(slice.primary.buttons) && (
        <ul className="flex flex-wrap justify-center gap-4">
          {slice.primary.buttons.map((button) => (
            <li key={button.key}>
              <Button field={button} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CallToAction;
