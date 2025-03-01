import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ALLOWED_TYPES = ["conference", "meetup", "workshop", "hackathon"];

export const EVENT_TYPE_DESCRIPTIONS = {
  conference: "A large formal gathering where people meet to exchange ideas",
  meetup: "A casual networking event for like-minded individuals",
  workshop: "A hands-on learning session focused on specific skills",
  hackathon:
    "A collaborative event focused on building projects in a limited time",
};
