import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground mt-2">
          Manage your password and account security.
        </p>
      </div>

      <div className="bg-card space-y-6 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New Password</label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm New Password</label>
            <Input type="password" />
          </div>
          <Button>Update Password</Button>
        </form>
      </div>

      <div className="bg-card space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">
          Two-Factor Authentication (2FA)
        </h2>
        <p className="text-muted-foreground text-sm">
          Add an extra layer of security to your account.
        </p>
        <Button variant="outline">Enable 2FA</Button>
      </div>
    </div>
  );
}
