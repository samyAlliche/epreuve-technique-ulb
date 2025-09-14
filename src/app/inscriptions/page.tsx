import { Inscription } from "@/types/Inscription";
import { columns } from "./columns";
import { DataTable } from "@/components/Table/data-table";

async function getInscription(): Promise<Inscription[]> {
  const res = await fetch(
    "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/inscriptions"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch inscriptions");
  }
  return res.json();
}

const InscriptionsPage = async () => {
  const inscriptions = await getInscription(); // Récupérer les données des inscriptions
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <h1 className="text-xl font-black">Inscriptions</h1>
      <DataTable columns={columns} data={inscriptions} />
    </div>
  );
};

export default InscriptionsPage;
