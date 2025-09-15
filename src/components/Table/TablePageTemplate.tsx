import { DataTable } from "@/components/Table/data-table";
import { ColumnDef } from "@tanstack/react-table";

interface TablePageTemplateProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  icon?: React.ReactNode;
  title?: string;
}

const TablePageTemplate = async <TData, TValue>({
  columns,
  data,
  icon,
  title,
}: TablePageTemplateProps<TData, TValue>) => {
  return (
    <div className="container mx-auto py-5 flex flex-col gap-5">
      <div className="flex gap-3">
        {icon}
        <h1 className="text-3xl font-black">{title}</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TablePageTemplate;
