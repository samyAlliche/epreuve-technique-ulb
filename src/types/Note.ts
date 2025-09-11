import { z } from "zod";

export const NoteSchema = z.object({
  id: z.number().int(),
  matricule: z.string(),
  mnemonique: z.string(),
  note: z.number().max(20).min(0),
});

export type Note = z.infer<typeof NoteSchema>;
