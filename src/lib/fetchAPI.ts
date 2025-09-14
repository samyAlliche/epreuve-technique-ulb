import { Cours, CoursArraySchema } from "@/types/Cours";
import { Inscription, InscriptionsArraySchema } from "@/types/Inscription";
import { Note, NotesArraySchema } from "@/types/Note";

export async function getInscription(): Promise<Inscription[]> {
  const res = await fetch(
    "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/inscriptions"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch inscriptions");
  }
  const resValide = InscriptionsArraySchema.safeParse(await res.json());
  if (!resValide.success) {
    console.error(
      "Les données des inscriptions n'ont pas être validés:",
      resValide.error
    );
    throw new Error("Les données des inscriptions sont invalides");
  }
  return resValide.data;
}

export async function getCours(): Promise<Cours[]> {
  const res = await fetch(
    "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/cours"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch cours");
  }
  const resValide = CoursArraySchema.safeParse(await res.json());
  if (!resValide.success) {
    console.error(
      "Les données des cours n'ont pas être validés:",
      resValide.error
    );
    throw new Error("Les données des cours sont invalides");
  }
  return resValide.data;
}

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(
    "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/notes"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }
  const resValide = NotesArraySchema.safeParse(await res.json());
  if (!resValide.success) {
    console.error(
      "Les données des notes n'ont pas être validés:",
      resValide.error
    );
    throw new Error("Les données des notes sont invalides");
  }
  return resValide.data;
}

export async function fetchAll(): Promise<{
  inscriptions: Inscription[];
  cours: Cours[];
  notes: Note[];
}> {
  console.log("FETCH SUR LE SERVEUR (EN CONCURRENCE)");
  const [inscriptionsData, coursData, notesData] = await Promise.all([
    getInscription(),
    getCours(),
    getNotes(),
  ]);
  console.log("DATA:", {
    inscriptions: inscriptionsData,
    cours: coursData,
    notes: notesData,
  });

  return {
    inscriptions: inscriptionsData,
    cours: coursData,
    notes: notesData,
  };
}
