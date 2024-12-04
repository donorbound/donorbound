import { headers } from "next/headers";
import Link from "next/link";

import { authClient } from "~/lib/auth-client";

import { Button } from "./ui/button";

export async function SignInButton() {
  const session = await authClient.getSession({
    headers: await headers(),
  });

  return (
    <Link
      href={session ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button className="gap-2  justify-between" variant="default">
        {session ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <title>Dashboard Icon</title>
            <path fill="currentColor" d="M2 3h20v18H2zm18 16V7H4v12z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <title>Dashboard Icon</title>
            <path
              fill="currentColor"
              d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2z"
            />
          </svg>
        )}
        <span>{session ? "Dashboard" : "Sign In"}</span>
      </Button>
    </Link>
  );
}

function checkOptimisticSession(headers: Headers) {
  const guessIsSignIn =
    headers.get("cookie")?.includes("better-auth.session") ||
    headers.get("cookie")?.includes("__Secure-better-auth.session-token");
  return !!guessIsSignIn;
}

export async function SignInFallback() {
  //to avoid flash of unauthenticated state
  const guessIsSignIn = await checkOptimisticSession(await headers());
  return (
    <Link
      href={guessIsSignIn ? "/dashboard" : "/sign-in"}
      className="flex justify-center"
    >
      <Button className="gap-2  justify-between" variant="default">
        {guessIsSignIn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <title>Dashboard Icon</title>
            <path fill="currentColor" d="M2 3h20v18H2zm18 16V7H4v12z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <title>Sign In Icon</title>
            <path
              fill="currentColor"
              d="M5 3H3v4h2V5h14v14H5v-2H3v4h18V3zm12 8h-2V9h-2V7h-2v2h2v2H3v2h10v2h-2v2h2v-2h2v-2h2z"
            />
          </svg>
        )}
        <span>{guessIsSignIn ? "Dashboard" : "Sign In"}</span>
      </Button>
    </Link>
  );
}
