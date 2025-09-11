import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { mnemonique: string } }
) {
  try {
    const { mnemonique } = await params;
    const cours = await prisma.liste_cours.findFirst({
      where: { mnemonique: String(mnemonique) },
    });
    if (cours === null) {
      return NextResponse.json(
        { error: `Aucun cours trouvée pour le mnemonique ${mnemonique}` },
        { status: 404 }
      );
    } else {
      return NextResponse.json(cours);
    }
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
