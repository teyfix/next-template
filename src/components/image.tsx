import { Image as ImagePrimitive } from "@imagekit/next";
import type { SetRequired } from "type-fest";
import { BrowserConfig } from "@/config/browser.config";
import { MissingPropsError } from "./image/errors";

const required = ["src", "width", "height"] as const;

type RequiredProp = (typeof required)[number];

/**
 * Wrapper component for `@imagekit/next` that ensures:
 *
 * - `urlEndpoint` is provided from `BrowserConfig`
 * - `src`, `width`, and `height` props are provided
 *
 * @see https://imagekit.io
 */
export default function Image(
  props: SetRequired<React.ComponentProps<typeof ImagePrimitive>, RequiredProp>,
) {
  const missing = required.filter((prop) => props[prop] == null);

  if (missing.length) {
    throw new MissingPropsError(missing);
  }

  return (
    <ImagePrimitive
      urlEndpoint={BrowserConfig.imageKit.urlEndpoint}
      {...props}
      transformation={
        props.transformation || [{ width: props.width, height: props.height }]
      }
    />
  );
}
