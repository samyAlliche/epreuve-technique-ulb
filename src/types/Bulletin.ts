export type Bulletin = {
  matricule: string;
  nom: string;
  prenom: string;
  annee_etude: number;
  ects_total_inscrits: number;
  ects_obtenus: number;
  moyenne_ponderee: number | null;
  reussite: boolean;
  details: {
    mnemonique: string;
    intitule: string;
    credit: number;
    titulaire: string;
    note: number | null;
  }[];
};
