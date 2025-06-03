"use client";
import {  useRouter } from "next/navigation";
import Hero from "@/components/Hero";

import { createAuthClient } from "better-auth/react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const { useSession } = createAuthClient();

const HomePage = () => {
  const [loading, setLoading]=useState(false)
  const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;
  useEffect(() => {
    if (user) {
      router.push('/media')
    } else {
      setLoading(false);
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Hero />;
};

export default HomePage;
