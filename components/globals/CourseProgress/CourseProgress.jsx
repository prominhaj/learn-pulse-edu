import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({ value, variant, size }) => {
  return (
    <div>
      <Progress
        value={value}
        variant={variant}
        className={cn("h-2", !variant && "text-sky-700")}
      />
      <p
        className={cn(
          "font-medium mt-2 text-[#12B886]",
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(value) || 0}% Complete
      </p>
    </div>
  );
};
