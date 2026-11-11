export type PolicySection = {
  heading: string;
  paras?: string[];
  items?: string[];
};

export type Policy = {
  id: string;
  title: string;
  short: string;
  intro: string;
  review: string;
  facts: { value: string; label: string }[];
  sections: PolicySection[];
};

/** Order matters: `?activePolicy=N` is 1-based, as on the school's existing website. */
export const POLICIES: Policy[] = [
  {
    id: "admission",
    title: "Politique d'admission",
    short: "Admission",
    intro:
      "Comment les familles rejoignent Taki Academy : étapes, critères, documents et passage vers le Programme du diplôme.",
    review: "Révisée chaque année",
    facts: [
      { value: "11–16", label: "ans, âge d'accès au PEI" },
      { value: "72 h", label: "pour recevoir la décision" },
      { value: "10/20", label: "moyenne minimale (écoles tunisiennes)" },
    ],
    sections: [
      {
        heading: "Portée et responsabilité",
        paras: [
          "Tous les membres du personnel appliquent cette politique. Le directeur et la coordonnatrice la révisent chaque année, en tenant compte des avis des élèves, des parents, des enseignants et du conseil d'administration.",
        ],
      },
      {
        heading: "Philosophie",
        paras: [
          "Le PEI est ouvert aux élèves de 11 à 16 ans qui souhaitent le rejoindre. L'admission tient compte du profil de l'apprenant de l'IB, ainsi que des ressources humaines, des locaux et de la réglementation locale.",
        ],
      },
      {
        heading: "Étapes d'admission",
        items: [
          "Les parents transmettent le bulletin de l'année précédente et une fiche de renseignements.",
          "L'élève passe des évaluations en français, en anglais et en mathématiques, ainsi qu'un entretien. Un niveau 2 en français est requis.",
          "Le dossier disciplinaire et un contact avec l'école précédente peuvent être pris en compte.",
          "La décision est communiquée dans un délai de 72 heures.",
        ],
      },
      {
        heading: "Notes minimales",
        items: [
          "Élèves issus d'écoles tunisiennes publiques ou privées : moyenne générale de 10/20.",
          "Élèves issus d'écoles de l'IB : au moins 3 dans chaque groupe de matières.",
        ],
      },
      {
        heading: "Réinscription",
        items: [
          "Réussir toutes les matières, sans saut de niveau.",
          "Satisfaire aux exigences du programme, y compris les activités de service.",
          "Faire preuve d'un comportement adapté et remettre les travaux évalués.",
        ],
      },
      {
        heading: "Inscription",
        paras: [
          "Le dossier comprend l'acte de naissance original, le dernier bulletin ou une attestation de scolarité, et des photos d'identité. Les familles signent également le code de conduite et les conditions financières.",
        ],
      },
      {
        heading: "Transferts",
        paras: [
          "Les familles demandent un certificat de scolarité. Le remboursement des frais non utilisés est examiné au cas par cas.",
        ],
      },
      {
        heading: "Programme du diplôme de l'IB (DP)",
        paras: [
          "Le DP s'adresse aux élèves de 16 à 18 ans. L'orientation commence en février de la PEI 5, avec des entretiens, une période d'adaptation au début de la DP 1 et un soutien supplémentaire en DP 2 si nécessaire.",
        ],
      },
      {
        heading: "Langues et tronc commun",
        paras: [
          "La plupart des matières sont enseignées en français. L'arabe est proposé en Langue A. Le tronc commun comprend la Théorie de la connaissance (TDC), la Créativité, l'Activité et le Service (CAS) et le mémoire.",
        ],
      },
      {
        heading: "Liens avec les autres politiques",
        paras: ["Cette politique est liée aux politiques linguistique et d'inclusion."],
      },
    ],
  },
  {
    id: "evaluation",
    title: "Politique d'évaluation",
    short: "Évaluation",
    intro:
      "Comment nous évaluons les apprentissages dans le PEI et le DP : des critères clairs, des retours détaillés et une modération rigoureuse.",
    review: "Révisée chaque année",
    facts: [
      { value: "2×", label: "bulletins par an (semestriels)" },
      { value: "/7", label: "note finale IB" },
      { value: "50 %", label: "seuil de passage au niveau supérieur" },
    ],
    sections: [
      {
        heading: "Portée et responsabilité",
        paras: [
          "Tous les enseignants appliquent cette politique. L'équipe de direction pédagogique forme le personnel et assure le suivi et la qualité. Le directeur et la coordonnatrice la révisent chaque année avec les avis des élèves, des parents, des enseignants et du conseil d'administration.",
        ],
      },
      {
        heading: "Principes d'évaluation",
        paras: ["L'évaluation est à la fois formative et sommative."],
        items: [
          "Évaluation diagnostique : en début d'année, sous forme numérique, orale ou écrite, pour guider l'organisation de la classe et les supports.",
          "Évaluation formative : un contrôle continu (QCM, discussion orale, écrit, etc.) pour repérer progrès, forces et faiblesses, soutenir l'élève et orienter la remédiation.",
        ],
      },
      {
        heading: "Évaluation sommative",
        items: [
          "Les évaluations sont authentiques et proches de situations réelles.",
          "Les critères de la tâche de fin d'unité sont communiqués dès le début de l'unité, et aux parents lors de la première réunion de rentrée.",
          "Un retour détaillé sur les critères et la note est donné le jour de la remise du travail corrigé.",
          "Critères : critères de l'IB pour les PEI 1, 3 et 5 ; les PEI 2 et 4 utilisent respectivement les critères préétablis des PEI 3 et 5.",
          "Des entretiens individuels, un plan de remédiation et un soutien d'inclusion sont proposés aux élèves en difficulté.",
        ],
      },
      {
        heading: "Modération",
        items: [
          "Normalisation interne entre enseignants : au moins une fois par semestre et par groupe de matières, sur trois travaux (faible, moyen, élevé) choisis au hasard.",
          "Modération interne : au moins deux fois par an, les enseignants d'un même groupe échangent et corrigent trois copies, puis comparent leurs notes.",
          "Le projet personnel de la PEI 5 fait aussi l'objet d'une normalisation interne.",
          "La normalisation externe est assurée par les examinateurs de l'IB.",
        ],
      },
      {
        heading: "Modalités d'évaluation sommative",
        items: [
          "Rédactions (essais, dissertations) et évaluations orales, surtout en Langue et littérature et en Acquisition de langues.",
          "Productions matérielles : expositions, œuvres, maquettes.",
          "Travaux pratiques en Sciences et portfolio électronique en Design (PEI 5).",
          "Éducation physique et à la santé : théorie, pratique et réflexion.",
        ],
      },
      {
        heading: "Bulletin et transmission des résultats",
        items: [
          "Bulletin semestriel : pour chaque matière, évaluation sommative sur les quatre critères, bilan des acquis et conseils.",
          "Les niveaux des quatre critères donnent une note finale IB sur 7.",
          "Appréciation générale rédigée par la direction, en concertation avec les enseignants.",
          "Copie signée par les parents à retourner à l'administration.",
          "Un relevé mi-semestriel est mis en place à partir d'avril 2024.",
        ],
      },
      {
        heading: "Passage au niveau supérieur",
        items: [
          "PEI 1 à 3 : seuil de 81 points (50 %) ; PEI 4 et 5 : seuil de 77 points (50 %).",
          "Conditions complémentaires : travaux de service (action) terminés, contribution au rapport de projet, bon travail et bon comportement.",
          "Le conseil de classe examine chaque dossier et donne un avis consultatif ; le conseil pédagogique prend la décision finale.",
          "Les élèves en admission conditionnelle sont reçus par la direction, qui met en place un accompagnement.",
          "PEI 5 : tous les élèves doivent achever le projet personnel.",
        ],
      },
      {
        heading: "Évaluation au diplôme",
        paras: [
          "L'évaluation respecte les principes de l'IB : outils variés, retour aux élèves, analyse des données pour orienter l'enseignement et participation des élèves à leur propre évaluation. Pour accéder à la première année du diplôme, l'élève doit être inscrit au moins en dernière année du PEI.",
        ],
      },
      {
        heading: "Communication et révision",
        paras: [
          "La coordonnatrice PEI/DP communique la politique aux enseignants, aux parents et aux élèves. Elle est révisée chaque année, ou selon les mises à jour de l'IB et le contexte.",
        ],
      },
      {
        heading: "Liens avec les autres politiques",
        items: [
          "Linguistique : évaluations adaptées aux besoins linguistiques.",
          "Inclusion : prise en compte des besoins individuels pour une évaluation équitable.",
          "Intégrité intellectuelle : prévention de la malhonnêteté académique et du plagiat.",
        ],
      },
    ],
  },
  {
    id: "inclusion",
    title: "Politique d'inclusion",
    short: "Inclusion",
    intro:
      "Chaque élève doit se sentir valorisé, en confiance et en sécurité. Notre politique supprime les obstacles à l'apprentissage et à l'évaluation.",
    review: "Révisée tous les 3 ans",
    facts: [
      { value: "6", label: "principes de l'IB" },
      { value: "PEI + DP", label: "même approche centrée sur l'élève" },
      { value: "3 ans", label: "cycle de révision" },
    ],
    sections: [
      {
        heading: "Introduction",
        paras: [
          "Cette politique sert de base à toute la communauté scolaire (élèves, enseignants, parents, direction, personnel non enseignant). Elle ne vise pas seulement les élèves en difficulté ou surdoués, mais tout apprenant susceptible de rencontrer des obstacles d'apprentissage ou d'évaluation.",
          "L'école adapte ses locaux, ses méthodes, ses équipements et ses supports. L'administration et les enseignants diversifient les méthodes et adaptent l'évaluation aux différents niveaux d'une même classe.",
        ],
      },
      {
        heading: "Repérer les besoins spécifiques",
        items: [
          "À l'admission : le parent remplit une fiche d'information lors de la pré-inscription, signale toute difficulté scolaire ou maladie et fournit le dossier médical. Après acceptation, le dossier est transmis à la direction, qui informe la coordonnatrice PEI/DP et l'équipe pédagogique.",
          "En cours d'année : tout membre de la communauté scolaire qui repère des difficultés scolaires ou des troubles du comportement rédige un rapport à l'attention de la direction.",
        ],
      },
      {
        heading: "Mission de l'IB et de l'établissement",
        paras: [
          "Supprimer ou réduire les obstacles pour que chaque élève participe pleinement aux programmes de l'IB, et fonder notre propre politique d'éducation inclusive sur ces principes et sur la mise en place d'aménagements d'accès.",
        ],
      },
      {
        heading: "Ce que signifie l'inclusion",
        paras: [
          "Une philosophie et des pratiques pédagogiques qui visent à ce que chaque élève se sente valorisé, confiant et en sécurité, fondées sur l'intérêt supérieur de l'enfant, le sentiment d'appartenance et l'interaction positive avec les pairs.",
        ],
      },
      {
        heading: "Aménagements possibles",
        items: [
          "Temps : temps supplémentaire et heures de soutien, en classe et lors des évaluations.",
          "Supports : supports de cours papier ou numériques.",
          "Mode de réponse : organisateurs graphiques, synthèse vocale, calculatrice parlante pour les élèves ayant des troubles physiques ou sensoriels.",
          "Cadre : placement particulier en classe, éclairage, table ou siège adapté.",
        ],
      },
      {
        heading: "Les six principes de l'IB",
        items: [
          "L'éducation pour tous est un droit humain.",
          "Des environnements positifs et adaptés améliorent l'éducation.",
          "Chaque professionnel est responsable de tous les élèves.",
          "L'apprentissage tient compte des points forts de chacun.",
          "La diversité est une ressource.",
          "Tous les apprenants ont leur place et des chances égales.",
        ],
      },
      {
        heading: "Processus de rattrapage (avec le consentement des parents)",
        items: [
          "Cours différenciés supplémentaires (arabe, français, anglais, mathématiques).",
          "Heures de soutien tout au long de l'année, jusqu'à amélioration.",
          "Temps supplémentaire lors des évaluations pour certains troubles d'apprentissage.",
          "Évaluations ciblées selon la différenciation, et soutien linguistique si nécessaire.",
        ],
      },
      {
        heading: "PEI et DP : points communs et différences",
        items: [
          "Communs : approche centrée sur l'élève, aménagements raisonnables, valeurs de l'IB (empathie, respect de la diversité, autonomie).",
          "Dans le DP, les aménagements visent surtout les examens formels ; dans le PEI, ils portent sur l'apprentissage continu et l'évaluation formative.",
          "Le PEI privilégie un développement global et interdisciplinaire ; le DP prépare à l'enseignement supérieur.",
        ],
      },
      {
        heading: "Adoption, diffusion et révision",
        paras: [
          "Adoptée par le comité pédagogique après consultation des parties concernées, elle est révisée tous les trois ans par la coordonnatrice PEI/DP. Elle est communiquée chaque année à l'équipe et aux parents.",
        ],
      },
      {
        heading: "Liens avec les autres politiques",
        items: [
          "Linguistique : aide spécifique (par exemple un tiers temps) et plan d'intervention révisé à la fin de l'année scolaire.",
          "Intégrité : l'aide doit rester raisonnable et équitable.",
          "Évaluation : mesures particulières pour que l'élève soit évalué comme ses camarades.",
        ],
      },
    ],
  },
  {
    id: "integrite",
    title: "Politique d'intégrité",
    short: "Intégrité",
    intro:
      "L'intégrité intellectuelle est un ensemble de valeurs et de compétences : expliquer sa pensée, citer ses sources, travailler avec honnêteté.",
    review: "Révisée chaque année",
    facts: [
      { value: "3", label: "styles de citation acceptés (APA, MLA, Chicago)" },
      { value: "7", label: "principes d'intégrité" },
      { value: "1×/an", label: "révision en réunion plénière" },
    ],
    sections: [
      {
        heading: "But de la politique",
        items: [
          "Sensibiliser les élèves à l'importance de l'intégrité intellectuelle dans leur formation de citoyens responsables.",
          "Définir les droits et responsabilités de chaque membre de la communauté scolaire.",
          "Préciser les bonnes pratiques, les comportements fautifs et les mesures applicables.",
        ],
      },
      {
        heading: "Qu'est-ce que l'intégrité intellectuelle ?",
        paras: [
          "Un ensemble de valeurs et de compétences, défini par l'IB, qui favorise l'intégrité personnelle et de bonnes pratiques d'enseignement, d'apprentissage et d'évaluation. Les élèves expliquent leur pensée, montrent comment ils ont construit leurs idées et justifient leurs choix.",
          "Elle se développe grâce aux approches de l'apprentissage et au profil de l'apprenant de l'IB, dans toutes les matières. Les enseignants se l'approprient avant de l'enseigner.",
        ],
      },
      {
        heading: "Définition de la mauvaise conduite",
        paras: [
          "Tout comportement, volontaire ou non, qui procure un avantage déloyal ou peut nuire à un autre élève lors d'une évaluation, ou qui menace l'intégrité des examens de l'IB.",
        ],
        items: [
          "Plagiat : présenter les idées ou le travail d'autrui sans citer correctement ses sources.",
          "La politique distingue la collaboration de la collusion, et mentionne la reproduction de travail.",
        ],
      },
      {
        heading: "Rôles et responsabilités",
        items: [
          "Direction : veille à l'application de la politique et du code de vie, et à ce que les élèves connaissent les règles de citation et les conséquences d'un plagiat.",
          "Coordonnatrice PEI/DP : coordonne le soutien pédagogique, révise la politique et le guide de présentation des travaux écrits.",
          "Enseignants : enseignent l'usage des sources, accompagnent les élèves, vérifient l'authenticité des travaux, surveillent les évaluations et signalent les cas de fraude.",
          "Élèves : remettent des travaux authentiques, citent leurs sources, respectent les échéances et disent la vérité.",
          "Parents : prennent connaissance du guide de présentation des travaux écrits et encouragent l'intégrité chez leur enfant.",
        ],
      },
      {
        heading: "Mesures en cas d'infraction",
        items: [
          "Première infraction : un rapport est versé au dossier de l'élève et un entretien réunit l'élève, l'enseignant concerné et la coordonnatrice.",
          "Seconde infraction : passage devant un conseil de discipline.",
        ],
      },
      {
        heading: "Bonnes pratiques",
        items: [
          "Repérer les passages empruntés à autrui, citer et référencer ses sources.",
          "Identifier la contribution de chacun dans un travail d'équipe.",
          "Utiliser les technologies et les réseaux sociaux de façon responsable.",
          "Citation mot pour mot : entre guillemets, avec un appel de note donnant tous les détails de la source.",
          "Bibliographie : uniquement les sources citées dans le texte.",
        ],
      },
      {
        heading: "Les principes d'intégrité",
        items: [
          "Honnêteté : agir selon les règles éthiques et reconnaître ses erreurs.",
          "Acceptation : accepter ses forces et ses faiblesses et faire de son mieux.",
          "Justesse : s'abstenir de tout avantage injuste (copie, téléphone pendant un examen).",
          "Responsabilisation : assumer ses choix et ses décisions.",
          "Familiarisation : connaître les règles de l'école.",
          "Demande d'aide : citer systématiquement les travaux de tiers.",
          "Collaboration sans risques : partager les travaux en ligne avec prudence.",
        ],
      },
      {
        heading: "Méthodes de citation acceptées",
        paras: [
          "APA, MLA ou Chicago, selon le référentiel de classe, ou le guide de l'IB « Savoir citer et référencer ses sources ». Au début du DP, chaque cohorte étudie ces styles et construit ce référentiel ensemble.",
        ],
      },
      {
        heading: "Diffusion et révision",
        paras: [
          "Révision annuelle lors de la réunion plénière des enseignants. La version révisée est diffusée à la communauté, en version imprimée ou sur le site.",
        ],
      },
      {
        heading: "Liens avec les autres politiques",
        items: [
          "Inclusion : tous les élèves, y compris ceux bénéficiant d'aides, respectent l'intégrité.",
          "Linguistique : élèves et parents sont informés dès la rentrée de l'importance accordée aux langues.",
          "Évaluation : enseignants, parents et élèves comprennent le principe d'intégrité en matière d'évaluation.",
        ],
      },
    ],
  },
  {
    id: "linguistique",
    title: "Politique linguistique",
    short: "Langues",
    intro:
      "La langue est le fondement de tout apprentissage. À Taki Academy, les élèves grandissent en arabe, en français et en anglais.",
    review: "Révisée tous les 2 ans",
    facts: [
      { value: "3", label: "langues : arabe, français, anglais" },
      { value: "112 h", label: "d'arabe par an dans le PEI" },
      { value: "150 h", label: "d'anglais par an dans le PEI" },
    ],
    sections: [
      {
        heading: "Un pays plurilingue",
        paras: [
          "La Tunisie est un pays plurilingue où la plupart des habitants parlent deux à trois langues. La Darja, dialecte tunisien dérivé de l'arabe, contient des emprunts au français, à l'italien, à l'espagnol et à l'anglais. Nous considérons la langue comme le fondement de tout apprentissage.",
          "Notre ambition : un apprenant ouvert d'esprit, chercheur et sensé, qui maîtrise les langues enseignées dès la 1re année du PEI. Des certifications internationales de langues sont proposées aux élèves.",
        ],
      },
      {
        heading: "Soutien de la langue maternelle",
        paras: [
          "L'arabe tunisien est la langue maternelle de la majorité des élèves. Le PEI prévoit 112 heures d'arabe par an pour toutes les années. Des projets interdisciplinaires et de recherche peuvent être menés en arabe, et la bibliothèque propose des ressources en arabe.",
          "Des journées culturelles sont organisées, dont la Journée mondiale de la langue arabe (18 décembre) et la Journée nationale de l'habit traditionnel.",
        ],
      },
      {
        heading: "Langue d'enseignement et volumes horaires",
        items: [
          "Langue d'enseignement : le français.",
          "L'arabe (langue et littérature) et l'anglais sont enseignés comme langues supplémentaires ; le français l'est aussi en acquisition de langue.",
          "L'anglais bénéficie de 150 heures par an pour toutes les années du PEI.",
          "Tous les enseignants développent l'expression orale et écrite dans les trois langues.",
        ],
      },
      {
        heading: "Soutien aux élèves non francophones",
        paras: [
          "Des cours de préparation et de consolidation linguistique en arabe, en français et en anglais sont proposés tout au long de l'année. Les élèves participent aux projets disciplinaires, interdisciplinaires et d'action-service, qu'ils peuvent mener dans la langue demandée.",
        ],
      },
      {
        heading: "Langue de communication",
        items: [
          "Les échanges écrits entre enseignants, élèves, administration et parents se font en français.",
          "Les enseignants de langues communiquent uniquement dans la langue qu'ils enseignent.",
          "Projet personnel, mémoire et travaux évalués : l'élève choisit entre le français, l'arabe ou l'anglais.",
        ],
      },
      {
        heading: "Évaluation linguistique",
        items: [
          "Acquisition de langue : compréhension et expression, orales et écrites, évaluées selon les objectifs A à D.",
          "Langue et littérature (arabe et français) : analyse, organisation, production de textes et manipulation de la langue.",
        ],
      },
      {
        heading: "Les langues au Programme du diplôme",
        items: [
          "Choix offerts : anglais en langue B, arabe et français en langue A.",
          "Niveau moyen (NM) : 50 semaines, au minimum 150 heures d'enseignement.",
          "Niveau supérieur (NS) : 50 semaines, au minimum 240 heures d'enseignement.",
        ],
      },
      {
        heading: "Liens avec les autres politiques",
        items: [
          "Inclusion et évaluation : aménagements (outils technologiques, temps supplémentaire) et soutien pédagogique ou psychologique pour les difficultés liées aux langues.",
          "Intégrité : comportement responsable et respectueux dans l'usage des langues.",
        ],
      },
      {
        heading: "Diffusion et révision",
        paras: [
          "La politique est communiquée à toute la communauté au début ou à la fin de chaque année et après chaque révision, via Teams ou en version papier. Elle est révisée tous les deux ans, et plus tôt si de nouvelles obligations l'exigent.",
        ],
      },
    ],
  },
  {
    id: "plaintes",
    title: "Gestion des plaintes des parents",
    short: "Plaintes",
    intro:
      "Les parents sont des partenaires essentiels. Les préoccupations exprimées de façon constructive sont des occasions de s'améliorer.",
    review: "Révisée tous les 2 ans",
    facts: [
      { value: "4", label: "niveaux de traitement" },
      { value: "2 jours", label: "ouvrables pour l'accusé de réception" },
      { value: "10 jours", label: "ouvrables pour une décision écrite (niveau 2)" },
    ],
    sections: [
      {
        heading: "Introduction et philosophie",
        paras: [
          "L'établissement propose le PEI et le Programme du diplôme. Cette politique garantit un traitement juste, transparent et efficace des préoccupations des familles.",
        ],
      },
      {
        heading: "Qu'est-ce qu'une plainte ?",
        paras: [
          "Une insatisfaction formelle concernant une décision, un comportement, une procédure ou un service. Elle se distingue d'une simple demande d'information : elle appelle une analyse et une réponse officielle, et doit rester respectueuse, factuelle et constructive.",
        ],
      },
      {
        heading: "Objectifs",
        items: [
          "Un processus clair et équitable.",
          "Une résolution rapide et un traitement impartial.",
          "Une meilleure communication.",
          "L'amélioration continue des pratiques.",
          "La protection du bien-être et de l'intérêt supérieur de l'élève.",
        ],
      },
      {
        heading: "Champ d'application",
        items: [
          "Parents et enseignants : évaluation, comportement, communication, différenciation, charge de travail.",
          "Parents et autres élèves : harcèlement, conflits sociaux, discrimination ou exclusion.",
          "Parents et administration : règlement intérieur, services administratifs, discipline, décisions d'orientation ou de passage.",
          "Hors champ : demandes d'information ordinaires, décisions réglementaires définitives, procédures disciplinaires ou légales spécifiques.",
        ],
      },
      {
        heading: "Principes directeurs",
        paras: [
          "Respect mutuel, confidentialité, équité, transparence, résolution constructive et amélioration continue.",
        ],
      },
      {
        heading: "Canal de communication",
        paras: [
          "La plateforme Webschool est le canal officiel pour poser une question, signaler une préoccupation, déposer une plainte et en assurer le suivi. Les courriels institutionnels et les rendez-vous officiels restent possibles si nécessaire.",
        ],
      },
      {
        heading: "Procédure en quatre niveaux",
        items: [
          "Niveau 1 : dialogue avec la personne concernée, en 3 à 5 jours ouvrables.",
          "Niveau 2 : coordination PEI/DP. Formulaire écrit, accusé de réception sous 2 jours ouvrables, entretiens, médiation éventuelle et décision écrite sous 10 jours ouvrables.",
          "Niveau 3 : direction. Appel écrit et motivé dans les 5 jours ouvrables suivant la notification ; décision finale interne sous 15 jours ouvrables.",
          "Niveau 4 : recours externe auprès de l'Organisation du Baccalauréat International, après épuisement des recours internes, pour les questions académiques liées aux politiques de l'IB.",
        ],
      },
      {
        heading: "Situations à traitement immédiat",
        paras: [
          "Harcèlement, violence physique ou verbale, discrimination, atteinte à la sécurité, protection de l'enfance et risques pour le bien-être d'un élève sont transmis directement à la direction.",
        ],
      },
      {
        heading: "Garanties de procédure",
        items: [
          "Parents et enseignants : l'enseignant dispose de 3 jours ouvrables pour répondre par écrit. Aucune note n'est modifiée sous pression sans justification pédagogique documentée.",
          "Parents et autres élèves : les familles sont informées séparément et la confidentialité est respectée. Les parents ne peuvent pas exiger de sanction précise contre un autre élève.",
          "Parents et administration : la plainte est instruite par un responsable n'ayant pas pris la décision contestée. Un comité de révision peut être convoqué.",
        ],
      },
      {
        heading: "Spécificités du PEI",
        paras: [
          "Les plaintes concernant l'évaluation critériée, le projet personnel, le service comme action ou les pratiques pédagogiques sont traitées avec la coordination PEI.",
        ],
      },
      {
        heading: "Spécificités du DP",
        items: [
          "Évaluation interne : la modération relève exclusivement de l'IB ; l'école ne peut pas modifier les notes soumises.",
          "Révision de notes : par la procédure officielle de l'IB, avec l'accompagnement de la coordination DP.",
          "Mémoire et Théorie de la connaissance : la décision finale appartient à l'IB.",
          "Intégrité académique : les parents sont informés mais ne peuvent pas bloquer une déclaration à l'IB.",
        ],
      },
      {
        heading: "Comportements inacceptables",
        paras: [
          "Menaces, harcèlement du personnel, propos injurieux, diffamation ou diffusion d'informations fausses ou nuisibles. L'établissement peut prendre les mesures appropriées.",
        ],
      },
      {
        heading: "Confidentialité, archivage et suivi",
        paras: [
          "Les documents sont sécurisés et accessibles aux seules personnes autorisées. Les plaintes formelles sont enregistrées pour vérifier leur résolution, repérer les tendances et améliorer les pratiques. La direction peut en faire un bilan annuel.",
        ],
      },
    ],
  },
];
