"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: "/",
    });
  };
  return (
    <div>
      <Button onClick={() => onClick("google")} variant="outline">
        Sign in
      </Button>
    </div>
  );
}
