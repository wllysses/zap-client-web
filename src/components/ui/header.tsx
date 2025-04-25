import { RefreshCcwIcon, ZapIcon } from "lucide-react";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="p-4 border-b w-full flex items-center justify-between">
      <div className="w-full flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary flex items-center justify-center">
            <ZapIcon className="text-white dark:text-black" size={18} />
          </div>
          <h1 className="italic text-lg">
            Zap<span className="font-bold">ApiClient</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            size="icon"
            title="Reload Page"
            onClick={() => window.location.reload()}
          >
            <RefreshCcwIcon size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
