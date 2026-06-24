import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Update your personal information and bio.
        </p>
      </div>

      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input defaultValue="Roni Ahamed" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <Input defaultValue="roni" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Input defaultValue="Dhaka, Bangladesh" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Bio</label>
          <Textarea
            defaultValue="Love reading. Love sharing. Let's build a community of book lovers."
            rows={4}
          />
        </div>
        <Button>Save Changes</Button>
      </form>
    </div>
  );
}
