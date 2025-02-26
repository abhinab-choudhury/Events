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

export default function EventLinks() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "external_links",
    control,
  });

  return (
    <div className="space-y-6 pt-4 border-t border-border/20">
      <h3 className="text-lg font-semibold">External Links & Social Media</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel className="font-medium">External Links</FormLabel>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ title: "", link: "" })}
            className="flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" /> Add Link
          </Button>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={control}
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
                  control={control}
                  name={`external_links.${index}.link`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
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
            </div>
          </div>
        ))}
        <FormDescription>
          Add important links related to your event (e.g., registration page,
          resources)
        </FormDescription>
      </div>

      <h4 className="text-md font-medium mt-4">Social Media Links</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="social_links.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://your-website.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
  );
}
