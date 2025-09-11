import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { mnemonique: string } }
) {
  try {
    const { mnemonique } = await params;

    //d'abord on recupere le cours en question
    const cours = await prisma.liste_cours.findFirst({
      where: { mnemonique: String(mnemonique) },
    });
    if (cours === null) {
      console.error("Erreur 404 - GET cours avec mnemonique", mnemonique);
      return NextResponse.json(
        { error: `Aucun cours trouvé pour le mnemonique ${mnemonique}` },
        { status: 404 }
      );
    }

    //ensuite on recupere toutes ses notes
    const notes = await prisma.liste_notes.findMany({
      where: { mnemonique: String(mnemonique) },
    });

    return NextResponse.json({ cours, notes });
  } catch (error) {
    console.error("Erreur 500 - GET notes avec mnemonique", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
