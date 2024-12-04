"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function BillingCard() {
  // const router = useRouter();
  // const organizations = authClient.useListOrganizations();
  // const activeOrg = authClient.useActiveOrganization();

  // const currentMember = optimisticOrg?.members.find(
  //   (member) => member.userId === session?.user.id,
  // );

  const [loading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <div className="flex justify-between">
          <div>
            <Button>
              <PlusIcon />
              Manage Subscription
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <p>No active subscription found.</p>
        )}
      </CardContent>
    </Card>
  );
}
