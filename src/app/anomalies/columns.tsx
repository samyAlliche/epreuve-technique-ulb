"use client";

import { Badge } from "@/components/shadcn-ui/badge";
import { Anomalie, AnomalieTypes } from "@/types/Anomalie";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Anomalie>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      //const color = AnomalieTypes.find((t) => t.slug === type)?.color || "grey";
      const intitule =
        AnomalieTypes.find((t) => t.slug === type)?.intitule || type;
      return <Badge variant="outline">{intitule}</Badge>;
    },
  },
  { accessorKey: "matricule", header: "Matricule" },
  { accessorKey: "annee", header: "Année" },
  { accessorKey: "detail", header: "Détail" },
];
