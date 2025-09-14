import { Inscription } from "@/types/Inscription";
import TestButtons from "../components/TestButtons";
import { Cours } from "@/types/Cours";
import { Note } from "@/types/Note";
import { fetchAll } from "@/lib/fetchAPI";

export default async function Home() {
  const allData: {
    inscriptions: Inscription[];
    cours: Cours[];
    notes: Note[];
  } = await fetchAll();
  return (
    <div className="">
      <TestButtons allData={allData} />
    </div>
  );
}
