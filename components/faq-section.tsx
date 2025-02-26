'use client';

import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Button } from './ui/button';

export function FAQSection() {
  return (
    <section className="bg-slate-50 py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about Events AI
          </p>
        </div>

        <Accordion type="single" collapsible className="mx-auto">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-medium">
              How does the AI chatbot work for my events?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300">
              Our platform uses RAG (Retrieval-Augmented Generation) and vector
              databases to train a custom AI chatbot specifically on your event
              details. When you create an event, you can upload event
              information, schedules, FAQs, and other relevant content. The AI
              uses this data to answer attendee questions accurately and in
              real-time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-medium">
              What analytics does the dashboard provide?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300">
              Our analytics dashboard gives you comprehensive insights including
              visitor counts, engagement metrics, chatbot interaction
              statistics, frequently asked questions, peak usage times, and
              conversion rates. This data helps you understand attendee behavior
              and optimize future events.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-medium">
              Can I customize the appearance of my event page?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300">
              Yes! Events AI offers extensive customization options. You can
              upload your own branding elements, adjust color schemes, customize
              the chatbot's personality and responses, and create a fully
              branded experience that matches your organization's identity.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-medium">
              How long does it take to set up an event?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300">
              With Events AI, you can create and deploy a fully-functional event
              page with an AI chatbot in as little as 15 minutes. Simply upload
              your event details, poster, and any additional information you
              want the AI to use, and our system will automatically generate
              everything you need.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left font-medium">
              Is Events AI suitable for virtual, hybrid, and in-person events?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-300">
              Absolutely. Events AI is designed to enhance all types of events.
              For virtual events, our platform can integrate with video
              conferencing tools. For hybrid and in-person events, attendees can
              access information via mobile devices, and organizers can use our
              tools for registration, check-in, and real-time updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-16 text-center">
          <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
            Ready to transform your events?
          </h3>
          <Link href="/account">
            <Button className="h-12 rounded-lg bg-indigo-600 px-8 text-sm font-medium text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg dark:bg-indigo-600 dark:shadow-indigo-900/20 dark:hover:bg-indigo-500">
              Get started for free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
