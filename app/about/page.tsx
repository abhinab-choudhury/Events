"use client";

import { Github } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="px-4 pt-8 md:pt-12"
    >
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  sm:py-32">
        <div className="text-center">
          <h1 className="text-5xl p-2 sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Revolutionizing
            <br />
            Event Management
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Events AI is transforming how events are planned, managed, and
            experienced through the power of artificial intelligence.
          </p>
        </div>
        <div className="pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-transparent dark:bg-indigo-950 backdrop-blur-md rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Meet the Developer
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Hi, I'm Abhinab Choudhury, the solo developer behind Events
                    AI. I'm passionate about creating tools that make event
                    planning more accessible and efficient.
                  </p>
                  <a
                    href="https://github.com/abhinab-choudhury"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    View GitHub Profile
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-400 rounded-full blur-lg opacity-20" />
                  <img
                    src="https://avatars.githubusercontent.com/u/132006996?v=4"
                    alt="Abhinab Choudhury"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
