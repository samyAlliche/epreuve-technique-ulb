export type Anomalie = {
  type: AnomalieTypeEnum;
  matricule: string;
  annee?: number;
  detail: string;
};

export type AnomalieType = {
  slug: string;
  intitule: string;
  color: string;
};

export enum AnomalieTypeEnum {
  NoteSansInscription = "NOTE_SANS_INSCRIPTION",
  CoursInconnu = "COURS_INCONNU",
  InscriptionSansCours = "INSCRIPTION_SANS_COURS",
  DuplicataNote = "DUPLICATA_NOTE",
  NoteSansCredit = "NOTE_SANS_CREDIT",
}

export const AnomalieTypes: AnomalieType[] = [
  {
    slug: AnomalieTypeEnum.NoteSansInscription,
    intitule: "Note sans inscription",
    color: "red",
  },
  {
    slug: AnomalieTypeEnum.CoursInconnu,
    intitule: "Cours inconnu",
    color: "orange",
  },
  {
    slug: AnomalieTypeEnum.InscriptionSansCours,
    intitule: "Inscription sans cours",
    color: "yellow",
  },
  {
    slug: AnomalieTypeEnum.DuplicataNote,
    intitule: "Duplicata de note",
    color: "green",
  },
  {
    slug: AnomalieTypeEnum.NoteSansCredit,
    intitule: "Note sans crédit",
    color: "blue",
  },
];
