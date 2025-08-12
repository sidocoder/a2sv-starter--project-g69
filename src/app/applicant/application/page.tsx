"use client";
import Header from "./dashboard/components/header";
import Footer from "./dashboard/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { ArrowRight, CheckCircle, Circle } from "lucide-react";
import { useEffect, useState } from "react";

// Inline WelcomeCard
function WelcomeCard() {
  const [hasApplied, setHasApplied] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate fetching application status
    // Replace with real API call
    async function fetchStatus() {
      try {
        const res = await fetch("/applications/my-status"); // Your API endpoint
        const data = await res.json();
        setHasApplied(data.hasApplied);
      } catch (err) {
        console.error("Failed to fetch status", err);
        setHasApplied(false); // fallback
      }
    }
    fetchStatus();
  }, []);

  if (hasApplied === null) {
    return <div className="p-6 text-white">Loading...</div>; // Or skeleton loader
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">G7 November Intake</h2>
      <p className="text-sm mb-6">
        {hasApplied
          ? "You have already applied. Check your application status."
          : "It's time to submit your application and show us your potential."}
      </p>
      <Link href={hasApplied ? "/applicant" : "/applicant/application/init"}>
        <Button className="bg-white text-purple-700 hover:bg-gray-100">
          {hasApplied ? "View Application Status" : "Start Application"}
        </Button>
      </Link>
    </div>
  );
}

// export default WelcomeCard; // Removed to avoid multiple default exports

// Inline ProfileCompletionCard
function ProfileCompletionCard() {
  const progressValue = 75; // Example progress value

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Complete Your Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {progressValue}% COMPLETE
          </span>
        </div>
        <Progress
          value={progressValue}
          className="w-full h-2 bg-gray-200 rounded-full"
        />
        <Link
          href="#"
          className="inline-flex items-center text-sm font-semibold text-purple-600 hover:underline mt-4"
        >
          Go to profile
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

// Inline ApplicationChecklistCard
interface ChecklistItemProps {
  text: string;
  completed: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, completed }) => (
  <div className="flex items-center gap-3">
    {completed ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <Circle className="w-5 h-5 text-gray-400" />
    )}
    <span className="text-gray-700">{text}</span>
  </div>
);

function ApplicationChecklistCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Application Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ChecklistItem text="Create an Account" completed={true} />
        <ChecklistItem text="Fill Personal Information" completed={true} />
        <ChecklistItem text="Submit Coding Profiles" completed={false} />
        <ChecklistItem text="Write Essays" completed={false} />
        <ChecklistItem text="Upload Resume" completed={false} />
      </CardContent>
    </Card>
  );
}

// Inline HelpfulResourcesCard
function HelpfulResourcesCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Helpful Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Link href="#" className="block text-purple-600 hover:underline">
          Tips for a Great Application
        </Link>
        <Link href="#" className="block text-purple-600 hover:underline">
          A2SV Problem Solving Guide
        </Link>
      </CardContent>
    </Card>
  );
}

export default function WelcomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome, John!</h1>
            <p className="text-gray-600 mt-1">
              Your journey to a global tech career starts now.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <WelcomeCard />
            </div>
            <div className="lg:col-span-1 space-y-6">
              <ProfileCompletionCard />
              <ApplicationChecklistCard />
              <HelpfulResourcesCard />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
