import Header from "../components/header";
import Footer from "../components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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

export default function EssaysResumePage() {
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
              <Step stepNumber={1} title="Personal Info" isActive={false} />
              <div className="flex-1 h-0.5 bg-purple-300 mx-2" />
              <Step stepNumber={2} title="Coding Profiles" isActive={false} />
              <div className="flex-1 h-0.5 bg-purple-300 mx-2" />{" "}
              {/* This line should be purple for completed step */}
              <Step stepNumber={3} title="Essays & Resume" isActive={true} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Essays & Resume
            </h3>
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="essay-about-self" className="text-gray-700">
                  Tell us about your self.
                </Label>
                <Textarea
                  id="essay-about-self"
                  placeholder="Write your essay here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="essay-why-join" className="text-gray-700">
                  Why do you want to Join us?
                </Label>
                <Textarea
                  id="essay-why-join"
                  placeholder="Write your essay here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="resume-upload" className="text-gray-700">
                  Resume
                </Label>
                <p className="text-sm text-gray-600 mb-2">upload your resume</p>
                <div className="flex items-center gap-4">
                  <input id="resume-upload" type="file" className="hidden" />
                  <Label
                    htmlFor="resume-upload"
                    className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Choose File
                  </Label>
                  <span className="text-red-500 text-sm">*no file chosen</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Link href="/applicant/application/dashboard/coding-profiles">
                <Button
                  variant="outline"
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  Back
                </Button>
              </Link>
              <Link href="/applicant/application/dashboard/success">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  Submit
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
