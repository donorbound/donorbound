"use client";

import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MailPlus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import type { ActiveOrganization, Session } from "~/lib/auth-types";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import CopyButton from "~/components/ui/copy-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { authClient } from "~/lib/auth-client";

export function OrganizationCard(properties: { session: Session | undefined }) {
  const organizations = authClient.useListOrganizations();
  const activeOrg = authClient.useActiveOrganization();
  const [optimisticOrg, setOptimisticOrg] = useState<
    ActiveOrganization | undefined
  >();
  const [isRevoking, setIsRevoking] = useState<string[]>([]);
  useEffect(() => {
    setOptimisticOrg(activeOrg.data);
  }, [activeOrg.data]);

  const inviteVariants = {
    exit: { height: 0, opacity: 0 },
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1 },
  };

  const { data } = authClient.useSession();
  const session = data || properties.session;

  const currentMember = optimisticOrg?.members.find(
    // @ts-expect-error TODO: fix this
    (member) => member.userId === session?.user.id,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <div className="flex justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <p className="text-sm">
                  <span className="font-bold" />{" "}
                  {optimisticOrg?.name || "Personal"}
                </p>

                <ChevronDownIcon />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                className=" py-1"
                onClick={() => {
                  authClient.organization.setActive(undefined);
                  setOptimisticOrg(undefined);
                }}
              >
                <p className="text-sm sm">Personal</p>
              </DropdownMenuItem>
              {organizations.data?.map((org) => (
                <DropdownMenuItem
                  className=" py-1"
                  key={org.id}
                  onClick={() => {
                    if (org.id === optimisticOrg?.id) {
                      return;
                    }
                    // @ts-expect-error TODO: fix this
                    authClient.organization.setActive(org.id);
                    setOptimisticOrg({
                      invitations: [],
                      members: [],
                      ...org,
                    });
                  }}
                >
                  <p className="text-sm sm">{org.name}</p>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <CreateOrganizationDialog />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="rounded-none">
            <AvatarImage
              className="object-cover w-full h-full rounded-none"
              src={optimisticOrg?.logo || ""}
            />
            <AvatarFallback className="rounded-none">
              {optimisticOrg?.name?.charAt(0) || "P"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p>{optimisticOrg?.name || "Personal"}</p>
            <p className="text-xs text-muted-foreground">
              {optimisticOrg?.members.length || 1} members
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-8 flex-col md:flex-row">
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
              Members
            </p>
            <div className="flex flex-col gap-2">
              {optimisticOrg?.members.map(
                // @ts-expect-error TODO: fix this
                (member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="sm:flex w-9 h-9">
                        <AvatarImage
                          src={member.user.image}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {member.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{member.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    {member.role !== "owner" &&
                      (currentMember?.role === "owner" ||
                        currentMember?.role === "admin") && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            authClient.organization.removeMember({
                              memberIdOrEmail: member.id,
                            });
                          }}
                        >
                          {currentMember?.id === member.id ? "Leave" : "Remove"}
                        </Button>
                      )}
                  </div>
                ),
              )}
              {!optimisticOrg?.id && (
                <div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session?.user.image} />
                      <AvatarFallback>
                        {session?.user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{session?.user.name}</p>
                      <p className="text-xs text-muted-foreground">Owner</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <p className="font-medium border-b-2 border-b-foreground/10">
              Invites
            </p>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {optimisticOrg?.invitations
                  // @ts-expect-error TODO: fix this
                  .filter((invitation) => invitation.status === "pending")
                  // @ts-expect-error TODO: fix this
                  .map((invitation) => (
                    <motion.div
                      key={invitation.id}
                      className="flex items-center justify-between"
                      variants={inviteVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                    >
                      <div>
                        <p className="text-sm">{invitation.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {invitation.role}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          disabled={isRevoking.includes(invitation.id)}
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            authClient.organization.cancelInvitation(
                              {
                                invitationId: invitation.id,
                              },
                              {
                                onError: (context) => {
                                  toast.error(context.error.message);
                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id,
                                    ),
                                  );
                                },
                                onRequest: () => {
                                  setIsRevoking([...isRevoking, invitation.id]);
                                },
                                onSuccess: () => {
                                  toast.message(
                                    "Invitation revoked successfully",
                                  );
                                  setIsRevoking(
                                    isRevoking.filter(
                                      (id) => id !== invitation.id,
                                    ),
                                  );
                                  setOptimisticOrg({
                                    ...optimisticOrg,
                                    invitations:
                                      optimisticOrg?.invitations.filter(
                                        // @ts-expect-error TODO: fix this
                                        (inv) => inv.id !== invitation.id,
                                      ),
                                  });
                                },
                              },
                            );
                          }}
                        >
                          {isRevoking.includes(invitation.id) ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            "Revoke"
                          )}
                        </Button>
                        <div>
                          <CopyButton
                            textToCopy={`${globalThis.location.origin}/accept-invitation/${invitation.id}`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
              {optimisticOrg?.invitations.length === 0 && (
                <motion.p
                  className="text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  No Active Invitations
                </motion.p>
              )}
              {!optimisticOrg?.id && (
                <Label className="text-xs text-muted-foreground">
                  You can&apos;t invite members to your personal workspace.
                </Label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
          <div>
            <div>
              {optimisticOrg?.id && (
                <InviteMemberDialog
                  setOptimisticOrg={setOptimisticOrg}
                  optimisticOrg={optimisticOrg}
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CreateOrganizationDialog() {
  // const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [logo, setLogo] = useState<string | undefined>();

  useEffect(() => {
    if (!isSlugEdited) {
      const generatedSlug = name.trim().toLowerCase().replaceAll(/\s+/g, "-");
      setSlug(generatedSlug);
    }
  }, [name, isSlugEdited]);

  useEffect(() => {
    if (open) {
      setName("");
      setSlug("");
      setIsSlugEdited(false);
      setLogo(undefined);
    }
  }, [open]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2" variant="default">
          <PlusIcon />
          <p>New Organization</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>New Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to collaborate with your team.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Organization Name</Label>
            <Input
              placeholder="Name"
              value={name}
              onChange={(events) => setName(events.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Organization Slug</Label>
            <Input
              value={slug}
              onChange={(events) => {
                setSlug(events.target.value);
                setIsSlugEdited(true);
              }}
              placeholder="Slug"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Logo</Label>
            <Input type="file" accept="image/*" onChange={handleLogoChange} />
            {logo && (
              <div className="mt-2">
                <Image
                  src={logo}
                  alt="Logo preview"
                  className="w-16 h-16 object-cover"
                  width={16}
                  height={16}
                />
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              await authClient.organization.create(
                {
                  logo: logo || undefined,
                  name: name,
                  slug: slug,
                },
                {
                  onError: (error) => {
                    toast.error(error.error.message);
                    setLoading(false);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  // onSuccess: async (context) => {
                  //   try {
                  //     await client("@post/create-customer-organization", {
                  //       body: { organizationId: context.data.id },
                  //       method: "POST",
                  //     });
                  //     toast.success("Organization created successfully");
                  //     setOpen(false);
                  //     authClient.organization.setActive(context.data.id);
                  //   } catch (error) {
                  //     console.error("Error creating Stripe customer:", error);
                  //     toast.error(
                  //       "Organization created, but there was an issue setting up billing. Please contact support.",
                  //       {
                  //         action: {
                  //           label: "Support",
                  //           onClick: () => router.push("/support"),
                  //         },
                  //       },
                  //     );
                  //   }
                  // },
                },
              );
            }}
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function InviteMemberDialog({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  optimisticOrg,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOptimisticOrg,
}: {
  setOptimisticOrg: (org: ActiveOrganization | null) => void;
  optimisticOrg: ActiveOrganization | null;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, _setLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full gap-2" variant="secondary">
          <MailPlus size={16} />
          <p>Invite Member</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-11/12">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Invite a member to your organization.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            placeholder="Email"
            value={email}
            onChange={(events) => setEmail(events.target.value)}
          />
          <Label>Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              disabled={loading}
              // onClick={async () => {
              //   const invite = organizations.inviteMember({
              //     email: email,
              //     fetchOptions: {
              //       onSuccess: (context) => {
              //         if (optimisticOrg) {
              //           setOptimisticOrg({
              //             ...optimisticOrg,
              //             invitations: [
              //               ...(optimisticOrg?.invitations || []),
              //               context.data,
              //             ],
              //           });
              //         }
              //       },
              //       throw: true,
              //     },
              //     role: role as "member",
              //   });
              //   toast.promise(invite, {
              //     error: (error) => error.error.message,
              //     loading: "Inviting member...",
              //     success: "Member invited successfully",
              //   });
              // }}
            >
              Invite
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
