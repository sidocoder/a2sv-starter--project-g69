import React from "react";
import Link from "next/link";
import "./globals.css";

const page = () => {
  return (
    <div>
      Home page
      <br></br>
      <Link href="/auth/login">Login page</Link>
    </div>
  );
};

export default page;
