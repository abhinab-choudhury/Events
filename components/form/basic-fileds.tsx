"use client";

import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { BookOpenIcon, Dot, ImageIcon, PencilIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { twMerge } from "tailwind-merge";

export default function BasicDetails() {
  const { control, setValue, watch } = useFormContext();
  const currentImage = watch("banner_image");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  // Initialize state from form value if it exists
  useEffect(() => {
    if (currentImage && typeof currentImage === "string") {
      setUploadedImageUrl(currentImage);
      setUploadComplete(true);
    }
  }, []);

  const handleImageUpload = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[],
  ) => {
    if (res && res.length > 0) {
      const imageUrl = res[0].url || res[0].ufsUrl;
      setUploadedImageUrl(imageUrl);
      setUploadComplete(true);
      setValue("banner_image", imageUrl, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleRemoveImage = () => {
    setUploadComplete(false);
    setUploadedImageUrl("");
    setValue("banner_image", "", { shouldValidate: true, shouldDirty: true });
  };

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
            <div className="text-slate-500 text-sm mt-2">
              Give your event a clear and catchy title
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
      

      {/* Banner Image */}
      {/* <FormField
        control={control}
        name="banner_image"
        render={() => (
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
                        src={uploadedImageUrl}
                        alt="Event banner"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-white/90 text-slate-700 p-1.5 rounded-full border border-slate-200 shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    className="border-dashed border-2 border-slate-300 rounded-lg ut-label:text-slate-800 ut-allowed-content:text-slate-500 hover:bg-slate-50 transition-colors"
                    appearance={{
                      button:
                        "p-4 ut-ready:bg-indigo-500 ut-uploading:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700",
                      container: "w-full rounded-md border-gray-300",
                      allowedContent:
                        "flex h-8 flex-col items-center justify-center px-2 text-slate-500",
                    }}
                    config={{ cn: twMerge }}
                    onClientUploadComplete={handleImageUpload}
                    onUploadError={(error: Error) => {
                      console.error("Upload error:", error);
                      alert(`Upload failed: ${error.message}`);
                    }}
                  />
                )}
              </div>
            </FormControl>
            <div className="text-slate-500 text-sm mt-2 flex items-center">
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
            </div>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      /> */}

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
            <div className="text-slate-500 text-sm mt-2">
              <div>
                Provide a detailed description to help attendees understand what
                to expect
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <Dot size={16} className="text-slate-400" />
                  <span>Include the purpose and goals of the event</span>
                </div>
                <div className="flex items-center">
                  <Dot size={16} className="text-slate-400" />
                  <span>Mention key highlights or special features</span>
                </div>
                <div className="flex items-center">
                  <Dot size={16} className="text-slate-400" />
                  <span>Describe who should attend and what they'll gain</span>
                </div>
              </div>
            </div>
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
