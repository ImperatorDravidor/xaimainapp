import React from "react";

export const metadata = {
  title: "Your Recap | XanderAI",
  description: "A personalized recap of your AI workforce performance",
};

export default function RecapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 