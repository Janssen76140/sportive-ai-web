Étape 1 : Identité & Sport Principal
	•	Prénom de l’athlète (TextField)
	•	Nom de l’athlète (TextField)
	•	Tranche d’âge (RadioGroup ou Select)
	•	6–9 ans
	•	10–13 ans
	•	14–18 ans
	•	Genre (RadioGroup)
	•	Garçon
	•	Fille
	•	Autre / Préfère ne pas dire
	•	Sport principal pratiqué (Autocomplete ou Select)
	•	Liste des sports (foot, basket, tennis, natation, etc.)

⸻

Étape 2 : Santé & Informations Médicales
	•	Taille de l’enfant (TextField avec unité cm/ft)
	•	Poids de l’enfant (TextField avec unité kg/lbs)
	•	Allergies alimentaires (Multi-select + possibilité d’ajouter un allergène personnalisé)
	•	Antécédents médicaux (TextField, facultatif)
	•	Latéralité (main dominante) (RadioGroup)
	•	Droite
	•	Gauche
	•	Ambidextre

⸻

Étape 3 : Entraînement & Habitudes
	•	Fréquence d’entraînement par semaine (Slider ou Select)
(ex : 1–7 séances)
	•	Intensité des entraînements (Slider ou Select)
	•	Faible
	•	Modérée
	•	Élevée
	•	Nombre de séances de coaching/semaine (TextField ou Slider)
	•	Années d’expérience sportive (Select ou Slider)
	•	0–1 an
	•	2–3 ans
	•	4–6 ans
	•	7 ans et +
	•	Niveau académique de l’enfant (Select)
	•	Primaire
	•	Collège
	•	Lycée
	•	Autre
	•	Académie sportive (si applicable) (Autocomplete, facultatif)

⸻

Étape 4 : Compte Parent & Sécurité
	•	Adresse e-mail du parent (TextField, validation email)
	•	Mot de passe (création) (PasswordField, validation force)
	•	Confirmation du mot de passe (PasswordField)
	•	Connexion via compte tiers (Boutons OAuth : Google, Apple)

⸻

Étape 5 : Questionnaire IA Complémentaire

(Réponses utilisées pour affiner la recommandation des compléments alimentaires)
	•	Niveau de fatigue ressenti (Slider de 0 à 10)
	•	Objectifs principaux (Select ou multi-select)
	•	Performance
	•	Endurance
	•	Récupération
	•	Prise de muscle
	•	Autre (préciser)
	•	Régime alimentaire spécifique ? (RadioGroup)
	•	Aucun
	•	Végétarien
	•	Végan
	•	Sans gluten
	•	Autre (préciser)
	•	Historique des blessures (TextField, facultatif)
	•	Préférences de goût (Multi-select chips : fruits rouges, vanille, chocolat, neutre, etc.)

⸻

Étape 6 : Récapitulatif & Confirmation
	•	Résumé de toutes les informations saisies
	•	Carte des recommandations personnalisées (affichée, non modifiable)
	•	Code d’accès généré pour l’enfant (affiché au parent)
	•	Bouton de validation finale (“Créer le compte & accéder au dashboard”)