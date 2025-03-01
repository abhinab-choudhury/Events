"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Calendar, Users, List } from "lucide-react";
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
    <div className="space-y-8 pt-6 border-t border-border/30 rounded-lg">
      {/* Audience Count */}
      <FormField
        control={control}
        name="approx_audience_count"
        render={({ field }) => (
          <FormItem className="p-4 bg-card border rounded-lg shadow-sm">
            <FormLabel className="font-semibold flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              Expected Audience Count
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="number"
                onChange={field.onChange}
                className="focus:ring-2 focus:ring-primary/20"
              />
            </FormControl>
            <FormDescription className="mt-2 text-sm text-muted-foreground italic">
              Estimate how many people you expect to attend
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Agenda Input */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <FormLabel className="text-lg font-semibold">
              Agenda Items
            </FormLabel>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            className="flex items-center hover:bg-primary/10 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Add Item
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className="text-center py-4 bg-muted/30 rounded-lg border border-dashed border-muted">
            <p className="text-muted-foreground text-sm">
              No agenda items added yet
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex items-center gap-2 bg-card p-3 border rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center bg-primary/10 text-primary font-medium rounded-full w-6 h-6 text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <FormField
                  control={control}
                  name={`agenda.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder={`Agenda item ${index + 1}`}
                          {...field}
                          className="focus:ring-2 focus:ring-primary/20"
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
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <FormDescription className="text-sm text-muted-foreground italic">
          List the main activities or topics for your event
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="require_approval"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm bg-card">
            <div className="space-y-1">
              <FormLabel className="font-semibold flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                Require Approval
              </FormLabel>
              <FormDescription className="text-sm text-muted-foreground">
                Manually approve attendees before they can join your event
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[state=checked]:bg-primary"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
