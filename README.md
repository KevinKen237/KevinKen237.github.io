# kevinken237.github.io

Portfolio de Kevin Kenang, Data Scientist (risque de crédit et Open Banking).

En ligne : https://kevinken237.github.io/

## Contenu

Une seule page :

1. Accroche et photo
2. Mini-jeu du seuil d'acceptation (100 demandeurs fictifs, bilan +1 par client qui rembourse, −4 par impayé)
3. Missions actuelles, sans chiffre ni client
4. Trois histoires sur ma façon de travailler
5. Parcours (Orange, CREM, MTN, formation)
6. Loisirs et projets personnels
7. Contact

## Technique

- HTML, CSS et JavaScript simples, sans framework, sans jQuery, sans dépendance externe
- Polices hébergées sur le site (Bricolage Grotesque, Inter, Caveat)
- Seul service tiers : l'assistant Botpress (chargé en différé)
- Balises Open Graph pour l'aperçu LinkedIn (`assets/img/og-image.png`, 1200x630)
- Accessibilité : lien d'évitement, focus visible, zoom autorisé, animations coupées si `prefers-reduced-motion`
- Toutes les données du mini-jeu sont fictives

## Lancer en local

```bash
python3 -m http.server 8765
```

Puis ouvrir http://localhost:8765.

## Structure

```
index.html
assets/css/style.css
assets/js/main.js
assets/fonts/   polices woff2
assets/img/     photo, favicon, image de partage
assets/cv/      CV public (sans téléphone)
```
