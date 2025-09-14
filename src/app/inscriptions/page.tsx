import { columns } from "./columns";
import { DataTable } from "@/components/Table/data-table";
import { getInscription } from "@/lib/fetchAPI";
import { Inscription } from "@/types/Inscription";

const InscriptionsPage = async () => {
  const inscriptions: Inscription[] = await getInscription();
  return (
    <div className="container mx-auto py- flex flex-col gap-5">
      <h1 className="text-xl font-black">Inscriptions</h1>
      <DataTable columns={columns} data={inscriptions} />
    </div>
  );
};

export default InscriptionsPage;
