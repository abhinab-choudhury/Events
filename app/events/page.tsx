"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  Filter,
  MapPin,
  AlignJustify,
  Grid3x3,
} from "lucide-react";
import EventCard from "@/components/event-card";
import { mockEvents } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Fixed Navbar */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "shadow-md py-2" : "py-4"
        )}
      >
        <div className="container mx-auto px-4">
          <Navbar />
        </div>
      </div>

      {/* Main content with padding for navbar */}
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="space-y-8">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4"
          >
            <div className="flex flex-col md:flex-row gap-4 h-full">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 h-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-full"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-full"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 h-full"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Date
                </Button>

                <Tabs
                  defaultValue="grid"
                  value={view}
                  onValueChange={setView}
                  className="hidden md:block"
                >
                  <TabsList className="bg-slate-100 dark:bg-slate-800 p-1">
                    <TabsTrigger value="grid" className="p-1">
                      <Grid3x3 className="h-4 w-4" />
                    </TabsTrigger>
                    <TabsTrigger value="list" className="p-1">
                      <AlignJustify className="h-4 w-4" />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </motion.div>

          {/* Events Display */}
          <AnimatePresence mode="wait">
            {filteredEvents.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
              >
                <div className="text-center p-6">
                  <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    No events found
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                    Try adjusting your search or filter to find what you're
                    looking for.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear filters
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "gap-6",
                  view === "grid"
                    ? "grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col space-y-6"
                )}
              >
                {filteredEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-16"
      >
        <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Contact
            </a>
          </div>
          <span>
            © {new Date().getFullYear()} Events AI. All rights reserved.
          </span>
        </div>
      </motion.footer>
    </div>
  );
}
