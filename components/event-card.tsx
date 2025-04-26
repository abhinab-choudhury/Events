import React from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Globe,
  ExternalLink,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { EventType } from "@/lib/mockData";

const EventCard = ({ event }: { event: EventType }) => {
  const formatDateRange = (date_range: {
    from: Date;
    to?: Date | undefined;
  }) => {
    const start = format(date_range.from, "MMM dd, yyyy");
    return date_range.to
      ? `${start} - ${format(date_range.to, "MMM dd, yyyy")}`
      : start;
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case "online":
        return <Globe className="h-4 w-4 text-blue-500" />;
      case "offline":
        return <MapPin className="h-4 w-4 text-rose-500" />;
      case "hybrid":
        return (
          <div className="flex space-x-1 mr-5">
            <Globe className="h-4 w-4 text-blue-500" />
            <MapPin className="h-4 w-4 text-rose-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:shadow-lg">
      <div className="relative h-48 w-full flex-shrink-0">
        <img
          src={event.unsplash_image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              event.mode === "online"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : event.mode === "offline"
                  ? "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300"
                  : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            }`}
          >
            {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
          </span>
        </div>
        {event.require_approval && (
          <div className="absolute bottom-0 left-0 m-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
              Approval Required
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
            {event.title}
          </h3>

          <div className="prose prose-sm text-sm h-20 overflow-hidden dark:text-gray-300">
            <ReactMarkdown>
              {event.description.substring(0, 150) +
                (event.description.length > 150 ? "..." : "")}
            </ReactMarkdown>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm">
                {formatDateRange(event.date_range)}
              </span>
            </div>

            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm">{event.time}</span>
            </div>

            <div className="flex items-center text-gray-700 dark:text-gray-400">
              <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-300 flex-shrink-0" />
              <span className="text-sm">
                {event.approx_audience_count} expected attendees
              </span>
            </div>

            <div className="flex flex-row items-center text-gray-700 dark:text-gray-400">
              <div className="w-4 h-4 flex-shrink-0 flex items-center">
                {getModeIcon(event.mode)}
              </div>
              <span className="text-sm mx-6">
                {event.mode === "online"
                  ? "Online Event"
                  : event.mode === "offline"
                    ? "In-person Event"
                    : "Hybrid Event"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-2">
            {event.social_links?.twitter && (
              <a
                href={event.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <TwitterIcon />
              </a>
            )}
            {event.social_links?.linkedin && (
              <a
                href={event.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-500"
              >
                <LinkedinIcon />
              </a>
            )}
            {event.social_links?.instagram && (
              <a
                href={event.social_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400"
              >
                <InstagramIcon />
              </a>
            )}
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-300 flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
