"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LegacyTestPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/test");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="animate-pulse text-indigo-600 font-semibold">
        Redirecting to dynamic AI test builder...
      </div>
    </div>
  );
}
