"use client";

import { useRouter } from "next/navigation";
import { useEffect, PropsWithChildren } from "react";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/auth/sign-in");
    } else {
      router.replace("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}

export default AuthGuard;
