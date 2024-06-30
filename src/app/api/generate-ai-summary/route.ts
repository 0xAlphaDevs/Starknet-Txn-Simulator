import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const { message } = await req.json();
  console.log("Generate AI Summary for Txn. :", message);
  // Call AI agent to generate summary
  try {
    const result = { summary: "This is a summary of the transaction" };
    return NextResponse.json(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
