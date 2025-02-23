'use client';

import { TrendingUp } from 'lucide-react';
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
const chartData = [
  { browser: 'safari', visitors: 1260, fill: 'var(--color-safari)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-screen w-full p-10"
      >
        <ResizablePanel defaultSize={15} className="min-w-[10%] max-w-[15%]">
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={75}
          className="min-h-fit overflow-y-scroll"
        >
          <div className="m-4 flex flex-col justify-center gap-4 md:flex-row">
            <DemoShareDocument className="md:w-[60%]" />
            <RadialChart className="md:w-[40%]" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ProtectedRoute>
  );
}

function RadialChart(props: { className: string }) {
  return (
    <Card className={cn('flex flex-col', props.className)}>
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
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
}

function DemoShareDocument(props: { className?: string }) {
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 5, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 6, name: 'Charlie Brown', email: 'charlie@example.com' },
    { id: 7, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 8, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 9, name: 'Charlie Brown', email: 'charlie@example.com' },
  ];

  return (
    <section className={props.className}>
      <div className="mx-2 my-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The Joke Tax Chronicles
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Once upon a time, in a far-off land, there was a very lazy king who
          spent all day lounging on his throne. One day, his advisors came to
          him with a problem: the kingdom was running out of money.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input value="http://example.com/link/to/document" readOnly />
          <Button variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </div>
        <div className="text-sm font-medium">People with access</div>
        <div className="grid gap-6">
          {users.map((user, _idx) => (
            <div
              key={user.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/avatars/03.png" />
                  <AvatarFallback>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
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
    </section>
  );
}
