// types.ts
export interface TimelineItemType {
  status: "completed" | "current" | "pending";
  title: string;
  date: string;
  description?: string;
}
