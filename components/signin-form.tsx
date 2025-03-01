"use clinet";

import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const handleSignIn = async (provider: "github" | "google", router: AppRouterInstance) => {
  try {
    const response = await signIn(provider, {
      redirect: false,
    });

    if (!response?.error) {
      toast("Sign-in Successfully ✅");
      router.push("/dashboard");
    } else {
      toast("Sign-in failed ❌");
      console.error("Sign-in error:", response.error);
    }
  } catch (error) {
    toast("Sign-in failed ❌");
    console.error("Sign-in failed:", error);
  }
};

export default function SignInForm() {
  const router = useRouter();

  return (
    <div className="grid place-content-center">
      <div className="my-8 w-72">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleSignIn("github", router)}
            className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Continue with GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            onClick={() => handleSignIn("google")}
            className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Continue with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
