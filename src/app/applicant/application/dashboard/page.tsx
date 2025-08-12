"use client";
import Header from "./components/header";
import Footer from "./components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Inline Stepper component for application steps
interface StepProps {
  stepNumber: number;
  title: string;
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, isActive }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        isActive ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"
      }`}
    >
      {stepNumber}
    </div>
    <span
      className={`text-sm font-medium ${
        isActive ? "text-purple-700" : "text-gray-600"
      }`}
    >
      {title}
    </span>
  </div>
);

export default function ApplicationFormPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-lg">
          <CardHeader className="pb-0">
            <CardTitle className="text-2xl font-bold text-center text-gray-800 mb-6">
              Application Form
            </CardTitle>
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <Step stepNumber={1} title="Personal Info" isActive={true} />
              <div className="flex-1 h-0.5 bg-purple-300 mx-2" />
              <Step stepNumber={2} title="Coding Profiles" isActive={false} />
              <div className="flex-1 h-0.5 bg-gray-200 mx-2" />
              <Step stepNumber={3} title="Essays & Resume" isActive={false} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="id-number" className="text-gray-700">
                  ID Number
                </Label>
                <Input
                  id="id-number"
                  placeholder="Enter your ID number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="school-university" className="text-gray-700">
                  School / University
                </Label>
                <Input
                  id="school-university"
                  placeholder="Enter your school/university"
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="degree-program" className="text-gray-700">
                  Degree Program
                </Label>
                <Input
                  id="degree-program"
                  placeholder="Enter your degree program"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <Link href="/applicant/application">
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  Back
                </Button>
              </Link>
              <Link href="/applicant/application/dashboard/coding-profiles">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Next: Coding Profiles
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
