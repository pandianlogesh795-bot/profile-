import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, this can forward to Formspree, Resend, or Discord/Slack Webhook
    console.log("Transmission received from portfolio:", { name, email, message, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: "Transmission received successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing transmission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
