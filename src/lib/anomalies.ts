import { Anomalie, AnomalieTypeEnum } from "@/types/Anomalie";
import { Cours } from "@/types/Cours";
import { Inscription } from "@/types/Inscription";
import { Note } from "@/types/Note";

/*
Liste d’objets {type, matricule, annee, detail}, incluant au minimum :
- NOTE_SANS_INSCRIPTION : note existante pour un cours non présent dans cours_json.
- COURS_INCONNU : mnémonique inscrit mais absent de liste_cours.
- INSCRIPTION_SANS_COURS : cours_json vide.
- DUPLICATA_NOTE : plusieurs notes trouvées pour le même (matricule, mnemonique).
- NOTE_SANS_CREDIT : cours noté mais crédit manquant ou ≤ 0.
*/
export const detecterAnomalies = (
  inscriptions: Inscription[],
  cours: Cours[],
  notes: Note[]
): Anomalie[] => {
  const anomalies: Anomalie[] = [];

  //set pour savoir si un cours existe
  const coursExistants = new Set(cours.map((c) => c.mnemonique));

  //map pour trouver rapidement les détails d'un cours à partir de son mnémonique
  const coursDetailsMap = new Map(cours.map((c) => [c.mnemonique, c]));

  //set pour savoir si un étudiant est bien inscrit à un cours.
  const inscriptionsMap = new Map<string, Set<string>>();
  inscriptions.forEach((inscription) => {
    if (!inscriptionsMap.has(inscription.matricule)) {
      inscriptionsMap.set(inscription.matricule, new Set());
    }
    const coursInscrits = JSON.parse(inscription.cours_json) as string[];
    coursInscrits.forEach((mnemonique) => {
      inscriptionsMap.get(inscription.matricule)!.add(mnemonique);
    });
  });

  // -- ANOMALIES D'INSCRIPTION --
  inscriptions.forEach((inscription) => {
    const coursInscrits = JSON.parse(inscription.cours_json) as string[];

    // INSCRIPTION_SANS_COURS : cours_json vide.
    if (coursInscrits.length === 0) {
      anomalies.push({
        type: AnomalieTypeEnum.InscriptionSansCours,
        matricule: inscription.matricule,
        annee: inscription.annee_etude,
        detail: `L'étudiant n'a aucun cours dans son inscription pour l'année ${inscription.annee_etude}.`,
      });
    }

    // COURS_INCONNU : mnémonique inscrit mais absent de liste_cours.
    coursInscrits.forEach((mnemonique) => {
      if (!coursExistants.has(mnemonique)) {
        anomalies.push({
          type: AnomalieTypeEnum.CoursInconnu,
          matricule: inscription.matricule,
          annee: inscription.annee_etude,
          detail: `Inscrit à un cours inconnu: ${mnemonique}`,
        });
      }
    });
  });

  // -- ANOMALIES DE NOTE --

  // DUPLICATA_NOTE : plusieurs notes trouvées pour le même (matricule, mnemonique).
  const notesVues = new Set<string>();
  notes.forEach((note) => {
    const cleUnique = `${note.matricule}-${note.mnemonique}`;

    if (notesVues.has(cleUnique)) {
      anomalies.push({
        type: AnomalieTypeEnum.DuplicataNote,
        matricule: note.matricule,
        detail: `Plusieurs notes trouvées pour le cours ${note.mnemonique}.`,
      });
    } else {
      notesVues.add(cleUnique);
    }
  });
  // NOTE_SANS_CREDIT : cours noté mais crédit manquant ou ≤ 0.
  notes.forEach((note) => {
    const infoCours = coursDetailsMap.get(note.mnemonique);
    if (infoCours && infoCours.credit <= 0) {
      anomalies.push({
        type: AnomalieTypeEnum.NoteSansCredit,
        matricule: note.matricule,
        detail: `Le cours noté "${note.mnemonique}" a un crédit invalide (${infoCours.credit}).`,
      });
    }

    // NOTE_SANS_INSCRIPTION : note existante pour un cours non présent dans cours_json.
    const coursInscrits = inscriptionsMap.get(note.matricule);
    if (!coursInscrits || !coursInscrits.has(note.mnemonique)) {
      anomalies.push({
        type: AnomalieTypeEnum.NoteSansInscription,
        matricule: note.matricule,
        detail: `Note trouvée pour le cours "${note.mnemonique}" auquel l'étudiant n'a jamais été inscrit.`,
      });
    }
  });

  return anomalies;
};
