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
} from "lucide-react";
import { mockEvents } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/events">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{event.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.push("/events")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Events
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src={
                event.unsplash_image ||
                `/placeholder.svg?height=400&width=800&text=${encodeURIComponent(event.title)}`
              }
              alt={event.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <Badge className="absolute left-4 top-4 text-sm">
              {event.mode}
            </Badge>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
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
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.approx_audience_count} attending</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 pt-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">About This Event</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {event.description}
                  {/* Adding more detailed description for the event page */}
                  {`\n\nJoin us for an unforgettable experience at ${event.title}! This event brings together professionals, enthusiasts, and curious minds from all over to explore the latest in ${event.category}.\n\nWhat to expect:\n• Engaging presentations from industry experts\n• Networking opportunities with like-minded individuals\n• Interactive workshops and hands-on sessions\n• Refreshments and meals included\n\nDon't miss this opportunity to expand your knowledge and grow your professional network!`}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Organizer</h2>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={"./img.jpg"} />
                    <AvatarFallback>{"AB"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{"Abhinab"}</p>
                    <p className="text-sm text-muted-foreground">
                      Event Organizer
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {event.mode}
                  </Badge>
                  <Badge variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    Conference
                  </Badge>
                  <Badge variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    Networking
                  </Badge>
                  <Badge variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    Professional
                  </Badge>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold mb-2">Event Schedule</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary rounded-md px-3 py-2 font-medium">
                      9:00
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Registration & Welcome Coffee
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Check in at the registration desk and enjoy a welcome
                          coffee while networking with other attendees.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary rounded-md px-3 py-2 font-medium">
                      10:00
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Keynote Presentation
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Opening keynote by industry leaders discussing the
                          latest trends and innovations.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary rounded-md px-3 py-2 font-medium">
                      12:00
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Lunch Break & Networking
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Enjoy a catered lunch while networking with speakers
                          and other attendees.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary rounded-md px-3 py-2 font-medium">
                      13:30
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Breakout Sessions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Choose from multiple specialized tracks focusing on
                          different aspects of {event.mode}.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 text-primary rounded-md px-3 py-2 font-medium">
                      16:00
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">
                          Closing Remarks & Networking Reception
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm text-muted-foreground">
                          Final thoughts and a networking reception with
                          refreshments.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="location" className="space-y-4 pt-4">
              <h2 className="text-xl font-semibold mb-2">Event Location</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-medium">{event.location}</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Conference Way, Floor 3
                    </p>
                    <p className="text-sm text-muted-foreground">
                      San Francisco, CA 94103
                    </p>
                  </div>

                  <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                    <img
                      src="/placeholder.svg?height=300&width=600&text=Map"
                      alt="Event location map"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Getting There</h4>
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p>
                        <strong>By Public Transit:</strong> Take the BART to
                        Powell St. Station, then walk 2 blocks north.
                      </p>
                      <p>
                        <strong>Parking:</strong> Paid parking available at the
                        Convention Center Garage.
                      </p>
                      <p>
                        <strong>Rideshare:</strong> Dedicated drop-off area at
                        the main entrance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration</CardTitle>
              <CardDescription>Secure your spot at this event</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Standard Ticket</span>
                <span className="font-bold">Free</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarCheck className="h-4 w-4" />
                <span>{formatDate(event.date_range.from.toString())}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <Separator />
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>{event.approx_audience_count}</strong> people
                  attending
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="w-full" disabled={isRegistering}>
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
                      {formatDate(event.date_range.from.toString())}. Would you
                      like to proceed?
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
                  className="flex-1"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${isSaved ? "fill-primary" : ""}`}
                  />
                  {isSaved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Organizer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={"./img.jpg"} />
                  <AvatarFallback>{"AB"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{"Abhinab Choudhury"}</p>
                  <p className="text-sm text-muted-foreground">
                    Event Organizer
                  </p>
                </div>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
