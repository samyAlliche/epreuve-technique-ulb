import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { matricule: string } }
) {
  try {
    const { matricule } = await params;

    //d'abord on recupere l'étudiant en question
    const inscription = await prisma.liste_inscriptions.findFirst({
      where: { matricule: String(matricule) },
    });
    if (inscription === null) {
      return NextResponse.json(
        { error: `Aucune inscription trouvée pour le matricule ${matricule}` },
        { status: 404 }
      );
    }

    //ensuite on recupere toutes ses notes
    const notes = await prisma.liste_notes.findMany({
      where: { matricule: String(matricule) },
    });

    return NextResponse.json({ inscription, notes });
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
