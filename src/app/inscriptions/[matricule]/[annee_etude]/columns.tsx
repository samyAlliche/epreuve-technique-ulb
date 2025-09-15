"use client";

import { Badge } from "@/components/shadcn-ui/badge";
import { cn } from "@/lib/utils";
import { BulletinDetail } from "@/types/Bulletin";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<BulletinDetail>[] = [
  {
    accessorKey: "mnemonique",
    header: "Mnemonique",
    cell: ({ row }) => (
      <Badge variant="outline" asChild>
        <Link
          href={`/cours/${row.original.mnemonique}`}
          className="font-medium text-primary hover:underline"
        >
          {row.original.mnemonique}
        </Link>
      </Badge>
    ),
  },
  {
    accessorKey: "intitule",
    header: "Intitulé",
    cell: ({ row }) => (
      <Link
        href={`/cours/${row.original.mnemonique}`}
        className="hover:underline"
      >
        {row.original.intitule}
      </Link>
    ),
  },
  {
    accessorKey: "credit",
    header: "Credit",
  },
  {
    accessorKey: "titulaire",
    header: "Titulaire",
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
