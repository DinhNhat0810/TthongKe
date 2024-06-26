"use client";

import { authApiRequests } from "@/apiRequests/auth";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

function LogoutLogic() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    authApiRequests
      .logoutFromNextClientToNextServer(true, signal)
      .then((res) => {
        //   setUser(null);
        localStorage.removeItem("token");
        router.push(`/login`);
      });
    return () => {
      controller.abort();
    };
  }, [router, pathname]);
  return <div>page</div>;
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
