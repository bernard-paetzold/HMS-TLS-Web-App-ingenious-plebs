import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BulkTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p className="border-b border-neutral-600 border-dashed inline hover:cursor-help">
            fields
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <ul>
            <li>username</li>
            <li>first_name</li>
            <li>last_name</li>
            <li>email</li>
            <li>password</li>
            <li>role</li>
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
