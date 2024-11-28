import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: "Photo URL is required" },
        { status: 400 }
      );
    }

    const photo = await prisma.photo.create({
      data: {
        url,
      },
    });

    return NextResponse.json(photo);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      include: {
        comments: true, // Include related comments
      },
    });

    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Photo ID is required" },
        { status: 400 }
      );
    }

    // Delete the photo and related comments
    await prisma.comment.deleteMany({
      where: {
        photoId: parseInt(id),
      },
    });

    const deletedPhoto = await prisma.photo.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json(deletedPhoto);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
