"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  ShieldCheck,
  ShieldOff,
  Loader2,
  Trash2,
} from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiRequest } from "@/lib/api/client";
import { useAuthStore } from "@/stores/auth-store";

// ---------- Schemas ----------

const setPasswordSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type SetPasswordValues = z.infer<typeof setPasswordSchema>;
type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

// ---------- Password visibility toggle ----------

function PasswordInput({
  placeholder,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  error?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-1">
      <div className="relative">
        <Lock className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
        <Input
          {...props}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className="bg-muted/20 pr-10 pl-9"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 transition-colors"
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}

// ---------- Password strength meter ----------

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const len = password.length;
  const strong = len >= 12;
  const ok = len >= 8;

  return (
    <p
      className={`text-xs ${strong ? "text-emerald-500" : ok ? "text-yellow-500" : "text-destructive"}`}
    >
      {strong
        ? "✓ Strong password"
        : ok
          ? `✓ ${len} characters`
          : `✗ ${len}/8 characters minimum`}
    </p>
  );
}

// ---------- Set Password Form (social-login users with no password) ----------

function SetPasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const newPassword = watch("new_password", "");

  const onSubmit = async (data: SetPasswordValues) => {
    try {
      await apiRequest({
        method: "POST",
        url: "/auth/set-password",
        data: {
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        },
      });
      toast.success(
        "Password set successfully! You can now log in with email & password.",
      );
      onSuccess();
    } catch (err: any) {
      const detail =
        err?.new_password?.[0] ||
        err?.detail ||
        err?.message ||
        "Failed to set password. Please try again.";
      toast.error(detail);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">New Password</label>
        <PasswordInput
          {...register("new_password")}
          placeholder="Create a strong password"
          error={errors.new_password?.message}
        />
        <PasswordStrength password={newPassword} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm Password</label>
        <PasswordInput
          {...register("confirm_password")}
          placeholder="Repeat your password"
          error={errors.confirm_password?.message}
        />
      </div>

      <div className="flex items-center justify-between border-t pt-2">
        <p
          className={`text-sm transition-colors ${newPassword.length >= 8 ? "text-emerald-500" : "text-muted-foreground"}`}
        >
          Use at least 8 characters.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 gap-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Set Password
        </Button>
      </div>
    </form>
  );
}

// ---------- Change Password Form (users who already have a password) ----------

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const newPassword = watch("new_password", "");

  const onSubmit = async (data: ChangePasswordValues) => {
    try {
      await apiRequest({
        method: "POST",
        url: "/auth/change-password",
        data: {
          current_password: data.current_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        },
      });
      toast.success("Password changed successfully!");
      reset();
    } catch (err: any) {
      const detail =
        err?.current_password ||
        err?.new_password?.[0] ||
        err?.detail ||
        err?.message ||
        "Failed to change password. Please try again.";
      toast.error(detail);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium">Current Password</label>
        <PasswordInput
          {...register("current_password")}
          placeholder="Enter your current password"
          error={errors.current_password?.message}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">New Password</label>
          <PasswordInput
            {...register("new_password")}
            placeholder="Create a new strong password"
            error={errors.new_password?.message}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Confirm New Password</label>
          <PasswordInput
            {...register("confirm_password")}
            placeholder="Repeat the new password"
            error={errors.confirm_password?.message}
          />
        </div>
      </div>

      <PasswordStrength password={newPassword} />

      <div className="flex items-center justify-between border-t pt-2">
        <p
          className={`text-sm transition-colors ${newPassword.length >= 8 ? "text-emerald-500" : "text-muted-foreground"}`}
        >
          Use at least 8 characters.
        </p>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 gap-2"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Update Password
        </Button>
      </div>
    </form>
  );
}

// ---------- Page ----------

export default function SecurityPage() {
  const updateUser = useAuthStore((s) => s.updateUser);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Always fetch fresh from /auth/me to get accurate has_password value
  useEffect(() => {
    apiRequest<{ has_password: boolean }>({ method: "GET", url: "/auth/me" })
      .then((data) => setHasPassword(data.has_password))
      .catch(() => setHasPassword(null))
      .finally(() => setLoading(false));
  }, []);

  const router = useRouter();
  const clearSession = useAuthStore((s) => s.clearSession);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await apiRequest({
        method: "POST",
        url: "/auth/delete-account",
        data: hasPassword ? { password: deletePassword } : {},
      });
      clearSession();
      toast.success("Account deletion scheduled. You've been logged out.");
      router.push("/");
    } catch (err: any) {
      const msg =
        err?.password ||
        err?.detail ||
        err?.message ||
        "Failed to delete account. Please try again.";
      toast.error(msg);
    } finally {
      setDeleting(false);
    }
  };

  // After setting a password for the first time, update local store and re-fetch
  const handleSetPasswordSuccess = () => {
    setHasPassword(true);
    updateUser({ hasPassword: true });
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground mt-2">
          Manage your password and keep your account secure.
        </p>
      </div>

      <div className="space-y-6">
        {/* Password Card */}
        <Card className="border-muted/50 overflow-hidden shadow-sm">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="text-primary h-5 w-5" />
              {loading
                ? "Password"
                : hasPassword
                  ? "Change Password"
                  : "Set a Password"}
            </CardTitle>
            <CardDescription>
              {loading ? (
                "Loading your security settings…"
              ) : hasPassword ? (
                "Update your existing password to keep your account secure."
              ) : (
                <span className="flex items-center gap-1.5">
                  <ShieldOff className="h-4 w-4 text-orange-400" />
                  You signed up with a social account. Set a password to also
                  enable email &amp; password login.
                </span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {loading ? (
              <div className="text-muted-foreground flex items-center gap-3 py-4 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading…
              </div>
            ) : hasPassword === null ? (
              <p className="text-destructive text-sm">
                Could not load security settings. Please refresh the page.
              </p>
            ) : hasPassword ? (
              <ChangePasswordForm />
            ) : (
              <SetPasswordForm onSuccess={handleSetPasswordSuccess} />
            )}
          </CardContent>

          {!loading && hasPassword && (
            <CardFooter className="bg-muted/20 border-t px-6 py-3">
              <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Your password is saved securely and synced across all login
                methods.
              </span>
            </CardFooter>
          )}
        </Card>

        {/* Danger Zone */}
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
                  Your account will be scheduled for deletion and permanently
                  removed after <strong>30 days</strong>. You will be logged out
                  immediately. This action cannot be undone.
                </p>
              </div>
              <Button
                variant="destructive"
                className="shrink-0 gap-2 font-semibold shadow-sm"
                onClick={() => {
                  setDeleteOpen(true);
                  setDeleteConfirmText("");
                  setDeletePassword("");
                }}
              >
                <Trash2 className="h-4 w-4" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete Account
            </DialogTitle>
            <DialogDescription className="space-y-1 pt-1 text-sm">
              Your account will be{" "}
              <strong>permanently deleted after 30 days</strong>. You will be
              logged out immediately and cannot log back in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {hasPassword && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">
                  Confirm your password
                </label>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">
                Type{" "}
                <span className="text-destructive font-mono font-bold">
                  DELETE
                </span>{" "}
                to confirm
              </label>
              <Input
                placeholder="DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={
                deleteConfirmText !== "DELETE" ||
                (!!hasPassword && !deletePassword) ||
                deleting
              }
              onClick={handleDeleteAccount}
              className="gap-2"
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
