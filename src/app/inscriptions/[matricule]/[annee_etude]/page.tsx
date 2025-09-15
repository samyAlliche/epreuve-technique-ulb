import { Button } from "@/components/shadcn-ui/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/shadcn-ui/toggle-group";
import { genererBulletinParInscription } from "@/lib/bulletins";
import {
  getCours,
  getInscriptionsParMatricule,
  getNotesParMatricule,
} from "@/lib/fetchAPI";
import { ChevronLeft, User } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "@/components/Table/data-table";

const InscriptionPage = async ({
  params,
}: {
  params: { matricule: string; annee_etude: string };
}) => {
  //fetch inscription
  const matricule = await params.matricule;
  const annee_etude = parseInt(await params.annee_etude);
  const inscriptionsDuMatricule = await getInscriptionsParMatricule(matricule);
  const inscription = inscriptionsDuMatricule.find(
    (insc) => insc.annee_etude === annee_etude
  );

  if (!inscription) {
    return (
      <div className="container mx-auto py-5">Inscription non trouvée</div>
    );
  }
  const cours = await getCours();
  const notes = await getNotesParMatricule(matricule);
  const bulletin = genererBulletinParInscription(inscription, cours, notes);
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <Button variant="ghost" className="w-fit" asChild>
        <Link href="/inscriptions">
          <ChevronLeft />
          Inscriptions
        </Link>
      </Button>
      <div className="flex gap-5">
        <div className="h-48 w-36 rounded-md bg-secondary flex items-center justify-center shrink-0">
          <User className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="text-muted-foreground">
              {inscription.matricule}
            </span>
            <h1 className="text-3xl font-black">
              {inscription.nom} {inscription.prenom}
            </h1>
            <div className="text-muted-foreground flex items-center gap-3 mt-2">
              <span>Année d&apos;étude:</span>{" "}
              <ToggleGroup
                type="single"
                variant={"outline"}
                size={"sm"}
                value={inscription.annee_etude.toString()}
              >
                {inscriptionsDuMatricule.map((insc) => (
                  <ToggleGroupItem
                    key={insc.annee_etude}
                    value={insc.annee_etude.toString()}
                    className="px-2"
                    aria-label={"Toggle Année d'étude " + insc.annee_etude}
                    asChild
                  >
                    <Link
                      href={`/inscriptions/${matricule}/${insc.annee_etude}`}
                    >
                      {insc.annee_etude}
                    </Link>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-black">Bulletin</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="flex flex-col">
            <span className="text-muted-foreground">ECTS inscrits</span>
            <span className="text-3xl font-black">
              {bulletin.ects_total_inscrits}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">ECTS obtenus</span>
            <span className="text-3xl font-black">{bulletin.ects_obtenus}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Moyenne pondérée</span>
            <span className="text-3xl font-black">
              {bulletin.moyenne_ponderee ?? "N/A"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Réussite</span>
            <span
              className={`text-3xl font-black ${
                bulletin.reussite ? "text-green-700" : "text-red-700"
              }`}
            >
              {bulletin.reussite ? "Oui" : "Non"}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-black pt-5">Détails des cours</h3>
        <DataTable columns={columns} data={bulletin.details} />
      </div>
    </div>
  );
};

export default InscriptionPage;
