## Balance Simulator – METTLER TOLEDO XP6U

Simulateur logiciel d’une balance de précision **METTLER TOLEDO XP6U**, destiné uniquement au **développement** et aux **tests** d’applications (par exemple une application WPF en C#), sans connexion à un matériel réel.

Ce projet permet de tester :
- **l’acquisition de poids en continu**
- **la gestion des états stable / instable**
- **la fonction de tare**
- **l’intégration avec une application cliente via HTTP**

⚠️ **Ce simulateur n’est pas un outil métrologique et ne remplace pas une balance réelle.**

---

### 🎯 Objectif du projet

Dans un contexte industriel sensible (ex. laboratoire), le matériel réel n’est pas toujours disponible ou ne doit pas être manipulé pendant le développement.

Ce simulateur permet de :
- **développer et tester la logique d’acquisition**
- **éviter les allers-retours en laboratoire**
- **sécuriser le développement avant l’intégration matérielle finale**

---

### 🧰 Fonctionnalités

- **Simulation d’une balance METTLER TOLEDO XP6U**
- **Génération de poids avec** :
  - bruit
  - dérive
  - état stable / instable
- **API HTTP simple** pour intégration logicielle
- **Interface web basique** pour piloter la simulation
- **Mise à jour périodique du poids** (ex. toutes les 200 ms)

---

### 📡 API HTTP

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

### 🖥️ Interface Web

L’interface web permet de :
- **définir le poids de base**
- **activer / désactiver le bruit**
- **basculer stable / instable**
- **appliquer la tare**
- **visualiser le poids en temps réel**

Elle est destinée au test uniquement (**pas d’UI industrielle**).

---

### 🚀 Lancer le simulateur en local

- **Prérequis**
  - **Node.js** (version portable possible, sans droits administrateur)

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
  - **Interface web** : `http://localhost:5050`
  - **API** : `http://localhost:5050/weight`

---

### 🔌 Intégration avec une application WPF (C#)

Ce simulateur est conçu pour être consommé par une application cliente (ex. WPF) via HTTP.

Exemple d’usage :
- appel périodique à **GET `/weight`**
- traitement du flux comme une acquisition réelle
- remplacement ultérieur par une **communication série** (COM / MT-SICS)

👉 **La logique métier ne dépend pas du simulateur.**

---

### 🏗️ Architecture recommandée côté client

```text
UI / ViewModel
      ↓
IBalanceSource
 ├── HttpBalanceSource   (simulation)
 └── ComBalanceSource    (balance réelle – plus tard)
```

---

### 📌 Limites connues

- **Pas de port série / COM**
- **Pas d’implémentation réelle du protocole MT-SICS**
- **Simulation volontairement simplifiée**

Ces limites sont assumées et cohérentes avec l’objectif de test.

---

### 📄 Utilisation académique / industrielle

Ce simulateur peut être utilisé pour :
- **projets académiques**
- **PFE / stage**
- **prototypage logiciel**
- **validation d’architecture**

**Phrase type pour un rapport** :

> Une balance METTLER TOLEDO XP6U a été simulée via une application web afin de valider l’acquisition des mesures sans interaction avec les équipements de laboratoire.

---

### 📜 Licence

Projet fourni à des fins **pédagogiques** et de **test**.
