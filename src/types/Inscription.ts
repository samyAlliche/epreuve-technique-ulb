import { z } from "zod";

export const InscriptionSchema = z.object({
  matricule: z.string(),
  nom: z.string(),
  prenom: z.string(),
  annee_etude: z.number().int().nonnegative(),
  cours_json: z.string(),
});

export const InscriptionsArraySchema = z.array(InscriptionSchema);

export type Inscription = z.infer<typeof InscriptionSchema>;

export type InscriptionAvecNoteDuCours = {
  matricule: string;
  nom: string;
  prenom: string;
  annee_etude: number;
  note: number | null;
};
