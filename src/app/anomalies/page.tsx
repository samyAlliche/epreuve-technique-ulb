import { columns } from "./columns";
import { DataTable } from "@/components/Table/data-table";
import { detecterAnomalies } from "@/lib/anomalies";
import { fetchAll } from "@/lib/fetchAPI";
import { Cours } from "@/types/Cours";
import { Inscription } from "@/types/Inscription";
import { Note } from "@/types/Note";

const AnomaliesPage = async () => {
  const allData: {
    inscriptions: Inscription[];
    cours: Cours[];
    notes: Note[];
  } = await fetchAll();
  const anomalies = detecterAnomalies(
    allData.inscriptions,
    allData.cours,
    allData.notes
  );
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <h1 className="text-xl font-black">Anomalies</h1>
      <DataTable columns={columns} data={anomalies} />
    </div>
  );
};

export default AnomaliesPage;
