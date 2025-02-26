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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm, useFieldArray } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { createEventFormSchema } from "@/lib/zod";

type FormValues = z.infer<typeof createEventFormSchema>;

export default function EventForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    name: "external_links",
    control: form.control,
  });

  const {
    fields: agendaFields,
    append: appendAgenda,
    remove: removeAgenda,
  } = useFieldArray({
    // @ts-ignore
    name: "agenda",
    control: form.control,
  });

  return (
    <ScrollArea className="container mx-auto py-8 px-4">
      <div className="space-y-4 mb-8 w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Create New Event
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl text-center">
          Fill in the details below to create your event
        </p>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <Card className="shadow-md border border-border/30">
          <CardHeader className="border-b border-border/20 bg-muted/20">
            <CardTitle className="text-2xl">Event Details</CardTitle>
            <CardDescription>
              Provide the essential information about your event
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(() =>
                  alert("Data: " + form.formState)
                )}
                className="space-y-6"
              >
                {/* Basic Information */}
                <div className="space-y-6">
                  {/* Event Title  */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Event Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter event title"
                            {...field}
                            className="focus-visible:ring-primary"
                          />
                        </FormControl>
                        <FormDescription>
                          Give your event a clear and catchy title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Banner Image */}
                  <FormField
                    control={form.control}
                    name="banner_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Banner Image
                        </FormLabel>
                        <FormControl>
                          <FileUpload onChange={field.onChange} />
                        </FormControl>
                        <FormDescription>
                          Upload an attractive banner image (recommended size:
                          1200 x 630px)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Details/Descriptions */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your event in detail..."
                            className="min-h-32 resize-none focus-visible:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description to help attendees
                          understand what to expect
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Date, Time and Location */}
                <div className="space-y-6 pt-4 border-t border-border/20">
                  <h3 className="text-lg font-semibold">
                    Date, Time & Location
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Range-Date Input */}
                    <FormField
                      control={form.control}
                      name="date_range"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="font-medium">
                            Event Dates
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value.from ? (
                                    field.value.to ? (
                                      <>
                                        {format(field.value.from, "LLL dd, y")}{" "}
                                        - {format(field.value.to, "LLL dd, y")}
                                      </>
                                    ) : (
                                      format(field.value.from, "LLL dd, y")
                                    )
                                  ) : (
                                    <span>Select date range</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={field.value?.from}
                                selected={field.value}
                                onSelect={field.onChange}
                                numberOfMonths={2}
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Select the start and end dates for your event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Event Time Input */}
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                          <FormLabel className="font-medium mb-2">
                            Start Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Select the start time of your event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Event Mode Input */}
                  <FormField
                    control={form.control}
                    name="mode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Event Mode
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="online" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Online
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="offline" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Offline
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="hybrid" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Hybrid
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          Select how participants will attend your event
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Location Input */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Location</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Physical venue address"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the physical address where the event will take
                          place
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Online Join Link */}
                  {(form.watch("mode") === "online" ||
                    form.watch("mode") === "hybrid") && (
                    <FormField
                      control={form.control}
                      name="online_join_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Online Join Link
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://zoom.us/meeting/..."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide a link for online participants to join the
                            event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                {/* Audience & Agenda */}
                <div className="space-y-6 pt-4 border-t border-border/20">
                  <h3 className="text-lg font-semibold">Audience & Agenda</h3>

                  {/* Audience Count */}
                  <FormField
                    control={form.control}
                    name="approx_audience_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Expected Audience Count
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Estimate how many people you expect to attend
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Agenda Input */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-medium">
                        Agenda Items
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        // @ts-ignore
                        onClick={() => appendAgenda("")}
                        className="flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Item
                      </Button>
                    </div>
                    {agendaFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`agenda.${index}`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Input
                                  placeholder={`Agenda item ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAgenda(index)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <FormDescription>
                      List the main activities or topics for your event
                    </FormDescription>
                  </div>

                  <FormField
                    control={form.control}
                    name="require_approval"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="font-medium">
                            Require Approval
                          </FormLabel>
                          <FormDescription>
                            Manually approve attendees before they can join your
                            event
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Links & Social Media */}
                <div className="space-y-6 pt-4 border-t border-border/20">
                  <h3 className="text-lg font-semibold">
                    External Links & Social Media
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-medium">
                        External Links
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendLink({ title: "", link: "" })}
                        className="flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Link
                      </Button>
                    </div>

                    {linkFields.map((field, index) => (
                      <div key={field.id} className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <FormField
                            control={form.control}
                            name={`external_links.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Link Title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`external_links.${index}.link`}
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder="https://..."
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLink(index)}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <FormDescription>
                      Add important links related to your event (e.g.,
                      registration page, resources)
                    </FormDescription>
                  </div>

                  <h4 className="text-md font-medium mt-4">
                    Social Media Links
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="social_links.website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-website.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social_links.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://twitter.com/youraccount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social_links.linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://linkedin.com/in/youraccount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social_links.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://instagram.com/youraccount"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="social_links.youtube"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>YouTube</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://youtube.com/@yourchannel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

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
            </Form>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
