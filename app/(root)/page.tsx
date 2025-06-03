"use client";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

const HomePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace("/media"); 
    }
  }, [isPending, session, router]);

  if (isPending || session?.user) {
    return null;
  }

  return <Hero />;
};

export default HomePage;
