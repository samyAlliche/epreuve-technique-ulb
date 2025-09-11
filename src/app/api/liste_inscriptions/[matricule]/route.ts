import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { matricule: string } }
) {
  try {
    const { matricule } = await params;
    const inscriptions = await prisma.liste_inscriptions.findMany({
      where: { matricule: String(matricule) },
      orderBy: { annee_etude: "asc" },
    });
    if (inscriptions.length === 0) {
      return NextResponse.json(
        { error: `Aucune inscription trouvée pour le matricule ${matricule}` },
        { status: 404 }
      );
    } else {
      return NextResponse.json(inscriptions);
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
