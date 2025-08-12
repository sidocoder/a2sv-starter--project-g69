"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Header from "../dashboard/components/header";
import Footer from "../dashboard/components/footer";
import { useState } from "react";
import { startApplication } from "@/lib/redux/api/applicantApi";
import { redirect } from "next/navigation";

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

const ApplicationInitPage = () => {
  const titles = ["Personal Info", "Coding Profiles", "Essays & Resume"];

  interface FieldType {
    label: string;
    name: string;
    placeholder: string;
    width: "1/2" | "full";
    type: "input" | "textarea" | "file";
  }

  const fields: FieldType[][] = [
    [
      {
        label: "ID Number",
        name: "student_id",
        placeholder: "Enter your Id number",
        width: "1/2",
        type: "input",
      },
      {
        label: "School/University",
        name: "school",
        placeholder: "Enter your School/University",
        width: "1/2",
        type: "input",
      },
      {
        label: "Degree Program",
        name: "degree",
        placeholder: "Enter your Degree",
        width: "1/2",
        type: "input",
      },

      {
        label: "Country",
        name: "country",
        placeholder: "Enter your Country",
        width: "1/2",
        type: "input",
      },
    ],
    [
      {
        label: "Codeforces",
        name: "codeforces_handle",
        placeholder: "Enter your codeforces username",
        width: "1/2",
        type: "input",
      },
      {
        label: "LeetCode",
        name: "leetcode_handle",
        placeholder: "Enter your leetcode username",
        width: "1/2",
        type: "input",
      },
    ],
    [
      {
        label: "Essay About You",
        name: "essay_about_you",
        placeholder: "Tell us about yourself.",
        width: "full",
        type: "textarea",
      },
      {
        label: "Why A2SV?",
        name: "essay_why_a2sv",
        placeholder: "Why do you want to join us?",
        width: "full",
        type: "textarea",
      },
      {
        label: "Resume",
        name: "resume",
        placeholder: "Upload your Resume",
        width: "full",
        type: "file",
      },
    ],
  ];

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onSubmit = async () => {
    setLoading(true);
    setErrorMsg(null);
    const formData = new FormData();
    formData.append("student_id", form.student_id);
    formData.append("school", form.school);
    formData.append("degree", form.degree);
    formData.append("country", form.country);
    formData.append("leetcode_handle", form.leetcode_handle);
    formData.append("codeforces_handle", form.codeforces_handle);
    formData.append("essay_why_a2sv", form.essay_why_a2sv);
    formData.append("essay_about_you", form.essay_about_you);
    if (form.resume) {
      formData.append("resume", form.resume);
    }
    try {
      await startApplication(formData);
      redirect("/applicant");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        "Failed to submit application. Please try again.";
      setErrorMsg(msg);
      // Optionally redirect if already submitted
      if (msg.includes("already submitted")) {
        setTimeout(() => redirect("/applicant"), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const [form, setForm] = useState({
    student_id: "",
    school: "",
    degree: "",
    country: "",
    leetcode_handle: "",
    codeforces_handle: "",
    essay_why_a2sv: "",
    essay_about_you: "",
    resume: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const [step, setStep] = useState(0);

  interface FieldType {
    label: string;
    name: string;
    placeholder: string;
    width: "1/2" | "full";
    type: "input" | "textarea" | "file";
  }

  const renderField = (field: FieldType, idx: number) => {
    const colSpan = field.width === "full" ? "md:col-span-2" : "md:col-span-1";
    return (
      <div key={idx} className={colSpan}>
        <Label className="text-gray-700">{field.label}</Label>
        {field.type === "input" && (
          <Input
            name={field.name}
            placeholder={field.placeholder}
            className="mt-1"
            value={(form[field.name as keyof typeof form] as string) || ""}
            onChange={handleChange}
          />
        )}
        {field.type === "textarea" && (
          <textarea
            name={field.name}
            placeholder={field.placeholder}
            className="mt-1 border rounded w-full p-2"
            rows={5}
            value={(form[field.name as keyof typeof form] as string) || ""}
            onChange={handleChange}
          />
        )}
        {field.type === "file" && (
          <input
            type="file"
            name={field.name}
            className="mt-1"
            onChange={handleChange}
          />
        )}
      </div>
    );
  };

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
              {titles.map((title, index) => (
                <Step
                  key={index}
                  stepNumber={index + 1}
                  title={title}
                  isActive={step === index}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">{titles[step]}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {fields[step].map(renderField)}
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (step === 0) {
                      redirect("/applicant/application/");
                    } else {
                      setStep((prev) => Math.max(prev - 1, 0));
                    }
                  }}
                  // disabled={step === 0}
                >
                  Back
                </Button>

                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    if (step < fields.length - 1) {
                      setStep((prev) => prev + 1);
                    } else {
                      onSubmit();
                    }
                  }}
                  disabled={loading}
                >
                  {loading
                    ? "Submitting..."
                    : step === fields.length - 1
                    ? "Submit"
                    : `Next: ${titles[step + 1]}`}
                </Button>
                {errorMsg && (
                  <div className="text-red-600 mt-2 text-center">
                    {errorMsg && errorMsg.replace("Here's", "Here&apos;s")}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicationInitPage;
