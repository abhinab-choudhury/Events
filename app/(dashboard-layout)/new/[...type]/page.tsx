"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { notFound, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { createEventFormSchema, FormSchema } from "@/lib/zod";
import BasicDetails from "@/components/form/basic-fileds";
import EventDateTime from "@/components/form/datetime-fields";
import EventAgenda from "@/components/form/audience-agenda-fields";
import EventLinks from "@/components/form/links-fields";
import { ALLOWED_TYPES, EVENT_TYPE_DESCRIPTIONS } from "@/lib/utils";
import AxiosInstance from "@/lib/axiosInstance";
import { useSession } from "next-auth/react";

function PageHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="space-y-4 mb-12 w-full text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-r from-gray-950 to-blue-950 bg-clip-text text-transparent">
        Create a{" "}
        {heading?.charAt(0).toUpperCase() +
          heading?.slice(1).toLocaleLowerCase()}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function EventForm() {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length !== 2 ||
    segments[0] !== "new" ||
    !ALLOWED_TYPES.includes(
      segments[1].toUpperCase() as (typeof ALLOWED_TYPES)[number]
    )
  ) {
    notFound();
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      type: segments[1].toUpperCase(),
      title: "",
      description: "",
      date_range: {
        from: new Date(),
        to: addDays(new Date(), 3),
      },
      start_time: "",
      end_time: "",
      approx_audience_count: 0,
      mode: "hybrid",
      location: "",
      online_join_link: "",
      has_agenda: false,
      has_external_links: false,
      social_links: {
        twitter: "",
        linkedin: "",
        website: "",
        youtube: "",
        instagram: "",
      },
      require_approval: false,
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    setIsSubmitting(true);

    try {
      if (status === "authenticated") {
        alert(JSON.stringify(data, null, 2));

        const response = await AxiosInstance.post("/event", data);
        console.log(JSON.stringify(response.data, null, 2));
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="container max-w-4xl mx-auto">
      <PageHeader
        heading={segments[1]}
        description={
          EVENT_TYPE_DESCRIPTIONS[
            segments[1] as keyof typeof EVENT_TYPE_DESCRIPTIONS
          ]
        }
      />

      <Card className="shadow-xl border border-slate-200 overflow-hidden mx-auto">
        <CardHeader className="border-b border-slate-100 bg-white py-8">
          <CardTitle className="text-2xl font-bold text-slate-800">
            Event Details
          </CardTitle>
          <CardDescription className="text-slate-500 mt-2 text-base">
            Provide the essential information about your event
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8 pb-4 px-8 bg-white">
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 divide-y divide-slate-100">
                <BasicDetails />
                <EventDateTime />
                <EventAgenda />
                <EventLinks />
              </div>

              <CardFooter className="px-0 pt-6 pb-2 flex justify-end border-t border-slate-100 mt-8">
                <Button
                  type="button"
                  variant="outline"
                  className="mr-3 border-slate-300 text-slate-700 hover:bg-slate-50"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </span>
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </CardFooter>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
