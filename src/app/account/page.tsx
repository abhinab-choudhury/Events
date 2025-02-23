"use client";

import SignInForm from '@/components/SignInForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-1 bg-background">
      <a
        href="#"
        className="flex flex-col items-center gap-2 self-center font-normal"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-md bg-black">
          <Image src="/logo.png" alt="logo" width={38} height={38} />
        </div>
        <span className="font-extrabold text-4xl">Events AI</span>
      </a>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
