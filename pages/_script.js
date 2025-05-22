// --- CONSTANTS ---
const APP_TITLE = "Invincible: Faille de Sécurité";
const FOLDER_NAME = "pages/";

const PAGE_PATHS = {
  LOGIN: `${FOLDER_NAME}index.html`,
  GDA_HQ: `${FOLDER_NAME}gda-hq.html`,
  VILTRUMITE_TERMINAL: `${FOLDER_NAME}viltrumite-terminal.html`,
  ROBOT_WORKSHOP: `${FOLDER_NAME}robot-workshop.html`,
  AMBER_MESSAGE: `${FOLDER_NAME}amber-message.html`,
  SEQUID_ARCHIVES: `${FOLDER_NAME}sequid-archives.html`,
  VICTORY: `${FOLDER_NAME}victory.html`
};

const ERROR_MESSAGES = {
  LOGIN_FAILED: "Accès refusé. Vos identifiants sont aussi faibles qu'une vie humaine.",
  GDA_PATH_INCORRECT: "Ce chemin ne mène nulle part. Seuls les agents autorisés connaissent les vraies issues.",
  TERMINAL_ACCESS_DENIED: "Systèmes Viltrumites rejettent votre tentative pathétique. Seuls les forts (ou les évidents) peuvent passer.",
  ROBOT_ACCESS_DENIED: "Séquence de Robot incorrecte. Ses protocoles sont plus complexes que ça.",
  SOCIAL_ENGINEERING_FAIL: "Amber ne vous ferait pas confiance avec cette réponse. Essayez de penser comme Mark pour une fois.",
  SEQUID_ARCHIVE_NOT_FOUND: "ID de rapport inconnu. Les secrets des Sequids restent cachés.",
  GENERIC_INPUT_ERROR: "Entrée invalide. Même Allen l'Extraterrestre ferait mieux."
};

const VulnerabilityType = {
  HTML_COMMENT: "Identifiants cachés dans un commentaire HTML",
  CSS_HIDDEN: "Information sensible (chemin URL) cachée via CSS",
  CONSOLE_LOG_HINT: "Indice pour mot de passe révélé via console.log",
  WEAK_PASSWORD: "Mot de passe faible sur système 'sécurisé'",
  JS_OBFUSCATION_CALL: "Exécution d'une fonction JavaScript spécifique via la console",
  SOCIAL_ENGINEERING: "Manipulation via message pour obtenir un mot-clé",
  IDOR_SIMULATION: "Accès à une ressource par devinette/manipulation d'ID (IDOR simulé)",
};

const HIDDEN_GDA_PATH = "/terminal-viltrumite";
const ROBOT_CONTINGENCY_CODE = "plan_contingence_zeta";
const CORRECT_SEQUID_REPORT_ID = "rapport_conscience_collective_sequid";


// --- LOCALSTORAGE HELPER FUNCTIONS ---
const VULNERABILITIES_KEY = 'invincibleAppVulnerabilities';

function getDiscoveredVulnerabilities() {
  const stored = localStorage.getItem(VULNERABILITIES_KEY);
  return stored ? JSON.parse(stored) : [];
}

function addDiscoveredVulnerability(vulnerability) {
  const vulnerabilities = getDiscoveredVulnerabilities();
  if (!vulnerabilities.find(v => v.type === vulnerability.type && v.pageName === vulnerability.pageName)) {
    vulnerabilities.push(vulnerability);
    localStorage.setItem(VULNERABILITIES_KEY, JSON.stringify(vulnerabilities));
  }
}

function isVulnerabilityDiscovered(pageName, type) {
  const vulnerabilities = getDiscoveredVulnerabilities();
  return vulnerabilities.some(v => v.pageName === pageName && v.type === type);
}

function resetVulnerabilities() {
  localStorage.removeItem(VULNERABILITIES_KEY);
}

// --- UI HELPER FUNCTIONS ---
function displayError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
  } else {
    console.warn(`displayError: Element with ID '${elementId}' not found.`);
  }
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = '';
  }
}

