import Header from "../applicant/application/dashboard/components/header";
import Footer from "../applicant/application/dashboard/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  CheckCircle,
  Loader2,
  Circle,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Inline ApplicationTimeline
interface TimelineItemProps {
  status: "completed" | "current" | "pending";
  title: string;
  date?: string;
  description?: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  status,
  title,
  date,
  description,
}) => {
  const iconClass = "w-5 h-5";
  const lineClass = "absolute left-2.5 top-8 bottom-0 w-0.5";

  return (
    <div className="relative pl-8 pb-8">
      {status === "completed" && (
        <>
          <CheckCircle
            className={`text-green-500 absolute left-0 ${iconClass}`}
          />
          <div className={`${lineClass} bg-green-500`} />
        </>
      )}
      {status === "current" && (
        <>
          <Loader2
            className={`text-purple-500 absolute left-0 animate-spin ${iconClass}`}
          />
          <div className={`${lineClass} bg-gray-300`} />
        </>
      )}
      {status === "pending" && (
        <>
          <Circle className={`text-gray-300 absolute left-0 ${iconClass}`} />
          <div className={`${lineClass} bg-gray-300`} />
        </>
      )}
      <h3
        className={`font-semibold ${
          status === "completed" ? "text-gray-800" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
      {date && <p className="text-sm text-gray-500">{date}</p>}
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );
};

function ApplicationTimeline() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Application Timeline
      </h2>
      <div className="relative">
        <TimelineItem
          status="completed"
          title="Application Submitted"
          date="October 26, 2023"
          description="Your application has been successfully submitted. We're excited to learn more about you!"
        />
        <TimelineItem
          status="current"
          title="Under Review"
          date="Current Stage"
          description="Our team is currently reviewing your application. This may take a few days. Thank you for your patience."
        />
        <TimelineItem status="pending" title="Interview Stage" />
        <TimelineItem status="pending" title="Decision Made" />
      </div>
    </div>
  );
}

// Inline RecentActivityCard
function RecentActivityCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-gray-700">Application Submitted</p>
            <p className="text-sm text-gray-500">October 26, 2023</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-700">Interview Scheduled</p>
            <p className="text-sm text-gray-500">November 5, 2023</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Inline ImportantUpdatesCard
function ImportantUpdatesCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Important Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          There are no new updates at this time. We will notify you by email
          when your application status changes.
        </p>
      </CardContent>
    </Card>
  );
}

// Inline InterviewPrepCard
function InterviewPrepCard() {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-2">Get Ready for the Interview!</h2>
      <p className="text-sm mb-4">
        While you wait, it&apos;s a great time to prepare. Practice your
        problem-solving skills on platforms like LeetCode and Codeforces.
      </p>
      <Link
        href="#"
        className="inline-flex items-center text-sm font-semibold hover:underline"
      >
        Read our interview prep guide
        <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
}

export default function ApplicantDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Your Application Progress
            </h1>
            <p className="text-gray-600 mt-1">
                You&apos;re on your way! Here&apos;s a summary of your application status.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ApplicationTimeline />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <RecentActivityCard />
              <ImportantUpdatesCard />
              <InterviewPrepCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
