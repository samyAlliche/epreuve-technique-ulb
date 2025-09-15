import TablePageTemplate from "@/components/Table/TablePageTemplate";
import { columns } from "./columns";
import { getInscription } from "@/lib/fetchAPI";
import { Inscription } from "@/types/Inscription";
import { Users } from "lucide-react";

const InscriptionsPage = async () => {
  const inscriptions: Inscription[] = await getInscription();
  return (
    <TablePageTemplate
      columns={columns}
      data={inscriptions}
      icon={<Users width={32} height={32} />}
      title="Inscriptions"
    />
  );
};

export default InscriptionsPage;
