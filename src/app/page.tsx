import { Inscription, InscriptionsArraySchema } from "@/types/Inscription";
import TestButtons from "../components/TestButtons";
import { Cours, CoursArraySchema } from "@/types/Cours";
import { Note, NotesArraySchema } from "@/types/Note";

async function fetchAll(): Promise<{
  inscriptions: Inscription[];
  cours: Cours[];
  notes: Note[];
}> {
  "use server";

  console.log("FETCH SUR LE SERVEUR (EN CONCURRENCE)");
  const [inscriptionsRes, coursRes, notesRes] = await Promise.all([
    fetch(
      "https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/inscriptions"
    ),
    fetch("https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/cours"),
    fetch("https://b0s0kwos00g48ow8cg0skg4w.89.116.111.143.sslip.io/notes"),
  ]);
  if (!inscriptionsRes.ok || !coursRes.ok || !notesRes.ok) {
    throw new Error("Failed to fetch data");
  }
  const inscriptionsData = await inscriptionsRes.json();
  const coursData = await coursRes.json();
  const notesData = await notesRes.json();

  //VALIDATIONS ZOD

  const inscriptionsResult =
    InscriptionsArraySchema.safeParse(inscriptionsData);
  const coursResult = CoursArraySchema.safeParse(coursData);
  const notesResult = NotesArraySchema.safeParse(notesData);

  if (!inscriptionsResult.success) {
    console.error(
      "Les données des inscriptions n'ont pas être validés:",
      inscriptionsResult.error
    );
    throw new Error("Les données des inscriptions sont invalides");
  }
  if (!coursResult.success) {
    console.error(
      "Les données de cours n'ont pas pu être validés:",
      coursResult.error
    );
    throw new Error("Les données de cours sont invalides");
  }
  if (!notesResult.success) {
    console.error(
      "Les données de notes n'ont pas pu être validés:",
      notesResult.error
    );
    throw new Error("Les données de notes sont invalides");
  }

  console.log("Les données ont été validées avec succès");

  console.log("DATA:", {
    inscriptions: inscriptionsResult.data,
    cours: coursResult.data,
    notes: notesResult.data,
  });

  return {
    inscriptions: inscriptionsResult.data,
    cours: coursResult.data,
    notes: notesResult.data,
  };
}

export default function Home() {
  return (
    <div className="">
      <TestButtons fetchAll={fetchAll} />
    </div>
  );
}
