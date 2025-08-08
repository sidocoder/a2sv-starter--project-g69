import { Card, CardContent } from "./ui/Card";

interface StatCardProps {
  title: string;
  value: string;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <Card className="w-full border shadow-md">
      <CardContent className="p-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-1">{title}</h4>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}
