
# Solutions pour "Invincible: Faille de Sécurité"

Voici les solutions pour progresser à travers chaque étape du jeu interactif et découvrir les vulnérabilités cachées.

## 1. Page : `index.html` (Portail de Connexion GDA)

*   **Vulnérabilité :** `HTML_COMMENT` (Identifiants cachés dans un commentaire HTML).
*   **Solution :**
    1.  Ouvrez les outils de développement de votre navigateur (généralement avec F12) ou affichez le code source de la page (Ctrl+U ou Clic Droit > Afficher le code source).
    2.  Cherchez un commentaire HTML. Vous trouverez :
        ```html
        <!-- CRÉDENTIAUX DE TEST SYSTÈME GDA -->
        <!-- Nom d'utilisateur: omni-man -->
        <!-- Mot de passe: terre_priorite_un -->
        <!-- Veuillez supprimer ceci avant le déploiement en production - Cecil Stedman -->
        ```
    3.  Utilisez `omni-man` comme nom d'utilisateur et `terre_priorite_un` comme mot de passe dans le formulaire de connexion.

## 2. Page : `gda-hq.html` (Quartier Général de la GDA)

*   **Vulnérabilité 1 :** `CSS_HIDDEN` (Chemin URL vers la page suivante caché via CSS).
    *   **Solution :**
        1.  Utilisez les outils de développement du navigateur (Inspecter l'élément).
        2.  Recherchez un élément HTML qui pourrait être caché. Vous trouverez un `div` avec l'ID `hidden-path-container` qui a le style `position: absolute; left: -9999px; top: -9999px;`.
        3.  Le contenu de ce `div` (injecté par `script.js`) est "Accès secret au prochain niveau : `/terminal-viltrumite`".
        4.  Entrez `/terminal-viltrumite` dans le champ "Entrez le chemin d'accès secret".

*   **Vulnérabilité 2 :** `CONSOLE_LOG_HINT` (Indice pour un mot de passe futur révélé via `console.log`).
    *   **Solution :**
        1.  Cliquez sur le bouton "Activer Protocole d'Urgence Alpha-7".
        2.  Ouvrez la console du développeur (F12 ou Ctrl+Shift+I).
        3.  Un message apparaîtra dans la console : "Indice pour accès Viltrumite: Leur doctrine principale est souvent leur mot de passe le plus simple. Pensez à ce qui les définit le plus."

## 3. Page : `viltrumite-terminal.html` (Terminal Vaisseau Viltrumite)

*   **Vulnérabilité :** `WEAK_PASSWORD` (Mot de passe faible).
*   **Solution :**
    1.  Rappelez-vous l'indice de la console de la page précédente : "Leur doctrine principale est souvent leur mot de passe le plus simple."
    2.  Observez le texte sur la page : "Seuls les plus... **forts**... peuvent passer."
    3.  Le mot de passe à entrer est `force`.

## 4. Page : `robot-workshop.html` (Atelier Secret de Robot)

*   **Vulnérabilité :** `JS_OBFUSCATION_CALL` (Exécution d'une fonction JavaScript spécifique via la console).
*   **Solution :**
    1.  Lisez attentivement les indices sur la page, notamment l'extrait du journal de Robot qui mentionne un objet `robotControle` et une méthode `activerSequence`, ainsi que l'indice sur un plan de "contingence" de niveau "Zeta".
    2.  Ouvrez la console du développeur (F12).
    3.  Le nom de code du plan à utiliser comme paramètre est `plan_contingence_zeta`.
    4.  Exécutez la commande suivante dans la console :
        ```javascript
        robotControle.activerSequence('plan_contingence_zeta')
        ```

## 5. Page : `amber-message.html` (Message d'Amber)

*   **Vulnérabilité :** `SOCIAL_ENGINEERING` (Manipulation via message pour obtenir un mot-clé).
*   **Solution :**
    1.  Lisez attentivement le message d'Amber. Elle mentionne : "...celui où on s'est sentis vraiment... **invincibles**... ensemble pour la première fois ? Le mot de passe pour entrer, c'est ce sentiment lui-même."
    2.  Le mot-clé (mot de passe) à entrer est `invincible`.

## 6. Page : `sequid-archives.html` (Archives de l'Invasion Sequid)

*   **Vulnérabilité :** `IDOR_SIMULATION` (Accès à une ressource par devinette/manipulation d'ID).
*   **Solution :**
    1.  Considérez l'indice sur la page : "Indice : Le rapport le plus sensible concernerait la nature même de leur... **conscience collective**."
    2.  Observez le format des ID de rapports publics (ex: `rapport_incident_mars_001`).
    3.  Combinez l'indice et le format pour déduire l'ID du rapport confidentiel.
    4.  L'ID de rapport correct à entrer est `rapport_conscience_collective_sequid`.

## 7. Page : `victory.html` (Victoire !)

Félicitations ! Vous avez terminé l'entraînement et découvert toutes les failles. Cette page récapitule les vulnérabilités que vous avez trouvées.
