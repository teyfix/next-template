"use client";

import { Slot } from "@/components/ui/slot";
import { useRouter } from "@/i18n/routing";
import { signIn } from "@/lib/auth/client";

type Provider = "google" | "anonymous";
type Options = {
  provider: Provider;
};

async function handleSignIn<T extends Options>(options: T) {
  switch (options.provider) {
    case "google":
      return signIn.social({ provider: "google" });

    case "anonymous":
      return signIn.anonymous();

    default:
      throw new Error(`Unknown provider "${options.provider}"`);
  }
}

export function LoginButton(
  props: Options & {
    children: React.ReactElement<React.ComponentProps<"button">>;
  },
) {
  const router = useRouter();

  return (
    <Slot onClick={() => handleSignIn(props).then(() => router.refresh())}>
      {props.children}
    </Slot>
  );
}
