import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { matricule: string } }
) {
  try {
    const { matricule } = await params;
    const inscription = await prisma.liste_inscriptions.findFirst({
      where: { matricule: String(matricule) },
    });
    if (inscription === null) {
      return NextResponse.json(
        { error: `Aucune inscription trouvée pour le matricule ${matricule}` },
        { status: 404 }
      );
    } else {
      return NextResponse.json(inscription);
    }
  } catch (error) {
    console.error("Erreur 500 - GET inscription avec matricule", error);
    return NextResponse.json(
      {
        error: "Une erreur est survenue lors de la récupération de données",
      },
      { status: 500 }
    );
  }
}
