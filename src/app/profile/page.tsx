"use client";

import Header from "@/app/applicant/application/dashboard/components/header";
import PublicFooter from "@/app/applicant/application/dashboard/components/public-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Banner and Profile Picture Section */}
          <div className="relative h-40 bg-gray-200">
            <Image
              src="/placeholder.svg?height=160&width=900"
              alt="Profile Banner"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <div className="absolute -bottom-16 left-8">
              <Image
                src="/placeholder.svg?height=120&width=120"
                alt="Profile Picture"
                width={120}
                height={120}
                className="rounded-full border-4 border-white shadow-md"
              />
            </div>
          </div>

          {/* User Info and Profile Details */}
          <div className="pt-20 pb-8 px-8">
            <h1 className="text-2xl font-bold text-gray-800">Abebe Kebede</h1>
            <p className="text-gray-600">abe@a2sv.org</p>

            {/* Personal Information Card */}
            <Card className="mt-8 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full-name" className="text-gray-700">
                    Full name
                  </Label>
                  <Input
                    id="full-name"
                    value="Abebe Kebede"
                    readOnly
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <Label htmlFor="email-address" className="text-gray-700">
                    Email address
                  </Label>
                  <Input
                    id="email-address"
                    value="abe@a2sv.org"
                    readOnly
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="role" className="text-gray-700">
                    Role
                  </Label>
                  <Input
                    id="role"
                    value="Applicant"
                    readOnly
                    className="mt-1 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="md:col-span-2 text-right">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <Card className="mt-8 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="current-password" className="text-gray-700">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="new-password" className="text-gray-700">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label
                    htmlFor="confirm-new-password"
                    className="text-gray-700"
                  >
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2 text-right">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
