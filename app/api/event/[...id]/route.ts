import { NextResponse } from "next/server";

// Mock database (replace with real DB)
let items = [{ id: "1", name: "Item 1" }];

// GET: Fetch a single event by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const item = items.find((item) => item.id === params.id);
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  return NextResponse.json(item);
}

// PUT: Update an event by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name } = await req.json();
  let item = items.find((item) => item.id === params.id);
  if (!item)
    return NextResponse.json({ error: "Item not found" }, { status: 404 });

  item.name = name;
  return NextResponse.json({ message: "Item updated", item });
}

// DELETE: Remove an event by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  items = items.filter((item) => item.id !== params.id);
  return NextResponse.json({ message: "Item deleted" });
}
