import PublicHeader from "@/app/applicant/application/dashboard/components/public-header";
import PublicFooter from "@/app/applicant/application/dashboard/components/public-footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ApplicationSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PublicHeader />
      <main className="flex-1 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Action Successful!
          </h1>
          <p className="text-gray-600 mb-8">
            Your application has been submitted successfully! We will notify you
            of the next steps via email.
          </p>
          <Link href="/auth/login">
            {" "}
            {/* Assuming a login page at /auth/login */}
            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg">
              Go to Login
            </Button>
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
