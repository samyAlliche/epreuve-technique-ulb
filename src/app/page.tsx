import { Inscription } from "@/types/Inscription";
// import TestButtons from "../components/TestButtons";
import { Cours } from "@/types/Cours";
import { Note } from "@/types/Note";
import { fetchAll } from "@/lib/fetchAPI";
import { HomeCard } from "@/components/Card";
import { Book, TriangleAlert, Users } from "lucide-react";
import { detecterAnomalies } from "@/lib/anomalies";

export default async function Home() {
  const allData: {
    inscriptions: Inscription[];
    cours: Cours[];
    notes: Note[];
  } = await fetchAll();
  const anomaliesCount = detecterAnomalies(
    allData.inscriptions,
    allData.cours,
    allData.notes
  ).length;

  return (
    <div className="container mx-auto xl:px-25 py-5 flex flex-col gap-5">
      {/* <TestButtons allData={allData} /> */}
      <div className="flex flex-col rounded-3xl bg-primary text-background p-7 px-10 shadow-md gap-5 justify-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-extrabold">Bienvenue</h1>
          <h1 className="text-xl font-bold">sur votre tableau de bord</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 justify-items-center">
          <HomeCard
            href="/inscriptions"
            label="Inscrits"
            content={allData.inscriptions.length}
            icon={<Users className="w-10 h-10" />}
            className="text-primary bg-light-purple hover:bg-light-purple/90 transition-colors"
          />
          <HomeCard
            href="/cours"
            label="Cours"
            content={allData.cours.length}
            icon={<Book className="w-10 h-10" />}
            className="text-primary bg-light-orange hover:bg-light-orange/90 transition-colors"
          />
          <HomeCard
            href="/anomalies"
            label="Anomalies"
            content={anomaliesCount}
            icon={<TriangleAlert className="w-10 h-10" />}
            className="text-primary bg-light-red hover:bg-light-red/90 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
