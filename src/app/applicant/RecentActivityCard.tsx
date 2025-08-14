import { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Loader2,
  Circle,
  ArrowRight,
} from "lucide-react";
import { checkApplicationStatus } from "@/lib/redux/api/applicantApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ActivityType {
  type: string;
  title: string;
  date?: string;
}

export function RecentActivityCard({
  application_id,
}: {
  application_id: string;
}) {
  const [activities, setActivities] = useState<ActivityType[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await checkApplicationStatus(



            
        );
        setActivities(response.data.activities || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch activities");
        }
      } finally {
        setLoading(false);
      }
    }
    if (application_id) fetchActivities();
  }, [application_id]);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {act.type === "submitted" ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Calendar className="w-5 h-5 text-gray-500" />
            )}
            <div>
              <p className="font-medium text-gray-700">{act.title}</p>
              <p className="text-sm text-gray-500">{act.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}