"use client";

import React from "react";
import Link from "next/link";
import Header from "@/app/applicant/application/dashboard/components/header";
import PublicFooter from "@/app/applicant/application/dashboard/components/public-footer";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-7xl font-extrabold text-purple-600 drop-shadow-lg"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 text-2xl font-semibold text-gray-800"
        >
          Oops! Page not found
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-2 text-gray-600 max-w-md"
        >
          The page you are looking for doesn’t exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <Link href="/" passHref>
            <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <HomeIcon className="w-5 h-5" />
              Go Back Home
            </Button>
          </Link>
        </motion.div>
      </main>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
}
