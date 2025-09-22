"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const usePathName = usePathname();
  const isSignIn = usePathName === "/sign-in";

  return (
    <div className="min-h-screen flex flex-col min-w-screen ">
      <div className="flex flex-row justify-between items-center px-4 border-b  border-[#2a2a2a]">
        <div className="flex flex-row items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="ml-[-20px]"
          />
          <h1 className="text-xl text-white font-bold">My Finance</h1>
        </div>
        <div>
          <button className="bg-[#2a2a2a] px-4 py-2 rounded-lg text-white font-bold text-sm">
            <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </button>
        </div>
      </div>
      <div className="p-4 flex justify-center items-center w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
