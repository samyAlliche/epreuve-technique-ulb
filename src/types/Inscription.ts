import { z } from "zod";

export const InscriptionSchema = z.object({
  matricule: z.string(),
  nom: z.string(),
  prenom: z.string(),
  annee_etude: z.number().int().nonnegative(),
  cours_json: z.string(),
});

export type Inscription = z.infer<typeof InscriptionSchema>;
