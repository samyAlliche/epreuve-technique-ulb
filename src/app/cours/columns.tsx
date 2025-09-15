"use client";

import { Badge } from "@/components/shadcn-ui/badge";
//import { Button } from "@/components/shadcn-ui/button";
import { Cours } from "@/types/Cours";
import { ColumnDef } from "@tanstack/react-table";
//import { ZoomIn } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Cours>[] = [
  // {
  //   accessorKey: "open",
  //   header: "",
  //   cell: ({ row }) => (
  //     <Link href={`/inscriptions/${row.original.mnemonique}`} passHref>
  //       <Button variant="ghost" className="">
  //         <ZoomIn />
  //       </Button>
  //     </Link>
  //   ),
  // },
  {
    accessorKey: "mnemonique",
    header: "Mnémonique",
    cell: ({ row }) => (
      <Badge variant="outline" asChild>
        <Link
          href={`/cours/${row.original.mnemonique}`}
          className="text-primary hover:underline"
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
        className="font-medium hover:underline"
      >
        {row.original.intitule}
      </Link>
    ),
  },
  { accessorKey: "credit", header: "Crédit" },
  { accessorKey: "titulaire", header: "Titulaire" },
];
