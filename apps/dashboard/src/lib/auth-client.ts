import {
  organizationClient,
  passkeyClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  appName: "Donorbound",
  baseURL: "http://localhost:9999",
  fetchOptions: {
    onError(error) {
      if (error.error.status === 429) {
        toast.error("Too many requests. Please try again later.");
      }
    },
  },
  plugins: [organizationClient(), twoFactorClient(), passkeyClient()],
});

export const {
  getSession,
  listSessions,
  organization,
  signIn,
  signOut,
  signUp,
  useActiveOrganization,
  useListOrganizations,
  useSession,
} = authClient;
