# Chat Simulé – Alice & Bob

## Description
Application de chat entièrement côté client qui simule une conversation entre deux utilisateurs fictifs (Alice & Bob).  
Stockage local, notifications animées, responsive, thème clair / sombre.

## Technologies
- HTML 5
- CSS 3 (var, @media, prefers-color-scheme)
- JavaScript ES6 (localStorage, DOM, événements)

## Fonctionnalités
- Créer / supprimer une conversation
- Messages dynamiques avec animation fadeIn
- Badge de non-lus animé
- Réponse automatique de l’interlocuteur après ~1 s
- Responsive mobile first
- Thème clair / sombre auto

## Lien vers le rendu final
https://ayoubayed777.github.io/Ayed_Ayoub_ChatSimule/

## Nouveautés explorées
- Gestion d’un état côté client sans framework
- Animation CSS + JS (classes show / fadeIn)
- Utilisation de :root et prefers-color-scheme
- stopPropagation pour éviter les clics fantômes

## Difficultés rencontrées & solutions
Problème :  
1) Cliquer sur le badge rouge ou sur la croix déclenchait quand même l’ouverture de la conversation  
2) L’historique restait affiché après une suppression  
3) Le compteur de non-lus ne se remettait pas toujours à zéro  

Solution :  
1) J’ai ajouté stopPropagation sur le badge et sur le bouton pour isoler les zones cliquables  
2) Je supprime l’entrée dans localStorage puis je reconstruis la liste complète  
3) Je sauvegarde le compteur immédiatement après l’ouverture d’une conversation

## Auteur
Ayoub Ayed – 2025
