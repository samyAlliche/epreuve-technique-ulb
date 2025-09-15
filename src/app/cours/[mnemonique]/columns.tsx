"use client";

import { Button } from "@/components/shadcn-ui/button";
import { cn } from "@/lib/utils";
import { InscriptionAvecNoteDuCours } from "@/types/Inscription";
import { ColumnDef } from "@tanstack/react-table";
import { ZoomIn } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<InscriptionAvecNoteDuCours>[] = [
  {
    accessorKey: "open",
    header: "",
    cell: ({ row }) => (
      <Link
        href={`/inscriptions/${row.original.matricule}/${row.original.annee_etude}`}
        passHref
      >
        <Button variant="ghost" className="">
          <ZoomIn />
        </Button>
      </Link>
    ),
  },
  {
    accessorKey: "matricule",
    header: "Matricule",
  },
  {
    accessorKey: "nom",
    header: "Nom",
  },
  {
    accessorKey: "prenom",
    header: "Prénom",
  },
  {
    accessorKey: "annee_etude",
    header: "Année",
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ row }) => {
      if (row.original.note === null) {
        return <span className="text-muted-foreground">N/A</span>;
      }
      return (
        <span
          className={cn(
            row.original.note >= 10
              ? "text-green-700"
              : "text-red-600 font-semibold"
          )}
        >
          {row.original.note}
        </span>
      );
    },
  },
];
