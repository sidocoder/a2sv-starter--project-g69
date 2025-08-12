import React, { Suspense } from "react";
import NewPasswordPage from "./NewPasswordPage";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordPage />
    </Suspense>
  );
}
