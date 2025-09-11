import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const notes = await prisma.liste_notes.findMany();
    return NextResponse.json(notes);
  } catch (error) {
    console.error("Erreur 500 - GET notes", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
