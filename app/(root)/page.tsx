"use client";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const HomePage = () => {
  const router = useRouter();
  const { data: session, isPending: loading } = authClient.useSession();
  const user = session?.user;
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/media");
      }
    }
  }, [session, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Hero />;
};

export default HomePage;
