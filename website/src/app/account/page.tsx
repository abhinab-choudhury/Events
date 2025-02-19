'use client';

import { GalleryVerticalEnd } from "lucide-react"
import SignInForm from '@/components/SignInForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
       <a href="#" className="flex items-center gap-2 self-center font-medium">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <GalleryVerticalEnd className="size-4" />
        </div>
        Events AI
      </a>
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
