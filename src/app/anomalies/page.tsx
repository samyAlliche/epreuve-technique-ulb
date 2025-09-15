import { columns } from "./columns";
import TablePageTemplate from "@/components/Table/TablePageTemplate";
import { detecterAnomalies } from "@/lib/anomalies";
import { fetchAll } from "@/lib/fetchAPI";
import { Cours } from "@/types/Cours";
import { Inscription } from "@/types/Inscription";
import { Note } from "@/types/Note";
import { TriangleAlert } from "lucide-react";

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
    <TablePageTemplate
      columns={columns}
      data={anomalies}
      icon={<TriangleAlert width={32} height={32} />}
      title="Anomalies"
    />
  );
};

export default AnomaliesPage;
