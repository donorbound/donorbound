"use client";

import SignIn from "~/components/sign-in";
import { SignUp } from "~/components/sign-up";
import { Tabs } from "~/components/ui/tabs2";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex items-center flex-col justify-center w-full md:py-10">
        <div className="md:w-[400px]">
          <Tabs
            tabs={[
              {
                content: <SignIn />,
                title: "Sign In",
                value: "sign-in",
              },
              {
                content: <SignUp />,
                title: "Sign Up",
                value: "sign-up",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
