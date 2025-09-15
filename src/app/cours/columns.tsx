"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Cours } from "@/types/Cours";
import { ColumnDef } from "@tanstack/react-table";
import { ZoomIn } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Cours>[] = [
  {
    accessorKey: "open",
    header: "",
    cell: ({ row }) => (
      <Link href={`/inscriptions/${row.original.mnemonique}`} passHref>
        <Button variant="ghost" className="">
          <ZoomIn />
        </Button>
      </Link>
    ),
  },
  { accessorKey: "mnemonique", header: "Mnémonique" },
  { accessorKey: "intitule", header: "Intitulé" },
  { accessorKey: "credit", header: "Crédit" },
  { accessorKey: "titulaire", header: "Titulaire" },
];
