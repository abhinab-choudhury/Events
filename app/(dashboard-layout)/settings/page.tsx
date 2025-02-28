"use client";

function Header() {
  return (
    <div className="space-y-2">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Settings
      </h1>
    </div>
  );
}

export default function Page() {
  return (
    <div className="container w-[100%] mx-auto space-y-6">
      <Header />
    </div>
  );
}
