import { adminClient, anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const { admin, signIn, signUp, signOut } = createAuthClient({
  /**
   * We are using the app under the same domain.
   * So we can leave this empty.
   */
  // baseURL: "",
  plugins: [adminClient(), anonymousClient()],
});
