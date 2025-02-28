import React from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { EventType } from "@/lib/mock-data";

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
    <div className="flex flex-col h-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Fixed height for image container */}
      <div className="relative h-48 w-full flex-shrink-0">
        <img
          src={event.unsplash_image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 right-0">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              event.mode === "online"
                ? "bg-blue-100 text-blue-800"
                : event.mode === "offline"
                  ? "bg-rose-100 text-rose-800"
                  : "bg-purple-100 text-purple-800"
            }`}
          >
            {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
          </span>
        </div>
        {event.require_approval && (
          <div className="absolute bottom-0 left-0 m-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
              Approval Required
            </span>
          </div>
        )}
      </div>

      {/* Content with flex-grow to take remaining space */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Main content section */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {event.title}
          </h3>

          {/* Fixed height for description */}
          <div className="prose prose-sm mb-4 text-sm h-20 overflow-hidden">
            <ReactMarkdown>
              {event.description.substring(0, 150) +
                (event.description.length > 150 ? "..." : "")}
            </ReactMarkdown>
          </div>

          {/* Event details with consistent spacing */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-sm">
                {formatDateRange(event.date_range)}
              </span>
            </div>

            <div className="flex items-center text-gray-700">
              <Clock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-sm">{event.time}</span>
            </div>

            <div className="flex items-center text-gray-700">
              <Users className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
              <span className="text-sm">
                {event.approx_audience_count} expected attendees
              </span>
            </div>

            <div className="flex flex-row items-center text-gray-700">
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

          {/* Agenda with fixed height */}
          {event.agenda && event.agenda.length > 0 && (
            <div className="mb-4 h-16">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                Agenda Highlights
              </h4>
              <ul className="text-xs text-gray-600 list-disc list-inside">
                {event.agenda.slice(0, 2).map((item, index) => (
                  <li key={index} className="line-clamp-1">
                    {item}
                  </li>
                ))}
                {event.agenda.length > 2 && (
                  <li className="text-blue-600">
                    +{event.agenda.length - 2} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Footer section - always at the bottom */}
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
          <div className="flex space-x-2">
            {event.social_links?.twitter && (
              <a
                href={event.social_links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
            {event.social_links?.linkedin && (
              <a
                href={event.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            {event.social_links?.instagram && (
              <a
                href={event.social_links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
          </div>

          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center">
            <ExternalLink className="h-4 w-4 mr-1" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