function navigateTo(pageUrl) {
  window.location.href = pageUrl;
}

// --- PAGE INITIALIZATION FUNCTIONS ---

function initLoginPage() {
  console.log("Journal système GDA: Initialisation du portail de connexion. Tous les accès sont surveillés.");
  const form = document.getElementById('login-form');
  if (form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      clearError('error-message');
      const username = event.target.username.value;
      const password = event.target.password.value;

      if (username === 'omni-man' && password === 'terre_priorite_un') {
        if (!isVulnerabilityDiscovered("Portail de Connexion GDA", VulnerabilityType.HTML_COMMENT)) {
          addDiscoveredVulnerability({
            pageName: "Portail de Connexion GDA",
            type: VulnerabilityType.HTML_COMMENT,
            description: "Identifiants (omni-man / terre_priorite_un) trouvés dans un commentaire HTML.",
            howToFind: "Inspecter le code source de la page (Ctrl+U ou Clic droit > Afficher le code source) et chercher des commentaires HTML."
          });
        }
        navigateTo(PAGE_PATHS.GDA_HQ);
      } else {
        displayError('error-message', ERROR_MESSAGES.LOGIN_FAILED);
      }
    });
  }
}

function initGdaHqPage() {
  console.log("Système de navigation du QG de la GDA chargé. Certaines informations sont classifiées.");
  const hiddenPathContainer = document.getElementById('hidden-path-container');
   if (hiddenPathContainer) {
     hiddenPathContainer.textContent = `Accès secret au prochain niveau : ${HIDDEN_GDA_PATH}`;
   }

  const pathForm = document.getElementById('path-form');
  if (pathForm) {
    pathForm.addEventListener('submit', function(event) {
      event.preventDefault();
      clearError('error-message');
      const pathInput = event.target.pathInput.value;

      if (pathInput === HIDDEN_GDA_PATH) {
        if (!isVulnerabilityDiscovered("Quartier Général de la GDA", VulnerabilityType.CSS_HIDDEN)) {
          addDiscoveredVulnerability({
            pageName: "Quartier Général de la GDA",
            type: VulnerabilityType.CSS_HIDDEN,
            description: `Le chemin vers le terminal (${HIDDEN_GDA_PATH}) était caché dans un élément HTML stylisé pour être invisible.`,
            howToFind: "Utiliser les outils de développement (Inspecter l'élément) pour trouver des éléments cachés par CSS (ex: display:none, position absolute hors écran, couleur identique au fond)."
          });
        }
        navigateTo(PAGE_PATHS.VILTRUMITE_TERMINAL);
      } else {
        displayError('error-message', ERROR_MESSAGES.GDA_PATH_INCORRECT);
      }
    });
  }

  const emergencyButton = document.getElementById('emergency-protocol-button');
  if (emergencyButton) {
    emergencyButton.addEventListener('click', function() {
      console.log("PROTOCOLE D'URGENCE ALPHA-7 ACTIVÉ. Journal système GDA:");
      console.log("Indice pour accès Viltrumite: Leur doctrine principale est souvent leur mot de passe le plus simple. Pensez à ce qui les définit le plus.");
      if (!isVulnerabilityDiscovered("Quartier Général de la GDA", VulnerabilityType.CONSOLE_LOG_HINT)) {
         addDiscoveredVulnerability({
          pageName: "Quartier Général de la GDA",
          type: VulnerabilityType.CONSOLE_LOG_HINT,
          description: "Un indice pour le mot de passe du terminal Viltrumite a été révélé dans la console après avoir cliqué sur un bouton.",
          howToFind: "Ouvrir la console du développeur (F12 ou Ctrl+Shift+I), interagir avec les éléments de la page (ex: bouton 'Protocole d'Urgence'), et observer les messages."
        });
      }
      alert("Protocole d'urgence Alpha-7 activé. Vérifiez les journaux système pour plus de détails.");
    });
  }
}

