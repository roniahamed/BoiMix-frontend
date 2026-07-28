import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Clock, ShieldAlert } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Reports & Standing
        </h1>
        <p className="text-muted-foreground mt-2">
          Track the status of reports you&apos;ve submitted and view your
          account standing.
        </p>
      </div>

      <Tabs defaultValue="my-reports" className="space-y-6">
        <TabsList className="scrollbar-hide w-full justify-start overflow-x-auto rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="my-reports"
            className="data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none"
          >
            My Reports
          </TabsTrigger>
          <TabsTrigger
            value="account-standing"
            className="data-[state=active]:border-primary data-[state=active]:text-foreground text-muted-foreground rounded-none border-b-2 border-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none"
          >
            Account Standing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-reports" className="space-y-6 outline-none">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Submitted Reports</CardTitle>
              <CardDescription>
                A history of reports you have filed against books, users, or
                reviews.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Dummy Data Row 1 */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Fake Book Listing</h4>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Book
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Reported &quot;The Silent Patient&quot; for being a PDF
                      printout.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Submitted on Oct 12, 2023
                    </p>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 shadow-none hover:bg-yellow-500/20">
                    <Clock className="h-3 w-3" />
                    In Review
                  </Badge>
                </div>

                {/* Dummy Data Row 2 */}
                <div className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">Inappropriate Behavior</h4>
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        User
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Reported @john_doe for abusive language in messages.
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Submitted on Sep 28, 2023
                    </p>
                  </div>
                  <Badge className="flex items-center gap-1.5 bg-green-500/10 text-green-600 shadow-none hover:bg-green-500/20">
                    <CheckCircle className="h-3 w-3" />
                    Resolved
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="account-standing"
          className="space-y-6 outline-none"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm md:col-span-2">
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>
                  Your current standing within the BoiMix community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-500">
                      Excellent Standing
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-green-800/80 dark:text-green-500/80">
                      Your account is in great shape! You have zero active
                      strikes and a strong history of positive exchanges. Keep
                      up the good work!
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h4 className="text-lg font-semibold">Strike History</h4>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center">
                    <ShieldAlert className="text-muted-foreground/30 h-12 w-12" />
                    <h3 className="mt-4 text-lg font-semibold">
                      No strikes found
                    </h3>
                    <p className="text-muted-foreground mt-1 max-w-sm text-sm text-balance">
                      You haven&apos;t received any warnings or strikes. Thank
                      you for keeping the community safe.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-fit shadow-sm md:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Strike Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-muted flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Warning</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      A formal warning is issued.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-muted flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Temporary Ban</p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Account suspended for 7 days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-destructive/10 text-destructive flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="text-destructive font-semibold">
                      Permanent Ban
                    </p>
                    <p className="text-muted-foreground mt-0.5 text-xs">
                      Permanent account termination.
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <p className="text-muted-foreground text-xs">
                    Strikes expire after 6 months of good behavior. Severe
                    violations may result in immediate permanent bans.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
