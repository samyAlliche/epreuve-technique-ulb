"use client";

import { Cours } from "@/types/Cours";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Cours>[] = [
  { accessorKey: "mnemonique", header: "Mnémonique" },
  { accessorKey: "intitule", header: "Intitulé" },
  { accessorKey: "credit", header: "Crédit" },
  { accessorKey: "titulaire", header: "Titulaire" },
];
