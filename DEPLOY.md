# L'Ombra PWA — Déploiement

## Option 1 : GitHub Pages (GRATUIT, recommandé)

```bash
# 1. Crée un repo GitHub
# Va sur github.com → New repository → "lombra-app" → Create

# 2. Pousse le code
cd lombra-pwa
git init
git add -A
git commit -m "L'Ombra PWA v1"
git remote add origin https://github.com/TON_USERNAME/lombra-app.git
git branch -M main
git push -u origin main

# 3. Active GitHub Pages
# → Settings → Pages → Source: "main" branch → /(root) → Save
# Attends 2 minutes, ton app sera sur :
# https://TON_USERNAME.github.io/lombra-app/
```

## Option 2 : Local sur ton réseau

```bash
# Depuis le dossier lombra-pwa
python3 -m http.server 8080
# Ouvre http://ADRESSE_IP_PC:8080 sur ton iPhone (même WiFi)
```

## Installation sur iPhone

1. Ouvre l'URL dans **Safari** (pas Chrome, obligatoire pour iOS)
2. Tape sur le **bouton de partage** ⬆️ (carré avec flèche)
3. Scrolle et tape **"Sur l'écran d'accueil"**
4. Nomme-le **"L'Ombra"** → Ajouter
5. L'app apparaît sur ton écran d'accueil avec son icône
6. Elle s'ouvre en plein écran comme une app native
7. Fonctionne OFFLINE après le premier chargement

## Structure des fichiers
```
lombra-pwa/
├── index.html     ← L'app complète
├── manifest.json  ← Config PWA
├── sw.js          ← Service worker (cache offline)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── DEPLOY.md      ← Ce fichier
```

忍 — Va.
