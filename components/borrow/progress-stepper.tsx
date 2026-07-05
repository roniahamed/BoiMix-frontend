import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
  className?: string;
}

export function ProgressStepper({
  currentStep,
  totalSteps = 6,
  className,
}: ProgressStepperProps) {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative flex items-center justify-between px-2">
        {/* Connecting Lines Background */}
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-6">
          <div className="bg-muted-foreground/20 relative h-[2px] w-full">
            <div
              className="bg-primary absolute top-0 left-0 h-full transition-all duration-500 ease-in-out"
              style={{
                width: `${Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100)}%`,
              }}
            />
          </div>
        </div>

        {Array.from({ length: totalSteps }).map((_, i) => {
          const stepNumber = i + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "bg-background flex items-center justify-center rounded-full border-2 transition-all duration-300",
                  "h-4 w-4 md:h-5 md:w-5",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
