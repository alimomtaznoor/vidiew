"use client";
import { redirect } from "next/navigation";
import Hero from "@/components/Hero";

import { createAuthClient } from "better-auth/react";
import { useEffect, useState } from "react";

const { useSession } = createAuthClient();

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      redirect("/media");
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
