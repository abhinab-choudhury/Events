"use clinet";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { UploadDropzone } from "@/lib/uploadthing";

export default function BasicDetails() {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Event Title  */}
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Event Title</FormLabel>
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
        control={control}
        name="banner_image"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Banner Image</FormLabel>
            <FormControl>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </FormControl>
            <FormDescription>
              Upload an attractive banner image (recommended size: 1200 x 630px)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Event Details/Descriptions */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-medium">Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your event in detail..."
                className="min-h-32 resize-none focus-visible:ring-primary"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a detailed description to help attendees understand what
              to expect
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
