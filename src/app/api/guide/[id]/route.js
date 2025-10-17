import { connectDB } from "../../../lib/db";
import Guide from "../../../../models/guide";
import { NextResponse } from "next/server";

// ✅ UPDATE Guide (PUT)
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const data = await req.json();

    const updatedGuide = await Guide.findByIdAndUpdate(id, data, { new: true });
    if (!updatedGuide)
      return NextResponse.json({ success: false, message: "Guide not found" });

    return NextResponse.json({ success: true, guide: updatedGuide });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

// ✅ DELETE Guide (DELETE)
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const deleted = await Guide.findByIdAndDelete(id);
    if (!deleted)
      return NextResponse.json({ success: false, message: "Guide not found" });

    return NextResponse.json({ success: true, message: "Guide deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