function initViltrumiteTerminalPage() {
  console.log("Terminal Viltrumite en ligne. Attente d'authentification. Seuls les Viltrumites purs peuvent accéder.");
  const terminalForm = document.getElementById('terminal-form');
  const correctPassword = "force";

  if (terminalForm) {
    terminalForm.addEventListener('submit', function(event) {
      event.preventDefault();
      clearError('error-message');
      const password = event.target.viltrumitePassword.value;

      if (password.toLowerCase() === correctPassword) {
        if (!isVulnerabilityDiscovered("Terminal Vaisseau Viltrumite", VulnerabilityType.WEAK_PASSWORD)) {
          addDiscoveredVulnerability({
            pageName: "Terminal Vaisseau Viltrumite",
            type: VulnerabilityType.WEAK_PASSWORD,
            description: `Le mot de passe du terminal Viltrumite était faible ('${correctPassword}') et basé sur leur idéologie principale.`,
            howToFind: "Utiliser les indices des pages précédentes (console.log) ou des messages sur la page actuelle pour deviner un mot de passe thématique et commun."
          });
        }
        navigateTo(PAGE_PATHS.ROBOT_WORKSHOP); // Modifié pour aller à l'atelier de Robot
      } else {
        displayError('error-message', ERROR_MESSAGES.TERMINAL_ACCESS_DENIED);
      }
    });
  }
}

// NOUVELLE PAGE : Atelier de Robot
function initRobotWorkshopPage() {
  console.log("Atelier de Robot: Systèmes en ligne. Interface de contrôle des protocoles accessible.");
  clearError('error-message'); // Clear any previous error message that might persist if user navigates back

  // Rendre l'objet et la fonction accessibles globalement pour la console
  window.robotControle = {
    activerSequence: function(code) {
      clearError('error-message');
      if (typeof code !== 'string') {
        console.error("Erreur Robot Systeme: Le code de séquence doit être une chaîne de caractères.");
        displayError('error-message', "Format de code invalide. Robot attend une chaîne de caractères.");
        return "ERREUR : Format de code invalide.";
      }
      if (code === ROBOT_CONTINGENCY_CODE) {
        console.log(`Code '${code}' accepté. Séquence de contingence activée. Accès accordé.`);
        if (!isVulnerabilityDiscovered("Atelier Secret de Robot", VulnerabilityType.JS_OBFUSCATION_CALL)) {
          addDiscoveredVulnerability({
            pageName: "Atelier Secret de Robot",
            type: VulnerabilityType.JS_OBFUSCATION_CALL,
            description: `Accès obtenu en appelant la fonction 'robotControle.activerSequence("${ROBOT_CONTINGENCY_CODE}")' depuis la console.`,
            howToFind: "Inspecter le code source ou les messages de la page pour trouver des objets/fonctions JavaScript accessibles globalement. Exécuter la fonction avec le bon paramètre (trouvé via des indices) dans la console."
          });
        }
        navigateTo(PAGE_PATHS.AMBER_MESSAGE);
        return "SUCCÈS : Séquence activée. Redirection...";
      } else {
        console.warn(`Code '${code}' incorrect. Séquence non activée.`);
        displayError('error-message', ERROR_MESSAGES.ROBOT_ACCESS_DENIED);
        return "ERREUR : Code de séquence incorrect.";
      }
    }
  };
  console.log("Interface 'robotControle' initialisée. Utilisez robotControle.activerSequence('code_secret') pour continuer.");
}


function initAmberMessagePage() {
  console.log("Canal de communication sécurisé ouvert. Nouveau message reçu.");
  const amberForm = document.getElementById('amber-form');
  const correctKeyword = "invincible";

  if (amberForm) {
    amberForm.addEventListener('submit', function(event) {
      event.preventDefault();
      clearError('error-message');
      const keyword = event.target.socialKeyword.value;

      if (keyword.toLowerCase() === correctKeyword) {
        if (!isVulnerabilityDiscovered("Message d'Amber", VulnerabilityType.SOCIAL_ENGINEERING)) {
          addDiscoveredVulnerability({
            pageName: "Message d'Amber",
            type: VulnerabilityType.SOCIAL_ENGINEERING,
            description: `Le mot-clé pour progresser ('${correctKeyword}') a été obtenu en interprétant un message contextuel (ingénierie sociale).`,
            howToFind: "Lire attentivement les messages et le contexte pour déduire une information ou un mot-clé qui n'est pas explicitement donné, mais suggéré."
          });
        }
        navigateTo(PAGE_PATHS.SEQUID_ARCHIVES); // Modifié pour aller aux archives Sequid
      } else {
        displayError('error-message', ERROR_MESSAGES.SOCIAL_ENGINEERING_FAIL);
      }
    });
  }
}

