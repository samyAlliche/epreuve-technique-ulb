export type Anomalie = {
  type:
    | "NOTE_SANS_INSCRIPTION"
    | "COURS_INCONNU"
    | "INSCRIPTION_SANS_COURS"
    | "DUPLICATA_NOTE"
    | "NOTE_SANS_CREDIT";
  matricule: string;
  annee?: number;
  detail: string;
};
