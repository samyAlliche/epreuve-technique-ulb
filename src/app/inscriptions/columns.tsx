"use client";

import { Button } from "@/components/shadcn-ui/button";
import { Inscription } from "@/types/Inscription";
import { ColumnDef } from "@tanstack/react-table";
import { ZoomIn } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Inscription>[] = [
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
  { accessorKey: "matricule", header: "Matricule" },
  { accessorKey: "nom", header: "Nom" },
  { accessorKey: "prenom", header: "Prénom" },
  { accessorKey: "annee_etude", header: "Année" },
  {
    accessorKey: "cours_json",
    header: "Cours",
    cell: ({ row }) => {
      try {
        const coursMnemoniques = JSON.parse(
          row.original.cours_json
        ) as string[];
        if (!coursMnemoniques || coursMnemoniques.length === 0) {
          return <span className="text-muted-foreground">Aucun cours</span>;
        }
        return (
          <div className="flex sm:flex-wrap gap-2">
            {coursMnemoniques.map((mnemonique) => (
              <Link href={`/cours/${mnemonique}`} key={mnemonique} passHref>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer transition-colors hover:bg-secondary/60"
                >
                  {mnemonique}
                </Button>
              </Link>
            ))}
          </div>
        );
      } catch (e) {
        console.error("Erreur de parsing du JSON pour cours_json:", e);
        return (
          <Button disabled variant="destructive">
            Données invalides
          </Button>
        );
      }
    },
  },
];
