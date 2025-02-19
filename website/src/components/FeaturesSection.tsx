import { cn } from "@/lib/utils";
import { BarChart3, Calendar, GalleryVerticalEnd, MessageSquareText, Shield, Sparkles, Users2, Zap } from "lucide-react";

export function FeaturesSection() {
    const features = [
      {
        title: 'AI Event Chatbots',
        description:
          'Custom AI assistants that answer attendee questions using your event details through RAG and vector DB technology.',
        icon: <MessageSquareText className="size-6" />,
      },
      {
        title: 'Intelligent Dashboard',
        description:
          'Track event metrics, attendee engagement, and conversions with our comprehensive analytics dashboard.',
        icon: <BarChart3 className="size-6" />,
      },
      {
        title: 'Smart Scheduling',
        description:
          'AI-powered scheduling tools that optimize event timing and activities based on attendee preferences.',
        icon: <Calendar className="size-6" />,
      },
      {
        title: 'Attendee Insights',
        description: 'Gain deep understanding of your audience with AI-generated attendance patterns and behavior analysis.',
        icon: <Users2 className="size-6" />,
      },
      {
        title: 'Instant Deployment',
        description: 'Create and deploy event pages with built-in AI chatbots in minutes, not days.',
        icon: <Zap className="size-6" />,
      },
      {
        title: 'Secure Hosting',
        description:
          'Your event data is protected with enterprise-grade security and compliant with privacy regulations.',
        icon: <Shield className="size-6" />,
      },
      {
        title: 'Custom Branding',
        description:
          'Fully customize your event pages and chatbots to match your brand identity and voice.',
        icon: <GalleryVerticalEnd className="size-6" />,
      },
      {
        title: 'Integration Ready',
        description: 'Seamlessly connect with your existing tools through our extensive API ecosystem.',
        icon: <Sparkles className="size-6" />,
      },
    ];
  
    return (
      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              All the tools you need for <span className="text-indigo-600 dark:text-indigo-400">exceptional events</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Our AI-powered platform helps you create, manage, and optimize events with intelligent insights and automated assistance.
            </p>
          </div>
          
          <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Feature key={feature.title} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const Feature = ({
    title,
    description,
    icon,
    index,
  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
  }) => {
    return (
      <div
        className={cn(
          'group/feature relative flex flex-col py-10 dark:border-neutral-800 lg:border-r',
          (index === 0 || index === 4) && 'dark:border-neutral-800 lg:border-l',
          index < 4 && 'dark:border-neutral-800 lg:border-b'
        )}
      >
        {index < 4 && (
          <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
        )}
        {index >= 4 && (
          <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100 dark:from-neutral-800" />
        )}
        <div className="relative z-10 mb-4 px-10 text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
        <div className="relative z-10 mb-2 px-10 text-lg font-bold">
          <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-indigo-500 dark:bg-neutral-700" />
          <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2 dark:text-neutral-100">
            {title}
          </span>
        </div>
        <p className="relative z-10 max-w-xs px-10 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {description}
        </p>
      </div>
    );
  };
  