import { columns } from "./columns";
import { DataTable } from "@/components/Table/data-table";
import { getCours } from "@/lib/fetchAPI";
import { Cours } from "@/types/Cours";

const CoursPage = async () => {
  const cours: Cours[] = await getCours();
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <h1 className="text-xl font-black">Cours</h1>
      <DataTable columns={columns} data={cours} />
    </div>
  );
};

export default CoursPage;
