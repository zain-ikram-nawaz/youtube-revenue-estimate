import { connectDB } from "../../../../lib/db";
import Guide from "../../../../../models/guide";
import { NextResponse } from "next/server";

// ✅ GET Guide by Slug
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = params;

    const guide = await Guide.findOne({ slug });
    if (!guide) {
      return NextResponse.json({ success: false, message: "Guide not found" });
    }

    return NextResponse.json({ success: true, guide });
  } catch (error) {
    console.error("GET by Slug Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
