"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  ChevronLeft,
  CalendarCheck,
  Mail,
  ExternalLink,
  Tag,
  Info,
  Sparkles,
} from "lucide-react";
import { mockEvents } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Find the event with the matching ID
  const event = mockEvents.find((e) => e.eventId === eventId);

  // If event not found, show a message
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/events")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRegister = () => {
    setIsRegistering(true);
    // In a real app, this would submit to an API
    setTimeout(() => {
      setIsRegistering(false);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Modern breadcrumb */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-300" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/events"
                  className="text-slate-500 hover:text-primary transition-colors"
                >
                  Events
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-300" />
              <BreadcrumbItem>
                <BreadcrumbLink className="font-medium text-primary">
                  {event.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between">
          <Button
            variant="ghost"
            className="mb-6 hover:bg-slate-100 transition-colors"
            onClick={() => router.push("/events")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>

          <ChatWithAI />
        </div>

        {/* Hero section with image and essential details */}
        <div className="relative rounded-xl overflow-hidden shadow-md mb-8">
          <img
            src={
              event.unsplash_image ||
              `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(event.title)}`
            }
            alt={event.title}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <Badge className="absolute left-6 top-6 text-sm">
              {event.mode}
            </Badge>
            <h1 className="text-3xl font-bold text-white mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(event.date_range.from.toString())}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <a href={event.location}>Location</a>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.approx_audience_count} attending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left column - Event details */}
          <div className="md:col-span-2 space-y-8">
            {/* About section */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle>About This Event</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 whitespace-pre-line">
                  {event.description}
                  {/* Adding more detailed description for the event page */}
                  {`\n\nJoin us for an unforgettable experience at ${event.title}! This event brings together professionals, enthusiasts, and curious minds from all over to explore the latest in ${event?.mode}.\n\nWhat to expect:\n• Engaging presentations from industry experts\n• Networking opportunities with like-minded individuals\n• Interactive workshops and hands-on sessions\n• Refreshments and meals included\n\nDon't miss this opportunity to expand your knowledge and grow your professional network!`}
                </p>
              </CardContent>
            </Card>

            {/* Tags section */}
            <div className="flex flex-col flex-wrap gap-2 mt-6">
              <div>
                <h1 className="text-xl font-bold">Location</h1>
                <h3 className="font-medium">{event.location}</h3>
                <p className="text-sm text-slate-500">
                  123 Conference Way, Floor 3
                </p>
                <p className="text-sm text-slate-500">
                  San Francisco, CA 94103
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {event.mode}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Conference
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Networking
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-primary/5 hover:bg-primary/10"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  Professional
                </Badge>
              </div>
            </div>
          </div>

          {/* Right column - Registration and contact */}
          <div className="space-y-6 sticky top-20">
            {/* Registration card with modern styling */}
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
                <CardTitle>Registration</CardTitle>
                <CardDescription>
                  Secure your spot at this event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Standard Ticket</span>
                  <span className="font-bold text-lg">Free</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarCheck className="h-4 w-4" />
                  <span>{formatDate(event.date_range.from.toString())}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <Separator />
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span>
                    <strong>{event.approx_audience_count}</strong> people
                    attending
                  </span>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full mt-4 rounded-md text-sm py-6"
                      disabled={isRegistering}
                    >
                      {isRegistering ? "Registering..." : "Register Now"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Registration Confirmation
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You're about to register for {event.title} on{" "}
                        {formatDate(event.date_range.from.toString())}. Would
                        you like to proceed?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRegister}>
                        Confirm Registration
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Heart
                      className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary" : ""}`}
                    />
                    {isSaved ? "Saved" : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Organizer information */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={"./img.jpg"} />
                    <AvatarFallback>{"AB"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{"Abhinab Choudhury"}</p>
                    <p className="text-sm text-slate-500">Event Organizer</p>
                  </div>
                </div>
                <Separator />
                <Button
                  variant="outline"
                  className="w-full rounded-md bg-slate-50 hover:bg-slate-100 transition-colors mb-2"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ChatWithAI() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Sparkles className="mr-2 h-4 w-4" /> Chat with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Talk to AI</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
