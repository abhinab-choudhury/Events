"use clinet";

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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function EventDateTime() {
  const { control, watch } = useFormContext();

  return (
    <div className="space-y-6 pt-4 border-t border-border/20">
      <h3 className="text-lg font-semibold">Date, Time & Location</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Range-Date Input */}
        <FormField
          control={control}
          name="date_range"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-medium">Event Dates</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
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
                <PopoverContent className="w-auto p-0" align="start">
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
          control={control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel className="font-medium mb-2">Start Time</FormLabel>
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
        control={control}
        name="mode"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Event Mode</FormLabel>
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
                  <FormLabel className="font-normal">Online</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="offline" />
                  </FormControl>
                  <FormLabel className="font-normal">Offline</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="hybrid" />
                  </FormControl>
                  <FormLabel className="font-normal">Hybrid</FormLabel>
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
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Location</FormLabel>
            <FormControl>
              <Input placeholder="Google Maps Links" {...field} />
            </FormControl>
            <FormDescription>
              Enter the physical address where the event will take place
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Online Join Link */}
      {(watch("mode") === "online" || watch("mode") === "hybrid") && (
        <FormField
          control={control}
          name="online_join_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Online Join Link</FormLabel>
              <FormControl>
                <Input placeholder="https://zoom.us/meeting/..." {...field} />
              </FormControl>
              <FormDescription>
                Provide a link for online participants to join the event
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
