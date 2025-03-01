"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, MapPinIcon, VideoIcon, UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { usePathname } from "next/navigation";

export default function EventDateTime() {
  const { control, watch, setValue } = useFormContext();
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isHackathon = segments.includes("hackathon");
  const eventMode = watch("mode");

  // Set end time when start time changes to ensure end time is after start time
  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = e.target.value;
    setValue("start_time", startTime);
    
    const currentEndTime = watch("end_time") || "";
    if (!currentEndTime || startTime >= currentEndTime) {
      // If end time is empty or before start time, set it to 1 hour after start time
      const [hours, minutes] = startTime.split(":");
      const endHours = parseInt(hours) + 1 > 23 ? 23 : parseInt(hours) + 1;
      setValue("end_time", `${endHours.toString().padStart(2, "0")}:${minutes}`);
    }
  };

  return (
    <div className="space-y-8 rounded-lg bg-slate-50 p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">Date & Time Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Selection - Different for Hackathon vs Other Events */}
        {isHackathon ? (
          <FormField
            control={control}
            name="date_range.from"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-700 font-medium mb-2">Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-slate-300 hover:bg-slate-100",
                          !field.value && "text-slate-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                        {field.value ? (
                          format(field.value, "MMMM d, yyyy")
                        ) : (
                          <span>Select event date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md border border-slate-200" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-slate-500 text-sm mt-2">
                  The date when your hackathon will take place
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={control}
            name="date_range"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="text-slate-700 font-medium mb-2">Event Duration</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-slate-300 hover:bg-slate-100 h-auto py-3",
                          !field.value && "text-slate-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-5 w-5 text-slate-500" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <span className="flex flex-col items-start">
                              <span className="font-medium">
                                {format(field.value.from, "MMM dd")} - {format(field.value.to, "MMM dd, yyyy")}
                              </span>
                              <span className="text-xs text-slate-500 mt-1">
                                {Math.ceil((field.value.to - field.value.from) / (1000 * 60 * 60 * 24))} days
                              </span>
                            </span>
                          ) : (
                            format(field.value.from, "MMMM d, yyyy")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-md border border-slate-200" align="start">
                    <div className="p-3 border-b border-slate-100">
                      <h4 className="font-medium text-slate-700">Select Date Range</h4>
                    </div>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from || new Date()}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      className="rounded-md"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-slate-500 text-sm mt-2">
                  Select the start and end dates for your event
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}

        {/* Event Time Inputs */}
        <div className="space-y-6">
          <FormLabel className="text-slate-700 font-medium block mb-2">Event Time</FormLabel>
          <div className="flex gap-4">
            <FormField
              control={control}
              name="start_time"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-slate-600 text-sm block mb-1">Start</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      {...field}
                      onChange={handleStartTimeChange}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="end_time"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-slate-600 text-sm block mb-1">End</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs mt-1" />
                </FormItem>
              )}
            />
          </div>
          <FormDescription className="text-slate-500 text-sm">
            All times are in your local timezone
          </FormDescription>
        </div>
      </div>

      {/* Event Mode Input */}
      <div className="pt-2">
        <FormField
          control={control}
          name="mode"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-slate-700 font-medium">Event Format</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                >
                  <FormItem className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="online" className="sr-only" />
                    </FormControl>
                    <VideoIcon className={`h-6 w-6 ${field.value === "online" ? "text-indigo-600" : "text-slate-500"}`} />
                    <FormLabel className={`font-medium cursor-pointer ${field.value === "online" ? "text-indigo-600" : "text-slate-700"}`}>
                      Online
                    </FormLabel>
                    <span className="text-xs text-slate-500 text-center">Virtual attendance only</span>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="offline" className="sr-only" />
                    </FormControl>
                    <MapPinIcon className={`h-6 w-6 ${field.value === "offline" ? "text-indigo-600" : "text-slate-500"}`} />
                    <FormLabel className={`font-medium cursor-pointer ${field.value === "offline" ? "text-indigo-600" : "text-slate-700"}`}>
                      In-Person
                    </FormLabel>
                    <span className="text-xs text-slate-500 text-center">Physical location only</span>
                  </FormItem>
                  <FormItem className="flex flex-col items-center space-y-2 bg-white p-4 rounded-lg border border-slate-200 hover:border-indigo-300 transition-all duration-200 cursor-pointer">
                    <FormControl>
                      <RadioGroupItem value="hybrid" className="sr-only" />
                    </FormControl>
                    <UsersIcon className={`h-6 w-6 ${field.value === "hybrid" ? "text-indigo-600" : "text-slate-500"}`} />
                    <FormLabel className={`font-medium cursor-pointer ${field.value === "hybrid" ? "text-indigo-600" : "text-slate-700"}`}>
                      Hybrid
                    </FormLabel>
                    <span className="text-xs text-slate-500 text-center">Both online and in-person</span>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>

      {/* Conditional Fields based on Event Mode */}
      <div className="space-y-6 pt-2">
        {/* Event Location Input - Show for offline and hybrid */}
        {(eventMode === "offline" || eventMode === "hybrid") && (
          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem className="bg-white p-4 rounded-lg border border-slate-200">
                <FormLabel className="text-slate-700 font-medium mb-2 flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2 text-slate-500" />
                  Venue Location
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="123 Main St, City, Country or Google Maps Link" 
                    className="border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-slate-500 text-sm mt-2">
                  Enter the physical address where the event will take place
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}

        {/* Online Join Link - Show for online and hybrid */}
        {(eventMode === "online" || eventMode === "hybrid") && (
          <FormField
            control={control}
            name="online_join_link"
            render={({ field }) => (
              <FormItem className="bg-white p-4 rounded-lg border border-slate-200">
                <FormLabel className="text-slate-700 font-medium mb-2 flex items-center">
                  <VideoIcon className="h-4 w-4 mr-2 text-slate-500" />
                  Virtual Meeting Link
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://zoom.us/meeting/..." 
                    className="border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    {...field} 
                  />
                </FormControl>
                <FormDescription className="text-slate-500 text-sm mt-2">
                  Provide a link for online participants to join the event (Zoom, Google Meet, Microsoft Teams, etc.)
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}
      </div>
    </div>
  );
}