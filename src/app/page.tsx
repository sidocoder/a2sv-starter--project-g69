"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GoToApplicant() {
  return (
    <Link href="/applicant">
      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md">
        Go to Applicant Page
      </Button>
    </Link>
  );
}
