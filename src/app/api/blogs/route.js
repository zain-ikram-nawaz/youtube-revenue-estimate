export const dynamic = "force-dynamic";
export const revalidate = 0;

import { connectDB } from "../../lib/db"
import Blog from "../../../models/Blog"
import { NextResponse } from "next/server";

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    const slug = generateSlug(data.title);

    const blog = await Blog.create({
      title: data.title,
      slug,
      content: data.content,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      tags: data.tags,
      author: data.author,
      image: data.image,
    });

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
