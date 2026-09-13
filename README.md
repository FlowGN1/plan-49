# plan-49

Plan des réseaux de transport du Maine-et-Loire : arrêts, lignes, missions,
alertes temps réel et navigation GPS, dans une seule page web.

Réseaux couverts : Aléop interurbain, circuits scolaires Aléop, Irigo (Angers),
Ogalo / Agglobus (Saumur), Choletbus.

## Fonctions

- Lecture des fichiers GTFS directement dans le navigateur, sans serveur
- Filtrage par réseau, recherche par ligne, par arrêt ou par commune
- Choix d'une date de circulation : les circuits scolaires et les renforts
  disparaissent d'eux-mêmes hors période scolaire
- Sélection d'une mission : tracé, arrêts numérotés, export CSV
- Temps réel GTFS-RT : alertes de service, retards par ligne, position des véhicules
- Navigation : position GPS, cap, flèches de direction, arrêts restants sur la ligne
- Fonctionne hors ligne une fois installée, fond de carte désactivable

## Utilisation

Ouvrir l'adresse du site. Les données se chargent depuis `donnees.json`.
Pour les mettre à jour : onglet Données, déposer les fichiers GTFS,
puis « Exporter donnees.json » et remplacer le fichier sur le dépôt.
Penser alors à incrémenter `CACHE` dans `sw.js`, sinon les téléphones
conservent l'ancienne version en cache.

## Sources et licences

Données sous licence ODbL :

- Région Pays de la Loire — réseau Aléop, circuits scolaires, agrégat Destinéo
- Angers Loire Métropole — réseau Irigo, GTFS et GTFS-RT, assorti de
  conditions particulières d'utilisation
- Saumur Val de Loire — réseau Ogalo / Agglobus
- Diffusion : transport.data.gouv.fr, Point d'Accès National aux données de mobilité
- Fond de carte : © les contributeurs OpenStreetMap

Le fichier `donnees.json` est une base dérivée au sens de l'ODbL : toute
rediffusion doit conserver ces mentions et rester sous la même licence.

Bibliothèques tierces : Leaflet (BSD 2 clauses), JSZip (MIT).

## Code

© FlowGN, 2026. Tous droits réservés sur le code de l'application.
