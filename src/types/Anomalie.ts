export enum AnomalieType {
  NoteSansInscription = "NOTE_SANS_INSCRIPTION",
  CoursInconnu = "COURS_INCONNU",
  InscriptionSansCours = "INSCRIPTION_SANS_COURS",
  DuplicataNote = "DUPLICATA_NOTE",
  NoteSansCredit = "NOTE_SANS_CREDIT",
}

export type Anomalie = {
  type: AnomalieType;
  matricule: string;
  annee?: number;
  detail: string;
};
