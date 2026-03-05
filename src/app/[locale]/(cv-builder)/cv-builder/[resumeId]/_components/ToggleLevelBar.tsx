import { cn } from "@/lib/utils";

type ToggleLevelBarProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function ToggleLevelBar({
  label,
  checked,
  onChange,
}: ToggleLevelBarProps) {
  return (
    <label className="flex items-center justify-between cursor-pointer px-4 py-2 border rounded-lg bg-surface hover:border-default-hover duration-200">
      <span className="text-sm font-medium text-text-muted select-none">
        {label}
      </span>

      <div className="relative">
        <input
          onChange={(e) => onChange(e.target.checked)}
          type="checkbox"
          className="sr-only"
        />
        <div
          className={cn(
            "block w-12 h-7 rounded-full transition-colors duration-300 ease-in-out",
            checked ? "bg-default" : "bg-gray-300 dark:bg-text-muted",
          )}
        ></div>
        <div
          className={cn(
            "absolute left-1 top-1 bg-surface-static dark:bg-text-main w-5 h-5 rounded-full duration-200 ease-in-out flex items-center justify-center",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        ></div>
      </div>
    </label>
  );
}
