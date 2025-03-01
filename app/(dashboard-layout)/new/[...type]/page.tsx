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
import { useForm, FormProvider } from "react-hook-form";
import { createEventFormSchema, FormValues } from "@/lib/zod";
import BasicDetails from "@/components/form/basic-fileds";
import EventDateTime from "@/components/form/datetime-fields";
import EventAgenda from "@/components/form/audience-agenda-fields";
import EventLinks from "@/components/form/links-fields";
import { ALLOWED_TYPES, EVENT_TYPE_DESCRIPTIONS } from "@/lib/utils";

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
        Create a {heading?.charAt(0).toUpperCase() + heading?.slice(1)}
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length !== 2 ||
    segments[0] !== "new" ||
    !ALLOWED_TYPES.includes(segments[1])
  ) {
    notFound();
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(createEventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date_range: {
        from: new Date(),
        to: addDays(new Date(), 5),
      },
      time: "",
      approx_audience_count: 0,
      location: "",
      mode: "hybrid",
      external_links: [],
      agenda: [""],
      online_join_link: "",
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

  const onSubmit = form.handleSubmit((data) => {
    setIsSubmitting(true);
    // Replace with actual submit logic
    setTimeout(() => {
      alert("Form submitted successfully!");
      setIsSubmitting(false);
    }, 1000);
  });

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
            <form onSubmit={onSubmit} className="space-y-8">
              <div className="space-y-8 divide-y divide-slate-100">
                <div className="pb-6">
                  <BasicDetails />
                </div>

                <div className="py-6">
                  <EventDateTime />
                </div>

                <div className="py-6">
                  <EventAgenda />
                </div>

                <div className="py-6">
                  <EventLinks />
                </div>
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
