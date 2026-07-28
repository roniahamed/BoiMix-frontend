import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { KeyRound, Lock, AlertTriangle } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground mt-2">
          Manage your password and secure your account.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-muted/50 overflow-hidden shadow-sm">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="text-primary h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <form className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Current Password</label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    className="bg-muted/20 pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Create new password"
                    className="bg-muted/20 pl-9"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="bg-muted/20 pl-9"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="bg-muted/30 flex items-center justify-between border-t px-6 py-4">
            <p className="text-muted-foreground text-sm">
              Use a strong password with at least 8 characters.
            </p>
            <Button className="shadow-sm">Update Password</Button>
          </CardFooter>
        </Card>

        <Card className="border-destructive/30 overflow-hidden shadow-sm">
          <CardHeader className="bg-destructive/5 border-destructive/20 border-b">
            <CardTitle className="text-destructive flex items-center gap-2 text-xl">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription className="text-destructive/80">
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="text-base font-semibold">Delete Account</h4>
                <p className="text-muted-foreground mt-1 max-w-lg text-sm">
                  Once you delete your account, there is no going back. All your
                  books, reviews, and exchanges will be permanently removed from
                  BoiMix.
                </p>
              </div>
              <Button
                variant="destructive"
                className="shrink-0 font-semibold shadow-sm"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
