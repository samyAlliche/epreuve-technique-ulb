import { Bulletin } from "@/types/Bulletin";
import { Cours } from "@/types/Cours";
import { Inscription } from "@/types/Inscription";
import { Note } from "@/types/Note";

/*
Pour chaque étudiant et année, produit :
- matricule, nom, prenom, annee
- ects_total_inscrits = somme des crédits des cours inscrits
- ects_obtenus = somme des crédits des cours validés (note ≥ 10)
- moyenne_ponderee = ∑(note × crédit) / ∑(crédit des cours notés)
- reussite = true si ects_obtenus ≥ 60 ou si tous les cours ont une note et moyenne_ponderee ≥ 10
- details = liste des cours {mnemonique, intitule, credit, titulaire, note|null}, triés par mnémonique
*/
export const genererBulletin = (
  inscriptions: Inscription[],
  cours: Cours[],
  notes: Note[]
): Bulletin[] => {
  const bulletins: Bulletin[] = inscriptions.map((inscription) => {
    const coursInscrits: string[] = JSON.parse(inscription.cours_json);

    let ects_total_inscrits = 0;
    let ects_obtenus = 0;
    let totalPondere = 0;
    let totalCreditsNotes = 0;

    const details = coursInscrits.map((mnemonique) => {
      const detail = cours.find((c) => c.mnemonique === mnemonique);
      const note =
        notes.find(
          (n) =>
            n.matricule === inscription.matricule && n.mnemonique === mnemonique
        )?.note || null;

      if (detail) {
        ects_total_inscrits += detail.credit;
        if (note) {
          totalPondere += note * detail.credit;
          if (note >= 10) {
            ects_obtenus += detail.credit;
          }
          totalCreditsNotes += detail.credit;
        }
      }
      return {
        mnemonique,
        intitule: detail?.intitule ?? "Cours Inconnu",
        credit: detail?.credit ?? 0,
        titulaire: detail?.titulaire ?? "N/A",
        note,
      };
    });

    const moyenne_ponderee =
      totalCreditsNotes > 0
        ? parseFloat((totalPondere / totalCreditsNotes).toFixed(2))
        : null;
    const reussite =
      ects_obtenus >= 60 ||
      (moyenne_ponderee !== null &&
        moyenne_ponderee >= 10 &&
        details.every((d) => d.note !== null));

    return {
      matricule: inscription.matricule,
      nom: inscription.nom,
      prenom: inscription.prenom,
      annee_etude: inscription.annee_etude,
      ects_total_inscrits,
      ects_obtenus,
      moyenne_ponderee,
      reussite,
      details,
    };
  });
  return bulletins;
};
