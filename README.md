# Épreuve Technique réalisé par Samy Alliche

## À propos de ce projet

Cette application web full-stack a été développée dans le cadre de l'évaluation technique pour le poste de Développeur Full-Stack au sein de la Faculté de Psychologie, des Sciences de l’Éducation et de Logopédie de l'ULB.

Le projet met en œuvre les trois parties demandées dans l'énoncé :

1.  Une **API REST** pour consulter les données d'une base de données SQLite.
2.  Un **moteur de traitement de données** pour générer des bulletins ECTS et un rapport d'anomalies à partir d'une API externe.
3.  Une **interface utilisateur responsive** pour visualiser et naviguer à travers ces données.

## Choix Techniques et Justifications

Ce projet a été construit avec les technologies suivantes :

- **Framework :** Next.js 15 (App Router)
- **Langage :** TypeScript
- **Styling :** Tailwind CSS
- **Composants UI :** shadcn/ui
- **ORM :** Prisma
- **Validation de données :** Zod

### Justification du choix de shadcn/ui et Tailwind CSS

L'offre d'emploi mentionnait Bootstrap comme une compétence requise, que j'ai eu l'occasion d'utiliser durant mes études.

Cependant, pour cette évaluation technique, l'énoncé m'accordait la **liberté de choisir le framework frontend**. J'ai donc utilisé **shadcn/ui et Tailwind CSS**, des outils que je maîtrise bien et qui m'ont permis de démontrer au mieux mes compétences en conception d'interfaces utilisateur (UX/UI) et en développement frontend moderne.

Ce choix m'a permis de me concentrer sur la construction d'une application à la fois esthétique, fonctionnelle et entièrement responsive dans le temps imparti, tout en restant bien entendu à l'aise pour m'intégrer à des projets utilisant Bootstrap.

### Utilisation de Zod

Zod a été utilisée pour la validation des données provenant de l'API externe (Partie 2 et 3). C'est un outil que j'ai apprit à utiliser durant mon stage de fin d'étude et permet de garantir la robustesse et la sécurité de l'application en s'assurant que les données externes sont conformes au format attendu avant tout traitement.

---

## Fonctionnalités Implémentées

- **[✓] Partie 1 : API de Consultation**

  - Endpoints créés avec les Route Handlers de Next.js.
  - Connexion à la base de données SQLite via Prisma.
  - Endpoints pour les inscriptions, les cours et les notes.

- **[✓] Partie 2 : Traitement des Données**

  - Génération de bulletins ECTS complets par étudiant et par année.
  - Détection et rapport des 5 types d'anomalies de données demandés.

- **[✓] Partie 3 : Interface Utilisateur**
  - Un tableau de bord en page d'accueil.
  - Des pages pour lister les inscriptions et les cours
  - Une page de détail par inscription, affichant le bulletin calculé
  - Une page dédiée aux anomalies
  - L'interface est entièrement responsive

---

## Détail des Fonctionnalités Implémentées

### Partie 1 : API de Consultation des Données

Une API a été construite en utilisant les routes de Next.js pour interagir avec la base de données SQLite via Prisma.

**Endpoints créés :**

- `GET /api/liste_inscriptions` : Récupère la liste de toutes les inscriptions.
- `GET /api/liste_cours` : Récupère la liste de tous les cours.
- `GET /api/liste_notes` : Récupère la liste de toutes les notes.
- `GET /api/liste_inscriptions/[matricule]` : Récupère toutes les inscriptions ayant la matricule entré en parametre
- `GET /api/liste_cours/[mnemonique]` : Récupère le cours ayant le mnemonique entré en parametre
- `GET /api/liste_notes/inscriptions/[matricule]` : Récupère les inscriptions ayant la matricule entré en parametre ainsi que les notes de ces inscriptions
- `GET /api/liste_notes/cours/[mnemonique]` : Récupère le cours ayant le mnemonique entré en parametre ainsi que les notes de ce cours

### Partie 2 : Bulletins ECTS & Rapport d’Anomalies

Si vous voulez essayer ces deux fonctions, enlever le `<TestButtons>` des commentaires dans `/app/page.tsx`. Deux boutons seront alors disponible sur la page d'accueil (les résultats sont affiché sur la console)

- **Génération des Bulletins (`/lib/bulletin.ts`)** :

  - Une fonction `genererBulletins` a été créée pour calculer les données d'un bulletin à partir de l'ensemble des données
  - Elle calcule précisément tous les champs demandés : `ects_total_inscrits`, `ects_obtenus`, `moyenne_ponderee`, et la condition de `reussite`
  - J'ai aussi fait une fonction `genererBulletinPourUneInscription` pour pouvoir calculer le bulletin d'une seule inscription

- **Détection des Anomalies (`/lib/anomalies.ts`)** :
  - Une fonction `detecterAnomalies` identifie les 5 types d'incohérences demandés

### Partie 3 : Interface Utilisateur Responsive

L'interface a été conçue en utilisant une approche Server-First avec les Server Components pour maximiser les performances

**Pages créées :**

- **`/` (Accueil)** : Un tableau de bord affichant des données clés comme le nombre total d'étudiants, de cours, et surtout le nombre d'anomalies détectées.
- **`/inscriptions`** : Une page affichant la liste de toutes les inscriptions dans un tableau
- **`/cours`** : Une page listant l'ensemble des cours disponibles sous forme de tableau
- **`/anomalies`** : Une page présentant les anomalies dans un tableau clair pour identifier facilement les problèmes.
- **`/inscriptions/[matricule]/[annee_etude]`** : La page de détail d'une inscription, affichant le bulletin de l'étudiant pour une année spécifique. Inclut une navigation facile entre les différentes années d'étude de l'étudiant.
- **`/cours/[mnemonique]`** : La page de détail d'un cours, affichant ses informations et la liste de tous les étudiants inscrits avec leur note.
- **`/not-found`** : Dans le cas où l'utilisateur se retrouve perdu

---

## Pour Lancer le Projet Localement

1.  **Cloner le repo :**

    ```bash
    git clone https://github.com/samyAlliche/epreuve-technique-ulb.git
    cd ./epreuve-technique-ulb
    ```

2.  **Installer les dépendances :**

    ```bash
    npm install
    ```

3.  **Configurer la base de données :**

    - Initialisez Prisma:

    ```bash
    npx prisma init
    ```

    - Placez le fichier `universite_demo.sqlite` dans le dossier `/prisma` à la racine du projet.
    - Créez un fichier `.env` à la racine du projet et ajoutez la ligne suivante :

    ```env
    DATABASE_URL="file:./prisma/universite_demo.sqlite"
    ```

    - Générez le client Prisma :

    ```bash
    npx prisma generate
    ```

4.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```

L'application sera alors accessible à `http://localhost:3000`.

---

## Note sur l'Utilisation de l'IA

Conformément aux consignes de transparence, je précise avoir eu recours à l'IA pour les tâches suivantes:

- Avant de commencer à coder j'ai brainstormé et structuré toute mes idées et tâches à venir avec l'IA
- Pour des revues de code, notamment dans la partie 2 quant à l'utilisation des Maps et des Sets
- Une aide pour le debug, pour identifier plus rapidement des erreurs complexes (notamment pour `DUPLICATA_NOTE` dans la partie 2) ou de style (CSS).
- Une aide à la rédaction de ce README.md 😁
  La conception, l'architecture, la logique ainsi que l'écriture du code restent mon propre travail!
