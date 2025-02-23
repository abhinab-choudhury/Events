"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const eventAnalyticsData = [
  { category: "Total Interactions", count: 1260, fill: "var(--color-primary)" },
];

const chartSettings = {
  count: {
    label: "Interactions",
  },
  primary: {
    label: "Event Engagement",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function EventsDashboard() {
  const { data: user, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/account");
  }

  return (
    <section className="flex flex-col-reverse md:flex-row w-full overflow-y-scroll">
      <div className="m-8 w-[60%]">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <p className="leading-7 mt-6 text-sm md:font-normal">
          Manage event analytics, track participant engagement, and collect
          anonymous feedback to improve event experiences.
        </p>
        <EventOverview className="md:w-auto m-8 flex flex-col" />
      </div>
      <EventAnalyticsChart className="md:w-[40%]" />
    </section>
  );
}

function EventAnalyticsChart(props: { className: string }) {
  return (
    <Card className={cn("flex flex-col", props.className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Event Analytics</CardTitle>
        <CardDescription>Last 6 Months Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartSettings}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={eventAnalyticsData}
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
            <RadialBar dataKey="count" background />
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
                          {eventAnalyticsData[0].count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Interactions
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
          Engagement up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total engagement trend for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

function EventOverview(props: { className?: string }) {
  const participants = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  ];

  return (
    <div className={props.className}>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input value="http://example.com/link/to/event" readOnly />
          <Button variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </div>
        <div className="text-sm font-medium">Participants</div>
        <div className="grid gap-6">
          {participants.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Select defaultValue="edit">
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="edit">Can edit</SelectItem>
                  <SelectItem value="view">Can view</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
