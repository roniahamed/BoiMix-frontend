import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VerificationPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Identity Verification
        </h1>
        <p className="text-muted-foreground mt-2">
          Verify your identity to build trust within the BoiMix community and
          unlock premium features.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Benefits Sidebar */}
        <div className="space-y-6 md:col-span-1">
          <Card className="border-primary/20 bg-primary/5 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-primary flex items-center gap-2 text-lg">
                <ShieldCheck className="h-5 w-5" />
                Why Verify?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Verified Badge</p>
                  <p className="text-muted-foreground text-xs">
                    Show others you are a trusted reader.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Faster Exchanges</p>
                  <p className="text-muted-foreground text-xs">
                    Verified users see a 40% higher acceptance rate.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Priority Support</p>
                  <p className="text-muted-foreground text-xs">
                    Get your issues resolved faster by our team.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="flex items-start gap-3 p-4 text-sm">
              <AlertCircle className="text-muted-foreground h-5 w-5 shrink-0" />
              <p className="text-muted-foreground text-xs leading-relaxed">
                Your data is securely encrypted and will only be used for
                identity verification purposes. We never share this information
                with third parties.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Verification Form */}
        <div className="md:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Submit Documents</CardTitle>
              <CardDescription>
                Upload a clear image of your government-issued ID to get
                verified.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Document Type</Label>
                <Select defaultValue="nid">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nid">National ID Card</SelectItem>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="driving_license">
                      Driving License
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* Front Side Upload */}
                <div className="space-y-3">
                  <Label>Front Side</Label>
                  <div className="border-muted-foreground/25 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                      <FileText className="text-primary h-6 w-6" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-semibold">Click to upload</p>
                      <p className="text-muted-foreground text-xs">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </p>
                    </div>
                    <Input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>

                {/* Back Side Upload */}
                <div className="space-y-3">
                  <Label>Back Side</Label>
                  <div className="border-muted-foreground/25 hover:bg-muted/50 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                      <Upload className="text-primary h-6 w-6" />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-sm font-semibold">Click to upload</p>
                      <p className="text-muted-foreground text-xs">
                        SVG, PNG, JPG or GIF (max. 5MB)
                      </p>
                    </div>
                    <Input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="id-number">Document Number</Label>
                <Input
                  id="id-number"
                  placeholder="Enter your document ID number"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t px-6 py-4">
              <Button className="w-full sm:w-auto">
                Submit for Verification
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
