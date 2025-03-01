"use client";

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
import { UploadDropzone } from "@/lib/uploadthing";
import { BookOpenIcon, ImageIcon, PencilIcon } from "lucide-react";
import { useState } from "react";
import { ClientUploadedFileData, UploadedFileData } from "uploadthing/types";
import { twMerge } from "tailwind-merge";

export default function BasicDetails() {
  const { control, setValue } = useFormContext();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  return (
    <div className="space-y-8 rounded-lg bg-slate-50 p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Basic Information
      </h3>

      {/* Event Title */}
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <FormLabel className="text-slate-700 font-medium mb-2 flex items-center">
              <PencilIcon className="h-4 w-4 mr-2 text-slate-500" />
              Event Title
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter event title"
                {...field}
                className="border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 py-3 text-slate-800 font-medium"
              />
            </FormControl>
            <FormDescription className="text-slate-500 text-sm mt-2">
              Give your event a clear and catchy title
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Banner Image */}
      <FormField
        control={control}
        name="banner_image"
        render={({ field }) => (
          <FormItem className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <FormLabel className="text-slate-700 font-medium mb-2 flex items-center">
              <ImageIcon className="h-4 w-4 mr-2 text-slate-500" />
              Banner Image
            </FormLabel>
            <FormControl>
              <div className="space-y-4">
                {uploadComplete && uploadedImageUrl ? (
                  <div className="relative w-full">
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        {...field}
                        src={uploadedImageUrl}
                        alt="Event banner"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadComplete(false);
                        setUploadedImageUrl("");
                        setValue("banner_image", null);
                      }}
                      className="absolute top-2 right-2 bg-white/90 text-slate-700 p-1.5 rounded-full border border-slate-200 shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    className="border-dashed border-2 border-slate-300 rounded-lg ut-label:text-slate-800 ut-allowed-content:text-slate-500 hover:bg-slate-50 transition-colors"
                    appearance={{
                      button:
                        "w-fit p-4 ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                      container:
                        "w-max flex-col w-full rounded-md border-gray-400 bg-inherit",
                      allowedContent:
                        "flex h-8 flex-col items-center justify-center px-2 text-white",
                    }}
                    config={{ cn: twMerge }}
                    onClientUploadComplete={(
                      res: ClientUploadedFileData<{ uploadedBy: string }>[],
                    ) => {
                      setUploadComplete(true);
                      setUploadedImageUrl(res[0].ufsUrl as string);
                      alert("Upload Completed");
                    }}
                    onUploadError={(error: Error) => {
                      setUploadComplete(false);
                      setUploadedImageUrl("");
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
              </div>
            </FormControl>
            <FormDescription className="text-slate-500 text-sm mt-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              Upload an attractive banner image (recommended size: 1200 x 630px)
            </FormDescription>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      {/* Event Description */}
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <FormLabel className="text-slate-700 font-medium mb-2 flex items-center">
              <BookOpenIcon className="h-4 w-4 mr-2 text-slate-500" />
              Event Description
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe your event in detail..."
                className="min-h-40 resize-none border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-700 leading-relaxed"
                {...field}
              />
            </FormControl>
            <FormDescription className="text-slate-500 text-sm mt-2">
              <div className="flex flex-col space-y-2">
                <span>
                  Provide a detailed description to help attendees understand
                  what to expect
                </span>
                <ul className="list-disc list-inside text-xs space-y-1 text-slate-500 pl-1">
                  <li>Include the purpose and goals of the event</li>
                  <li>Mention key highlights or special features</li>
                  <li>Describe who should attend and what they'll gain</li>
                </ul>
              </div>
            </FormDescription>
            <div className="flex justify-between items-center mt-2">
              <FormMessage className="text-red-500" />
              <div className="text-xs text-slate-400">
                {field.value?.length || 0} characters
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
