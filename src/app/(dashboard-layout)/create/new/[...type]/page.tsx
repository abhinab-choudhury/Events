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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Calendar as CalendarIcon,
  Clock,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALLOWED_TYPES = new Set([
  "conference",
  "meetup",
  "workshop",
  "hackathon",
]);

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = ["00", "15", "30", "45"];

const EVENT_TYPE_DESCRIPTIONS = {
  conference: "A large formal gathering where people meet to exchange ideas",
  meetup: "A casual networking event for like-minded individuals",
  workshop: "A hands-on learning session focused on specific skills",
  hackathon:
    "A collaborative event focused on building projects in a limited time",
};

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  date: z.date({
    message: "Please select a date.",
  }),
  timeHour: z.string({
    message: "Please select a hour",
  }),
  timeMinute: z.string({
    message: "Please select minutes.",
  }),
  location: z.string().min(5, {
    message: "Location must be at least 5 characters.",
  }),
});

export function PageHeader({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) {
  return (
    <div className="space-y-4 mb-8 w-full flex flex-col items-center justify-center align-middle">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Create a {heading.charAt(0).toUpperCase() + heading.slice(1)}
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
    </div>
  );
}

export default function CreateNewEvent() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const segments = pathname.split("/").filter(Boolean);

  if (
    segments.length !== 3 ||
    segments[0] !== "create" ||
    segments[1] !== "new" ||
    !ALLOWED_TYPES.has(segments[2])
  ) {
    notFound();
  }

  const eventType = segments[2];
  const eventTypeDescription =
    EVENT_TYPE_DESCRIPTIONS[eventType as keyof typeof EVENT_TYPE_DESCRIPTIONS];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      timeHour: "",
      timeMinute: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);

      // Success notification or redirect
      alert(`Successfully created ${eventType}: ${values.title}`);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="container mx-auto min-h-full overflow-y-scroll scrollbar-none">
      <PageHeader heading={eventType} description={eventTypeDescription} />

      <div className="max-w-3xl mx-auto">
        <Card className="shadow-none border-none">
          <CardHeader className="border-b border-border/20 bg-muted/20">
            <CardTitle className="text-2xl">Event Details</CardTitle>
            <CardDescription>
              Fill in the information below to create your {eventType}.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Title`}
                          {...field}
                          className="focus-visible:ring-primary"
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the main title of your event
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <div>
                          <Textarea
                            placeholder="Describe your event..."
                            {...field}
                            className="min-h-32 resize-none focus-visible:ring-primary"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Provide details about your event to attract participants
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="pl-3 text-left font-normal h-10 w-full"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span className="text-muted-foreground">
                                    Select a date
                                  </span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          When will this event take place?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <FormLabel>Time</FormLabel>
                    <div className="flex items-center space-x-2">
                      <FormField
                        control={form.control}
                        name="timeHour"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hours.map((hour) => (
                                  <SelectItem
                                    key={hour}
                                    value={hour.toString()}
                                  >
                                    {hour < 10 ? `0${hour}` : hour}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <span className="text-center">:</span>
                      <FormField
                        control={form.control}
                        name="timeMinute"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Min" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {minutes.map((minute) => (
                                  <SelectItem key={minute} value={minute}>
                                    {minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Clock className="h-4 w-4 opacity-50" />
                    </div>
                    <FormDescription className="mt-1">
                      Select the time in 24-hour format
                    </FormDescription>
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Event Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Location or virtual link "
                            {...field}
                            className="focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormDescription>
                          Physical address or virtual meeting link
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <CardFooter className="px-0 pt-4 pb-0 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

