/* =====================================================================
   CONFIGURATION DU PORTFOLIO — modifiez UNIQUEMENT ce fichier
   ---------------------------------------------------------------------
   • Laissez une valeur vide ("") tant qu'elle n'existe pas :
     le bouton correspondant est alors masqué automatiquement
     (aucun lien cassé, aucun lien inventé).
   • Numéros : format international SANS "+", espaces ni tirets.
     Exemple RDC : "243970000000"
   ===================================================================== */
window.PORTFOLIO_CONFIG = {
  /* ---------- Identité ---------- */
  identite: {
    nomComplet: "CIKURU CISHIBANJI Francine",
    prenomAffiche: "Francine",
    titre: "Développeuse d'applications web, mobiles & desktop",
    ville: "Bukavu, République démocratique du Congo",
    photo: "images/profil.jpg",
    photoAlt: "Portrait de Francine Cikuru Cishibanji"
  },

  /* ---------- Coordonnées (à compléter) ---------- */
  contact: {
    email: "cikurucishibanji03@gmail.com",          // ex. "francine.cikuru@exemple.com"
    telephone: "243999348465",      // ex. "243970000000"  → lien tel:+243970000000
    whatsapp: "https://wa.me/243999348465",       // ex. "243970000000"  → lien https://wa.me/243970000000
    // Message prérempli lorsqu'un visiteur clique sur WhatsApp / e-mail
    messageWhatsApp: "Bonjour Francine, j'ai consulté votre portfolio et je souhaiterais échanger avec vous au sujet d'un projet.",
    objetEmail: "Prise de contact depuis votre portfolio",
    messageEmail: "Bonjour Francine,\n\nJ'ai consulté votre portfolio et je souhaiterais échanger avec vous au sujet d'un projet.\n\nCordialement,"
  },

  /* ---------- Réseaux professionnels (à compléter) ---------- */
  reseaux: {
    github: "",         // ex. "https://github.com/votre-identifiant"
    linkedin: ""        // ex. "https://www.linkedin.com/in/votre-identifiant"
  },

  /* ---------- Envoi réel des formulaires ----------
     Service utilisé : Formspree (gratuit, compatible GitHub Pages).
     1. Créez un compte sur https://formspree.io
     2. Créez un formulaire et copiez son adresse, de la forme
        https://formspree.io/f/abcdwxyz
     3. Collez-la ci-dessous.
     Tant que ce champ est vide, le site N'AFFICHE JAMAIS « message envoyé » :
     il propose à la place d'utiliser l'e-mail ou WhatsApp. */
  formulaires: {
    endpoint: "https://formspree.io/f/xvkzywoq"        // ex. "https://formspree.io/f/abcdwxyz"
  },

  /* ---------- SEO ---------- */
  site: {
    url: ""             // ex. "https://votre-identifiant.github.io/portfolio/"
  },

  /* ---------- Projets ----------
     categorie : "gestion" | "transport"  (ajoutez un bouton de filtre dans index.html pour une nouvelle catégorie)  (sert aux filtres)
     demo / code : laissez "" tant qu'aucune démo en ligne ni dépôt public n'existe.
     captures : remplacez les aperçus illustratifs par vos vraies captures
                (déposez-les dans images/projets/) puis passez illustratif à false. */
  projets: [
    {
      id: "stock",
      titre: "Application de gestion de stock",
      categorie: "gestion",
      resume: "Suivi des articles, des entrées et sorties de stock, des fournisseurs et des seuils d'alerte pour éviter les ruptures.",
      description: "Application web destinée aux commerces et entreprises qui ont besoin de connaître à tout moment l'état de leur stock : quantités disponibles, mouvements et valeur des marchandises.",
      fonctionnalites: [
        "Gestion des articles, catégories et fournisseurs",
        "Enregistrement des entrées et des sorties de stock",
        "Alertes lorsque la quantité passe sous le seuil minimal",
        "Inventaire et historique des mouvements",
        "Rapports et tableau de bord de synthèse"
      ],
      technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      captures: ["images/projets/stock-1.svg", "images/projets/stock-2.svg", "images/projets/stock-3.svg"],
      illustratif: true,
      demo: "",
      code: ""
    },
    {
      id: "facturation",
      titre: "Facturation & gestion commerciale",
      categorie: "gestion",
      resume: "Gestion des clients, produits, devis et factures, avec suivi des paiements et synthèse du chiffre d'affaires.",
      description: "Application de gestion commerciale qui accompagne le cycle de vente, de l'établissement du devis jusqu'à l'encaissement de la facture.",
      fonctionnalites: [
        "Fichier clients et catalogue de produits",
        "Création de devis et de factures",
        "Suivi des paiements et des factures impayées",
        "Impression des factures",
        "Synthèse des ventes et du chiffre d'affaires"
      ],
      technologies: ["PHP orienté objet", "MVC", "MySQL", "Bootstrap"],
      captures: ["images/projets/facturation-1.svg", "images/projets/facturation-2.svg", "images/projets/facturation-3.svg"],
      illustratif: true,
      demo: "",
      code: ""
    },
    {
      id: "parking",
      titre: "Gestion de parkings",
      categorie: "transport",
      resume: "Contrôle des entrées et sorties de véhicules, attribution des places, tarification et suivi des recettes.",
      description: "Application de gestion d'un parc de stationnement : occupation des places en temps réel, tickets, abonnés et recettes journalières.",
      fonctionnalites: [
        "Enregistrement des entrées et des sorties de véhicules",
        "Visualisation de l'occupation des places",
        "Gestion des tarifs et des abonnés",
        "Calcul automatique du montant à payer",
        "Journal des opérations et recettes"
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      captures: ["images/projets/parking-1.svg", "images/projets/parking-2.svg", "images/projets/parking-3.svg"],
      illustratif: true,
      demo: "",
      code: ""
    },
    {
      id: "billets",
      titre: "Réservation de billets — transport lacustre",
      categorie: "transport",
      resume: "Site de réservation et de gestion de billets pour AMR MUGOTE, entreprise de transport lacustre : bateaux, programmes de voyage et paiement Mobile Money.",
      description: "Plateforme web réalisée pour une entreprise de transport lacustre (bateaux MUGOTE). Les voyageurs consultent les bateaux et les programmes, réservent leur place en plusieurs étapes depuis leur compte client et confirment la réservation par un paiement en ligne.",
      fonctionnalites: [
        "Page d'accueil présentant l'entreprise et ses bateaux",
        "Consultation des programmes de voyage et des bateaux",
        "Espace client avec compte personnel",
        "Réservation en plusieurs étapes, avec bénéficiaire et récapitulatif du prix",
        "Paiement Mobile Money intégré via la passerelle CinetPay",
        "Option de paiement par le mainteneur"
      ],
      technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript", "CinetPay"],
      captures: ["images/projets/mugote-accueil.jpg", "images/projets/mugote-paiement.jpg"],
      illustratif: false,
      demo: "",
      code: ""
    }
  ]
};
