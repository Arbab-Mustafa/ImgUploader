import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { content, photoId } = await request.json();

    if (!content || !photoId) {
      return NextResponse.json(
        { error: "Content and Photo ID are required" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        photoId,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
