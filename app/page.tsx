"use client"
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";

import { createAuthClient } from "better-auth/react";

const { useSession } = createAuthClient();

const HomePage = () => {
  const { data: session } = useSession();
  if (session?.user) {
    redirect("/publications");
  }

  return <Hero />;
};

export default HomePage;
