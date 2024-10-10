import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Fallback() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="rounded-md bg-neutral-200 py-4 mb-2"></div>
        <div className="rounded-md bg-neutral-200 py-4"></div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-neutral-200 h-40"></div>
      </CardContent>
    </Card>
  );
}
