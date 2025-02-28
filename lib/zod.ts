import { File } from "buffer";
import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createEventFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  banner_image: z
    .instanceof(File, { message: "Please select an image file" })
    .refine((file) => file.size <= MAX_FILE_SIZE, { message: "Max Size 20M" })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Image form not supported",
    }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  date_range: z.object({
    from: z.date({
      required_error: "Start date is required",
    }),
    to: z
      .date({
        required_error: "End date is required",
      })
      .optional(),
  }),
  time: z.string({
    required_error: "Please enter the ending time of the event",
  }),
  approx_audience_count: z
    .number({
      required_error: "Please enter an approximate audience count",
    })
    .positive({
      message: "Audience count must be a positive number",
    })
    .int({
      message: "Audience count must be a whole number",
    }),
  location: z.string().url({
    message: "Enter a valid Google Maps Link",
  }),
  mode: z.enum(["online", "offline", "hybrid"], {
    errorMap: () => ({ message: "Please select one of the modes" }),
  }),
  agenda: z
    .array(z.string().min(5, { message: "Agends must be at leadt 5" }))
    .optional()
    .optional(),
  external_links: z
    .array(
      z.object({
        title: z
          .string({
            required_error: "Please provide a title for the link",
          })
          .min(1, "Title cannot be empty"),
        link: z
          .string({
            required_error: "Please provide respective link",
          })
          .url("Please enter a valid URL"),
      }),
    )
    .optional(),
  online_join_link: z.string().url("Please enter a valid URL").optional(),
  social_links: z
    .object({
      twitter: z.string().url("Please enter a valid Twitter URL").optional(),
      linkedin: z.string().url("Please enter a valid LinkedIn URL").optional(),
      website: z.string().url("Please enter a valid website URL").optional(),
      youtube: z.string().url("Please enter a valid YouTube URL").optional(),
      instagram: z
        .string()
        .url("Please enter a valid Instagram URL")
        .optional(),
    })
    .optional(),
  require_approval: z.boolean().default(false),
});

export type FormValues = z.infer<typeof createEventFormSchema>;
