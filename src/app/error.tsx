"use client";

import { Button } from "@/components/ui/button/button";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="h-screen grid place-content-center gap-y-5">
          <h2 className="text-2xl text-red-500 font-medium">Something went wrong</h2>
          <Button onClick={() => reset()} className="w-[140px] mx-auto">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
