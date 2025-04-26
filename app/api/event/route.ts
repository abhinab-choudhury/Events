import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { FormSchema } from "@/lib/zod";

// GET: Fetch all events with optional search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  // this handles searchs
  if (query) {
  }

  // fetches all routes
  return NextResponse.json("");
}

// POST: Create a new event
export async function POST(req: Request) {
  try {
    // Parse the request body properly
    const eventData: FormSchema = await req.json();

    const response = await prisma.event.create({
      data: {
        description: eventData.description,
        approxAudienceCount: eventData.approx_audience_count,
        acceptReviews: false,
        isActive: false,
        mode: "HYBRID",
        type: "CONFERENCE",
        title: eventData.title,
        banner: "",
        agendas: ["Hello"],
        requireApproval: eventData.require_approval,
      },
    });
    console.log(
      "Response Console Log in Server: ",
      JSON.stringify(response, null, 2)
    );

    if (response) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { error: "Failed to parse request body" },
      { status: 400 }
    );
  }
}
