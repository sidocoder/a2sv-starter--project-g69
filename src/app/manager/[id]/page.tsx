import Link from "next/link";

export default function ManagerDetailPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      {/* Top Navigation */}
      <div className="flex justify-between items-center  bg-white px-6 py-4 shadow">
        <Link href="/manager" className="text-sm pl-15 text-gray-500 hover:underline">
          ← Back to Dashboard
        </Link>
        <div className="text-sm text-gray-700  pr-20 flex items-center">
          <p className="mr-5">Sarah Manager</p>
          <button className="hover:underline">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-6 py-10 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div className="flex flex-col w-full lg:w-2/3 gap-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage: Abel Tadesse</h2>

          {/* Applicant Profile */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Applicant Profile</h3>

            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex items-center space-x-50 mb-6">
                <div>
                <p className="text-gray-500 font-semibold">School:</p>
                <p className="font-semibold">Addis Ababa Institute of Technology</p>
                </div>
                 <div>
                <p className="text-gray-500 font-semibold">Degree Program:</p>
                <p className=" font-semibold">Software Engineering</p>
              </div>
              </div>
             
              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Coding Profiles:</p>
                <div className="space-x-4">
                  <a href="#" className="text-blue-600">GitHub</a>
                  <a href="#" className="text-blue-600">LeetCode</a>
                  <a href="#" className="text-blue-600">Codeforces</a>
                </div>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Essay 1: Tell us about yourself?</p>
                <p className="font-semibold">I am passionate about solving complex problems.</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Essay 2: Why do you want to join us?</p>
                <p className="font-semibold">I want to join because I am sure it will help me to improve my problem solving skill.</p>
              </div>
              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Resume:</p>
                <p className="">
                  <a href="#" className="text-blue-600">View Resume.pdf</a>
                </p>
              </div>
            </div>
          </div>

          {/* Reviewer Feedback */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Reviewer’s Feedback (Jane R.)</h3>

            <div className="text-sm text-gray-700 space-y-3">
              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Activity Check:</p>
                <p className="font-semibold">Pass • 50 LC, 35 CF, 30 days active</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Resume Score:</p>
                  <p className="font-semibold">85/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Essay Score:</p>
                  <p className="font-semibold">90/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Tech Interview:</p>
                  <p className="font-semibold">88/100</p>
                </div>
                <div className="mb-6">
                  <p className="text-gray-500 font-semibold">Behavioral:</p>
                  <p className="font-semibold">92/100</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 font-semibold">Interviewer Notes:</p>
                <p className="font-semibold">Strong candidate with excellent problem-solving skills.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Manager Actions) */}
        <div className="w-full  lg:w-1/3 pt-14">
          <div className="bg-white p-7 rounded-lg shadow flex flex-col space-y-8">
            {/* Section 1: Assign Reviewer */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Manager Actions</h3>
              <label className="text-sm text-gray-600 block mb-1">Assign Reviewer</label>
             <input
  type="text"
  value="Jane R."
  readOnly
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

              <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm font-medium">
                Confirm
              </button>
            </div>

            {/* Section 2: Final Decision */}
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Final Decision</strong><br />
                <span className="text-xs text-gray-400">(This action is final and will notify the applicant.)</span>
              </p>
              <div className="flex gap-4 mt-2">
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-medium">
                  Reject
                </button>
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E293B] text-center text-white text-sm py-4">
        © 2023 A2SV. All rights reserved.
      </footer>
    </div>
  );
}
