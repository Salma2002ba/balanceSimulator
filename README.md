## Balance Simulator – METTLER TOLEDO XP6U

Simulateur logiciel d’une balance de précision **METTLER TOLEDO**, destiné uniquement au **développement** et aux **tests** d’applications.

Ce projet permet de tester :
- **l’acquisition de poids en continu**
- **la gestion des états stable / instable**
- **la fonction de tare**
- **l’intégration avec une application cliente via HTTP**


---

### Objectif

Fournir un simulateur de balance pour développer et tester la logique d’acquisition sans utiliser le matériel réel (ex. en laboratoire), afin de limiter les contraintes matérielles et sécuriser le développement avant l’intégration finale.

---

### Fonctionnalités

- **Simulation d’une balance METTLER TOLEDO XP6U**
- **Génération de poids avec** :
  - bruit
  - dérive
  - état stable / instable
- **API HTTP simple** pour intégration logicielle
- **Interface web basique** pour piloter la simulation
- **Mise à jour périodique du poids** (ex. toutes les 200 ms)

---

### API HTTP

- **GET `/weight`**  
  Retourne le poids simulé courant.

```json
{
  "value": 12.345,
  "unit": "g",
  "stable": true,
  "timestamp": "2026-01-28T11:45:00Z"
}
```

- **POST `/tare`**  
  Applique la tare (remise à zéro du poids).

- **GET `/info`**  
  Informations sur la balance simulée.

```json
{
  "manufacturer": "METTLER TOLEDO",
  "model": "XP6U",
  "protocol": "MT-SICS (simulé)",
  "note": "Simulation logicielle uniquement"
}
```

---

### Interface web

L’interface web permet de :
- définir le poids de base
- activer / désactiver le bruit
- basculer stable / instable
- appliquer la tare
- visualiser le poids en temps réel

Elle est destinée au test uniquement (**pas d’UI industrielle**).

---

### Lancer le simulateur en local

- **Prérequis**
  - Node.js (version portable possible, sans droits administrateur)

- **Installation**

```bash
npm install
```

- **Démarrage**

```bash
npm run dev
# ou
node server.js
```

- **Accès**
  - Interface web : `http://localhost:5050`
  - API : `http://localhost:5050/weight`

---

### Intégration avec une application WPF (C#)

Ce simulateur est conçu pour être consommé par une application cliente (par exemple WPF) via HTTP.

Exemple d’usage :
- appel périodique à **GET `/weight`**
- traitement du flux comme une acquisition réelle
- remplacement ultérieur par une communication série (COM / MT-SICS)

La logique métier ne dépend pas du simulateur.

---

### Limites

- pas de port série / COM
- pas d’implémentation réelle du protocole MT-SICS
- simulation volontairement simplifiée

---

### Licence

Projet fourni à des fins pédagogiques et de test.
