import { Badge } from "@/components/shadcn-ui/badge";
import { Button } from "@/components/shadcn-ui/button";
import { DataTable } from "@/components/Table/data-table";
import {
  getCoursParMnemonique,
  getInscriptions,
  getNotes,
} from "@/lib/fetchAPI";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { Inscription } from "@/types/Inscription";
import { Card } from "@/components/Card";

const SingleCoursPage = async ({
  params,
}: {
  params: { mnemonique: string };
}) => {
  const { mnemonique } = await params;
  const cours = await getCoursParMnemonique(mnemonique);
  if (!cours) {
    return <div className="container mx-auto py-5">Cours non trouvé</div>;
  }

  const inscriptions = await getInscriptions();
  const inscriptionsDuCours: Inscription[] = inscriptions.filter((insc) =>
    insc.cours_json.includes(mnemonique)
  );
  const notes = await getNotes();
  const inscriptionsAvecNoteDuCours = inscriptionsDuCours.map((insc) => {
    const noteDuCours = notes.find(
      (note) =>
        note.matricule === insc.matricule && note.mnemonique === mnemonique
    );
    return {
      ...insc,
      note: noteDuCours ? noteDuCours.note : null,
    };
  });

  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <Button variant="ghost" className="w-fit" asChild>
        <Link href="/cours">
          <ChevronLeft />
          Cours
        </Link>
      </Button>
      <div className="flex flex-col gap-5 px-5">
        <div className="flex flex-col gap-3">
          <Badge variant={"outline"}>{cours.mnemonique}</Badge>
          <h1 className="text-3xl font-black">{cours.intitule}</h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <Card label="Crédit" content={cours.credit} />
          <Card label="Titulaire" content={cours.titulaire} />
        </div>
        <h2 className="text-xl font-bold">Inscrits à ce cours</h2>
        <DataTable columns={columns} data={inscriptionsAvecNoteDuCours} />
      </div>
    </div>
  );
};
export default SingleCoursPage;
