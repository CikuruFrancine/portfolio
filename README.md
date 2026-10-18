# Portfolio — CIKURU CISHIBANJI Francine

Portfolio professionnel statique (HTML5, CSS3, JavaScript, Bootstrap 5, Font Awesome, Google Fonts), prêt à être publié gratuitement sur **GitHub Pages**.

## Structure

```
portfolio/
├── index.html            Page unique (toutes les sections)
├── css/style.css         Styles, thèmes clair/sombre, animations
├── js/config.js          ⚙️ VOS COORDONNÉES, LIENS ET PROJETS (seul fichier à modifier)
├── js/script.js          Comportements : menu, thème, filtres, galerie, formulaires
├── js/theme.js           Applique le thème avant l'affichage (évite un flash)
├── images/
│   ├── profil.jpg        Photo de profil (+ profil-sm.jpg pour mobile)
│   ├── favicon.svg
│   └── projets/          Visuels des projets
├── robots.txt
├── .nojekyll             Indique à GitHub Pages de servir les fichiers tels quels
└── README.md
```

## 1. Personnaliser (js/config.js)

| Champ | Exemple | Effet |
|---|---|---|
| `contact.email` | `"francine@exemple.com"` | Bouton e-mail (`mailto:` avec objet et message préremplis) |
| `contact.telephone` | `"243970000000"` | Bouton téléphone (`tel:+243…`) |
| `contact.whatsapp` | `"243970000000"` | Boutons WhatsApp + bouton flottant (`https://wa.me/243…`) |
| `contact.messageWhatsApp` | texte | Message prérempli dans WhatsApp |
| `reseaux.github` / `reseaux.linkedin` | `"https://github.com/…"` | Icônes GitHub / LinkedIn |
| `formulaires.endpoint` | `"https://formspree.io/f/xxxx"` | Envoi réel des formulaires |
| `projets[].demo` / `projets[].code` | URL `https://…` | Boutons « Démonstration » / « Code source » |

Numéros : format international **sans** `+`, espaces ni tirets.

**Tant qu'un champ est vide, le bouton correspondant n'est pas affiché** : le site ne montre jamais de lien inventé ou cassé.

## 2. Activer l'envoi des formulaires (Formspree, gratuit)

GitHub Pages n'exécute pas de PHP ; l'envoi passe donc par un service de formulaires externe.

1. Créez un compte sur <https://formspree.io> (offre gratuite).
2. **New form** → donnez-lui un nom → copiez l'adresse affichée (`https://formspree.io/f/abcdwxyz`).
3. Collez-la dans `formulaires.endpoint` de `js/config.js`.
4. Publiez, puis envoyez un premier message de test : Formspree vous demandera de confirmer votre adresse e-mail.

Le même endpoint reçoit le formulaire de **contact** et le formulaire de **devis** (un champ `formulaire` indique lequel).

Comportement honnête :
- Le message de succès n'apparaît **que** si Formspree confirme la réception (réponse HTTP 2xx).
- Si l'endpoint n'est pas configuré, si l'internet est coupé ou si le serveur refuse, le visiteur est informé que **rien n'a été envoyé**, et se voit proposer d'envoyer le même texte par e-mail ou WhatsApp.
- Un champ invisible (« honeypot ») filtre les robots.

Le formulaire de devis propose aussi **« Préparer sur WhatsApp »** : les champs sont vérifiés, un récapitulatif s'affiche, puis WhatsApp s'ouvre avec le message prérempli.

## 3. Remplacer les visuels de projets

Les images de `images/projets/*.svg` sont des **aperçus illustratifs** (maquettes génériques), signalés comme tels sur le site par un badge « Aperçu illustratif ». Ils ne sont pas présentés comme de vraies captures.

Pour afficher vos vraies captures :
1. Faites des captures de vos logiciels (format paysage 16:10 conseillé, ex. 1280×800), enregistrez-les en `.jpg` ou `.webp` dans `images/projets/`.
2. Dans `js/config.js`, remplacez les chemins de `captures` du projet.
3. Passez `illustratif: false` : le badge et la mention disparaissent.

Ajouter un projet : copiez un bloc dans `projets`, donnez-lui un `id` unique et une `categorie` (`gestion` ou `transport`). Pour une nouvelle catégorie, ajoutez un bouton `filter-btn` dans `index.html` et son libellé dans `CAT_LABEL` (`js/script.js`).

## 4. Déployer gratuitement sur GitHub Pages

1. Créez un compte sur <https://github.com> si nécessaire.
2. **New repository** → nom : `portfolio` (ou `votre-identifiant.github.io` pour une adresse sans sous-dossier) → **Public** → *Create repository*.
3. Envoyez les fichiers :
   - **Sans Git** : *Add file → Upload files*, glissez le **contenu** du dossier `portfolio` (pas le dossier lui-même, `index.html` doit être à la racine), puis *Commit changes*.
   - **Avec Git** :
     ```bash
     cd portfolio
     git init
     git add .
     git commit -m "Publication du portfolio"
     git branch -M main
     git remote add origin https://github.com/VOTRE-IDENTIFIANT/portfolio.git
     git push -u origin main
     ```
4. Dans le dépôt : **Settings → Pages** → *Source* : **Deploy from a branch** → Branche **main**, dossier **/ (root)** → *Save*.
5. Après 1 à 2 minutes, le site est en ligne à `https://VOTRE-IDENTIFIANT.github.io/portfolio/`.
6. Reportez cette adresse dans `site.url` de `js/config.js`, et (pour le référencement) remplacez dans `index.html` la balise `og:image` par l'URL complète `https://…/images/profil.jpg`. Ajoutez la même adresse dans `robots.txt` (ligne Sitemap facultative).

Chaque nouvelle modification envoyée sur `main` met le site à jour automatiquement.

## 5. Tester en local

Ouvrez simplement `index.html` dans un navigateur, ou, pour un comportement identique à la mise en ligne :
```bash
cd portfolio
python -m http.server 8000     # puis http://localhost:8000
```
(XAMPP fonctionne aussi : copiez le dossier dans `htdocs`.)

## Qualité & sécurité

- **Responsive** : mobile, tablette, ordinateur (menu repliable, mise en page adaptative).
- **Accessibilité** : lien d'évitement, navigation clavier (galerie : ← → Échap), libellés ARIA, contrastes, respect de « réduire les animations ».
- **Référencement** : titre et description, Open Graph, données structurées schema.org `Person`, HTML sémantique.
- **Sécurité** : politique CSP stricte, intégrité SRI des bibliothèques CDN, liens externes `noopener noreferrer`, aucun contenu utilisateur injecté en HTML.
- **Performance** : aucune image lourde, chargement différé des visuels, polices en `display=swap`.

Si vous ajoutez un service externe (autre CDN, analytics…), ajoutez son domaine dans la balise `Content-Security-Policy` de `index.html`.
