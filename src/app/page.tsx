'use client';

import { ThemeModeToggle } from '@/components/ThemeBtn';
import { Calendar, Users, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <main className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent overflow-y-auto">
      <section className="dark:bg-grid-small-white/[0.5] bg-grid-small-black/[0.2] relative min-h-screen w-full bg-white dark:bg-black">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
        
        {/* Theme toggle positioned at top-right */}
        <div className="absolute right-4 top-4 z-50">
          <ThemeModeToggle />
        </div>

        {/* Hero content */}
        <div className="relative z-20 container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-6xl md:text-8xl font-bold text-transparent mb-6">
              Events AI
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light mb-8">
              Transform your event planning with AI-powered organization and scheduling
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 text-lg">
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 mb-4 text-purple-600" />
                <CardTitle>Smart Scheduling</CardTitle>
                <CardDescription>
                  AI-powered scheduling that learns from your preferences and optimizes event timing
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 mb-4 text-blue-600" />
                <CardTitle>Attendee Management</CardTitle>
                <CardDescription>
                  Effortlessly manage guest lists, RSVPs, and communication with attendees
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white dark:bg-gray-800 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 mb-4 text-green-600" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Keep everyone in sync with instant updates and notifications
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Transform Your Events?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Join thousands of event planners who are creating memorable experiences with Events AI
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg">
              Start Planning Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}