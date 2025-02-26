"use clinet";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "../ui/switch";

export default function EventAgenda() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: "agenda", control });

  return (
    <div className="space-y-6 pt-4 border-t border-border/20">
      <h3 className="text-lg font-semibold">Audience & Agenda</h3>

      {/* Audience Count */}
      <FormField
        control={control}
        name="approx_audience_count"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">
              Expected Audience Count
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                onChange={field.onChange}
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
          <FormLabel className="font-medium">Agenda Items</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Item
          </Button>
        </div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
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
              onClick={() => remove(index)}
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
        control={control}
        name="require_approval"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="font-medium">Require Approval</FormLabel>
              <FormDescription>
                Manually approve attendees before they can join your event
              </FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
