import TablePageTemplate from "@/components/Table/TablePageTemplate";
import { columns } from "./columns";
import { getCours } from "@/lib/fetchAPI";
import { Cours } from "@/types/Cours";
import { Book } from "lucide-react";

const CoursPage = async () => {
  const cours: Cours[] = await getCours();
  return (
    <TablePageTemplate
      columns={columns}
      data={cours}
      icon={<Book width={32} height={32} />}
      title="Cours"
    />
  );
};

export default CoursPage;