// NOUVELLE PAGE : Archives Sequid
function initSequidArchivesPage() {
  console.log("Archives Sequid: Accès à la base de données. Recherche de rapport en cours.");
  const archiveForm = document.getElementById('archive-form');

  if (archiveForm) {
    archiveForm.addEventListener('submit', function(event) {
      event.preventDefault();
      clearError('error-message');
      const archiveId = event.target.archiveId.value;

      if (archiveId.toLowerCase() === CORRECT_SEQUID_REPORT_ID) {
        if (!isVulnerabilityDiscovered("Archives de l'Invasion Sequid", VulnerabilityType.IDOR_SIMULATION)) {
          addDiscoveredVulnerability({
            pageName: "Archives de l'Invasion Sequid",
            type: VulnerabilityType.IDOR_SIMULATION,
            description: `Accès au rapport confidentiel Sequid ('${CORRECT_SEQUID_REPORT_ID}') en devinant/manipulant l'ID du rapport.`,
            howToFind: "Identifier des motifs dans les ID de ressources publiques, chercher des indices sur les noms de fichiers sensibles, puis essayer d'accéder à ces ressources en modifiant directement les paramètres ou les identifiants."
          });
        }
        navigateTo(PAGE_PATHS.VICTORY);
      } else {
        displayError('error-message', ERROR_MESSAGES.SEQUID_ARCHIVE_NOT_FOUND);
      }
    });
  }
}


function initVictoryPage() {
  const vulnerabilitiesList = document.getElementById('vulnerabilities-list');
  const discovered = getDiscoveredVulnerabilities();

  if (vulnerabilitiesList) {
    if (discovered.length > 0) {
      // Trier les vulnérabilités pour un affichage cohérent si nécessaire
      // Pour l'instant, elles s'affichent dans l'ordre de découverte
      vulnerabilitiesList.innerHTML = ''; // Clear previous list items
      discovered.forEach(vuln => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${vuln.pageName} - ${vuln.type}:</strong>
          <p>${vuln.description}</p>
          <p class="how-to"><em>Comment trouver : ${vuln.howToFind}</em></p>
        `;
        vulnerabilitiesList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.textContent = "Aucune faille découverte ou suivi désactivé. Étrange...";
      vulnerabilitiesList.appendChild(listItem);
    }
  }

  const restartButton = document.getElementById('restart-button');
  if (restartButton) {
    restartButton.addEventListener('click', function() {
      resetVulnerabilities();
      navigateTo(PAGE_PATHS.LOGIN);
    });
  }
}


// --- GLOBAL INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Page specific initializations
  const bodyId = document.body.id;
  console.log(`Initializing page with body ID: ${bodyId}`);

  if (bodyId === 'login-page') {
    initLoginPage();
  } else if (bodyId === 'gda-hq-page') {
    initGdaHqPage();
  } else if (bodyId === 'viltrumite-terminal-page') {
    initViltrumiteTerminalPage();
  } else if (bodyId === 'robot-workshop-page') {
    initRobotWorkshopPage();
  } else if (bodyId === 'amber-message-page') {
    initAmberMessagePage();
  } else if (bodyId === 'sequid-archives-page') {
    initSequidArchivesPage();
  } else if (bodyId === 'victory-page') {
    initVictoryPage();
  } else {
    console.warn("Aucune fonction d'initialisation spécifique pour cette page ID:", bodyId);
  }
});