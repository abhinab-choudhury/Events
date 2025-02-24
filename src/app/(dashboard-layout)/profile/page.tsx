"use client";

export function ProfileHeader() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Profile
      </h1>
    </div>
  );
}

export default function Profile() {
  return (
    <div className="container w-[100%] mx-auto space-y-6">
      <ProfileHeader />
    </div>
  );
}
