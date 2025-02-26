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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, FormProvider } from "react-hook-form";
import { createEventFormSchema } from "@/lib/zod";
import BasicDetails from "@/components/form/basic-fileds";
import EventDateTime from "@/components/form/datetime-fields";
import EventAgenda from "@/components/form/audience-agenda-fields";
import EventLinks from "@/components/form/links-fields";
import { ALLOWED_TYPES, EVENT_TYPE_DESCRIPTIONS } from "@/lib/utils";

type FormValues = z.infer<typeof createEventFormSchema>;

function PageHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="space-y-4 mb-8 w-full flex flex-col items-center justify-center align-middle">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Create a {heading?.charAt(0).toUpperCase() + heading?.slice(1)}
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
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

  return (
    <ScrollArea className="container mx-auto py-8 px-4">
      <PageHeader
        heading={segments[1]}
        description={
          EVENT_TYPE_DESCRIPTIONS[
            segments[1] as keyof typeof EVENT_TYPE_DESCRIPTIONS
          ]
        }
      />

      <div className="max-w-3xl mx-auto mb-8">
        <Card className="shadow-md border border-border/30">
          <CardHeader className="border-b border-border/20 bg-muted/20">
            <CardTitle className="text-2xl">Event Details</CardTitle>
            <CardDescription>
              Provide the essential information about your event
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(() =>
                  alert("Data: " + form.formState)
                )}
                className="space-y-6"
              >
                <BasicDetails />
                <EventDateTime />
                <EventAgenda />
                <EventLinks />

                <CardFooter className="px-0 pt-6 pb-0 flex justify-end border-t border-border/20 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                </CardFooter>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
