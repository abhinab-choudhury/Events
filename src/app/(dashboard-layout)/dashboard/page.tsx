"use client";

import React from "react";
import {
  PlusIcon,
  TrendingUp,
  Calendar,
  Users,
  Eye,
  Search,
} from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export type Event = {
  name: string;
  eventType: "Conference" | "Hackathon" | "Meetup" | "Workshop"; // Restricting to known types
  startDate: string; // ISO Date format (YYYY-MM-DD)
  endDate: string; // ISO Date format (YYYY-MM-DD)
  participants: number;
  views: number;
};

// Analytics Data & Config
const eventAnalyticsData = [
  { category: "Total Interactions", count: 1260, fill: "hsl(var(--chart-1))" },
];

const chartSettings = {
  count: { label: "Interactions" },
  primary: { label: "Event Engagement" },
};

const events: Event[] = [
  {
    name: "Tech Conference 2025",
    eventType: "Conference",
    startDate: "2025-03-15",
    endDate: "2025-03-17",
    participants: 450,
    views: 1240,
  },
  {
    name: "AI Hackathon",
    eventType: "Hackathon",
    startDate: "2025-04-01",
    endDate: "2025-04-03",
    participants: 200,
    views: 890,
  },
  {
    name: "Developer Meetup",
    eventType: "Meetup",
    startDate: "2025-03-28",
    endDate: "2025-03-28",
    participants: 150,
    views: 560,
  },
  {
    name: "Web3 Workshop",
    eventType: "Workshop",
    startDate: "2025-04-15",
    endDate: "2025-04-16",
    participants: 0,
    views: 120,
  },
  {
    name: "Blockchain Hackathon",
    eventType: "Hackathon",
    startDate: "2025-02-20",
    endDate: "2025-02-22",
    participants: 300,
    views: 1500,
  },
  {
    name: "Cybersecurity Summit",
    eventType: "Conference",
    startDate: "2025-05-10",
    endDate: "2025-05-12",
    participants: 350,
    views: 980,
  },
  {
    name: "AI & ML Bootcamp",
    eventType: "Workshop",
    startDate: "2025-06-05",
    endDate: "2025-06-06",
    participants: 120,
    views: 450,
  },
  {
    name: "Cloud Computing Symposium",
    eventType: "Conference",
    startDate: "2025-07-01",
    endDate: "2025-07-02",
    participants: 500,
    views: 2000,
  },
  {
    name: "Game Development Jam",
    eventType: "Hackathon",
    startDate: "2025-08-15",
    endDate: "2025-08-17",
    participants: 180,
    views: 750,
  },
  {
    name: "Data Science Meetup",
    eventType: "Meetup",
    startDate: "2025-09-10",
    endDate: "2025-09-10",
    participants: 100,
    views: 340,
  },
];

const chartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

// Header Component
const DashboardHeader = () => (
  <div className="space-y-2">
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
      Dashboard
    </h1>
    <p className="text-muted-foreground text-lg">
      Track your event performance and engagement metrics
    </p>
  </div>
);

export default function EventsDashboard() {
  const { data: user, status } = useSession();

  if (status === "unauthenticated") {
    redirect("/account");
  }

  return (
    <div className="container w-[100%] mx-auto space-y-6">
      <DashboardHeader />

      <div className="grid lg:grid-cols-3 gap-6 max-h-[80vh]">
        <div className="lg:col-span-2 space-y-6">
          <SearchActions />
          <div className="h-[70vh] w-[85vw] md:w-auto mx-[auto] overflow-scroll rounded-lg">
            <EventsTable events={events} />
          </div>
        </div>
        <AnalyticsCard />
      </div>
    </div>
  );
}

// Search and Actions Component
const SearchActions = () => (
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
    <div className="flex items-center gap-2 flex-1 w-full md:max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 z-20 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search events..."
          className="pl-10 bg-background/50 backdrop-blur-sm"
        />
      </div>
    </div>
    <NewButton />
  </div>
);

// Analytics Chart Component
const AnalyticsCard = () => (
  <Card className="flex flex-col">
    <CardHeader className="items-center pb-0">
      <CardTitle>Radial Chart - Shape</CardTitle>
      <CardDescription>January - June 2024</CardDescription>
    </CardHeader>
    <CardContent className="flex-1 pb-0">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <RadialBarChart
          data={chartData}
          endAngle={100}
          innerRadius={80}
          outerRadius={140}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
            polarRadius={[86, 74]}
          />
          <RadialBar dataKey="visitors" background />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-4xl font-bold"
                      >
                        {chartData[0].visitors.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Visitors
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 font-medium leading-none">
        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      </div>
      <div className="leading-none text-muted-foreground">
        Showing total visitors for the last 6 months
      </div>
    </CardFooter>
  </Card>
);

// Table Row Component
const EventTableRow = ({ event }: { event: Event }) => {
  const statusVariants = {
    Active:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    Upcoming: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    Completed:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  };

  const typeVariants = {
    Hackathon:
      "bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200",
    Conference:
      "bg-orange-50/50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-200",
    Meetup:
      "bg-teal-50/50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border-teal-200",
    Workshop:
      "bg-purple-50/50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200",
  };

  const { name, endDate, eventType, participants, startDate, views } = event;
  const today = new Date();
  const start_data = new Date(startDate);
  const end_data = new Date(endDate);

  const status =
    today > end_data ? "Completed" : today < start_data ? "Upcoming" : "Active";

  return (
    <tr className="border-b border-border/50 hover:bg-muted/50 transition-colors">
      <td className="px-4 py-3">{name}</td>
      <td className="px-4 py-3">
        <Badge variant="outline" className={typeVariants[eventType]}>
          {eventType}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <Badge variant="outline" className={statusVariants[status]}>
          {status}
        </Badge>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {format(new Date(startDate), "dd/mm/yyyy")}
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {format(new Date(endDate), "dd/mm/yyyy")}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          {participants}
        </div>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end text-muted-foreground">
          <Eye className="mr-2 h-4 w-4" />
          {views}
        </div>
      </td>
    </tr>
  );
};

const EventsTable = ({ events }: { events: Event[] }) => (
  <div className="relative rounded-lg backdrop-blur-sm bg-background/10 border-muted">
    <div className="overflow-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/50 bg-muted/50">
            <th className="px-4 py-3 text-left font-medium">Event Name</th>
            <th className="px-4 py-3 text-left font-medium">Type</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Start Date</th>
            <th className="px-4 py-3 text-left font-medium">End Date</th>
            <th className="px-4 py-3 text-right font-medium">Participants</th>
            <th className="px-4 py-3 text-right font-medium">Views</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {events.map((event, idx) => (
            <EventTableRow key={idx} event={event} />
          ))}
        </tbody>
        <tfoot className="bg-muted/50">
          <tr className="border-t border-border/50">
            <td colSpan={5} className="px-4 py-3 font-medium">
              Total
            </td>
            <td className="px-4 py-3 text-right font-medium">
              {events
                .reduce((sum, event) => sum + event.participants, 0)
                .toLocaleString()}
            </td>
            <td className="px-4 py-3 text-right font-medium">
              {events
                .reduce((sum, event) => sum + event.views, 0)
                .toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

// Main Dashboard Component

export function NewButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusIcon className="h-4 w-4 mr-2" />
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={"create/new/conference"}>Conference</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"create/new/hackathon"}>Hackathon</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"create/new/meetup"}>Meetup</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"create/new/workshop"}>workshop</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
