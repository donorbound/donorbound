import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "~/lib/auth-client";

export default async function DashboardPage() {
  const [session, activeSessions] = await Promise.all([
    authClient.getSession({
      //@ts-expect-error todo fix this
      headers: await headers(),
    }),
    authClient.listSessions({
      //@ts-expect-error todo fix this
      headers: await headers(),
    }),
  ]).catch(() => {
    throw redirect("/sign-in");
  });

  const sessionData = structuredClone(session);
  const activeSessionsData = structuredClone(activeSessions);

  console.log(sessionData, activeSessionsData);
  return (
    <div className="w-full">
      <div className="flex gap-4 flex-col">
        {/* <UserCard session={sessionData} activeSessions={activeSessionsData} /> */}
        {/* <OrganizationCard session={sessionData} /> */}
        {/* <BillingCard session={sessionData} /> */}
      </div>
    </div>
  );
}
