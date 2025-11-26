import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { Button } from "@/components/Button";
import { Bounded } from "@/components/Bounded";

/**
 * Props for `CallToAction`.
 */
export type CallToActionProps = SliceComponentProps<Content.CallToActionSlice>;

/**
 * Component for "CallToAction" Slices.
 */
const CallToAction: FC<CallToActionProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      innerClassName="max-w-4xl flex flex-col items-center gap-8 text-center"
    >
      {isFilled.richText(slice.primary.heading) && (
        <div className="text-5xl font-bold tracking-tighter md:text-7xl text-balance text-gray-900">
          <PrismicRichText field={slice.primary.heading} />
        </div>
      )}

      {slice.primary.buttons.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {slice.primary.buttons.map((button, index) => (
            <Button key={index} field={button} />
          ))}
        </div>
      )}
    </Bounded>
  );
};

export default CallToAction;
