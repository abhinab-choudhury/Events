import { z } from "zod";
import { ALLOWED_TYPES } from "./utils";

const modeSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("online"),
    online_join_link: z.string().url("Please enter a valid URL"),
  }),
  z.object({
    mode: z.literal("offline"),
    location: z.string().url("Enter a valid Google Maps Link"),
  }),
  z.object({
    mode: z.literal("hybrid"),
    online_join_link: z.string().url("Please enter a valid URL"),
    location: z.string().url("Enter a valid Google Maps Link"),
  }),
]);

const hasExternalLinksSchema = z.discriminatedUnion("has_external_links", [
  z.object({
    has_external_links: z.literal(true),
    external_links: z.array(
      z.object({
        title: z
          .string({
            required_error: "Please provide a title for the link",
          })
          .min(1, "Title cannot be empty"),
        url: z
          .string({
            required_error: "Please provide respective link",
          })
          .url("Please enter a valid URL"),
      })
    ),
  }),
  z.object({
    has_external_links: z.literal(false),
  }),
]);

const hasAgendaSchema = z.discriminatedUnion("has_agenda", [
  z.object({
    has_agenda: z.literal(true),
    agenda: z
      .array(
        z.object({
          agenda_item: z.string().min(1, "Empty field is not allowed"),
        })
      )
      .min(1, "Agenda field is required"),
  }),
  z.object({
    has_agenda: z.literal(false),
  }),
]);
export const createEventFormSchema = z
  .object({
    type: z.string(),
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
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
    start_time: z
      .string({
        required_error: "Please enter the starting time of the event",
      })
      .optional(),
    end_time: z
      .string({
        required_error: "Please enter the ending time of the event",
      })
      .optional(),
    approx_audience_count: z.preprocess(
      (val) => Number(val),
      z.number().positive().int()
    ),
    require_approval: z.boolean().default(false),
    social_links: z
      .object({
        twitter: z.string().url("Please enter a valid Twitter URL").optional(),
        linkedin: z
          .string()
          .url("Please enter a valid LinkedIn URL")
          .optional(),
        website: z.string().url("Please enter a valid website URL").optional(),
        youtube: z.string().url("Please enter a valid YouTube URL").optional(),
        instagram: z
          .string()
          .url("Please enter a valid Instagram URL")
          .optional(),
      })
      .optional(),
  })
  .and(modeSchema)
  .and(hasExternalLinksSchema)
  .and(hasAgendaSchema);

export type FormSchema = z.infer<typeof createEventFormSchema>;
