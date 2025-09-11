import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const etudiants = await prisma.liste_cours.findMany({
      orderBy: { mnemonique: "asc" },
    });
    return NextResponse.json(etudiants);
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
