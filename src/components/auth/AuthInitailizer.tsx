"use client";

import { useEffect } from "react";

import { useRefreshToken } from "@/api/auth/use-refresh-token";
import { useAuthStore } from "@/store/store";
import { useRouter } from "next/navigation";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { mutate: refresh, isPending } = useRefreshToken();

  useEffect(() => {
    refresh();
  }, [refresh, setAuth, router]);

  if (isPending)
    return (
      <div className="min-h-screen min-w-screen flex justify-center items-center">
        Loading...
      </div>
    );

  return <>{children}</>;
}
