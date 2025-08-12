"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2, Circle } from "lucide-react";
import { checkApplicationStatus } from "@/lib/redux/api/applicantApi";
import { useAppDispatch } from "@/store/hook";
import { createAxiosInstance } from "@/utils/axiosInstance";
import { TimelineItemType } from "./type";
import { useAppSelector } from "@/store/hook";

interface TimelineItemProps {
  status: "completed" | "current" | "pending";
  title: string;
  date?: string;
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ status, title, date, description }) => {
  const iconClass = "w-5 h-5";
  const lineClass = "absolute left-2.5 top-8 bottom-0 w-0.5";

  return (
    <div className="relative pl-8 pb-8">
      {status === "completed" && (
        <>
          <CheckCircle className={`text-green-500 absolute left-0 ${iconClass}`} />
          <div className={`${lineClass} bg-green-500`} />
        </>
      )}
      {status === "current" && (
        <>
          <Loader2 className={`text-purple-500 absolute left-0 animate-spin ${iconClass}`} />
          <div className={`${lineClass} bg-gray-300`} />
        </>
      )}
      {status === "pending" && (
        <>
          <Circle className={`text-gray-300 absolute left-0 ${iconClass}`} />
          <div className={`${lineClass} bg-gray-300`} />
        </>
      )}
      <h3 className={`font-semibold ${status === "completed" ? "text-gray-800" : "text-gray-700"}`}>
        {title}
      </h3>
      {date && <p className="text-sm text-gray-500">{date}</p>}
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </div>
  );
};

interface ApplicationTimelineProps {
  application_id: string;
}

export default function ApplicationTimeline({ application_id }: ApplicationTimelineProps) {
  const [timelineItems, setTimelineItems] = useState<TimelineItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get token from Redux store using typed hook
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token?.access ?? "");
  const axiosInstance = React.useMemo(() => createAxiosInstance(dispatch), [dispatch]);

  useEffect(() => {
    let isMounted = true;

    async function fetchTimeline() {
      if (!token) {
        if (isMounted) {
          setError("User not authenticated");
          setLoading(false);
        }
        return;
      }

      try {
  const response = await checkApplicationStatus(axiosInstance, token);
        if (isMounted) {
          setTimelineItems(response.data.timeline || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch timeline");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    if (application_id && token) {
      fetchTimeline();
    } else if (!token) {
      setLoading(false);
      setError("User not authenticated");
    }

    return () => {
      isMounted = false;
    };
  }, [application_id, token]);

  if (loading) return <p>Loading timeline...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (timelineItems.length === 0)
    return <p className="text-gray-500">No timeline data available.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Application Timeline</h2>
      <div className="relative">
        {timelineItems.map((item, idx) => (
          <TimelineItem
            key={idx}
            status={item.status}
            title={item.title}
            date={item.date}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
