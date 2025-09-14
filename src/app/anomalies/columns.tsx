"use client";

import { Anomalie } from "@/types/Anomalie";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Anomalie>[] = [
  { accessorKey: "type", header: "Type" },
  { accessorKey: "matricule", header: "Matricule" },
  { accessorKey: "annee", header: "Année" },
  { accessorKey: "detail", header: "Détail" },
];
