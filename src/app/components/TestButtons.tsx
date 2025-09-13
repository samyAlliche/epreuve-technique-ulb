//COMPONENT PROVISOIRE JUSTE POUR TESTER LES FONCTIONS

"use client";
import { detecterAnomalies } from "@/lib/anomalies";
import { genererBulletin } from "@/lib/bulletins";
import { Cours } from "@/types/Cours";
import { Inscription } from "@/types/Inscription";
import { Note } from "@/types/Note";
import React from "react";

interface TestButtonsProps {
  fetchAll: () => Promise<{
    inscriptions: Inscription[];
    cours: Cours[];
    notes: Note[];
  }>;
}

const TestButtons: React.FC<TestButtonsProps> = ({ fetchAll }) => {
  //PROVISOIRE
  const handleClick = async (type: "bulletins" | "anomalies") => {
    try {
      const data = await fetchAll();
      if (type === "bulletins") {
        const bulletins = genererBulletin(
          data.inscriptions,
          data.cours,
          data.notes
        );
        console.log("Bulletins:", bulletins);
      } else {
        const anomalies = detecterAnomalies(
          data.inscriptions,
          data.cours,
          data.notes
        );
        console.log("Anomalies:", anomalies);
      }
      console.log("ALL DATA:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => handleClick("bulletins")}>Bulletin</button>
      <button onClick={() => handleClick("anomalies")}>Anomalies</button>
    </div>
  );
};

export default TestButtons;
