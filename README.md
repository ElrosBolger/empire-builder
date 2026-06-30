# 🏙️ Empire Builder - City Tycoon Game

Production-ready idle city tycoon game con anti-cheat server-side, prestige system e progressione lunga.

---

## 🚀 Quick Start (Bolt)

### 1️⃣ Importa da GitHub in Bolt

```
1. Vai su https://bolt.new
2. Clicca il menu (☰ in alto a sinistra)
3. Seleziona "Import from GitHub"
4. Incolla questo link:
   https://github.com/tuousername/empire-builder
5. Aspetta che carichi TUTTI i file
```

### 2️⃣ Crea .env.local

Nella root del progetto (dove vedi package.json), crea `.env.local`:

```
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Come prendere le credenziali:**
1. Vai su https://supabase.com
2. Apri il tuo progetto "empire-builder"
3. Settings → API
4. Copia PROJECT URL e ANON PUBLIC KEY

### 3️⃣ Clicca "Run"

Bolt dovrebbe compilare e avviare il gioco!

---

## 🛠️ Setup Locale (Alternativo)

```bash
# Clone
git clone https://github.com/tuousername/empire-builder
cd empire-builder

# Installa dipendenze
npm install

# Crea .env.local e riempilo con credenziali Supabase

# Avvia dev server
npm run dev

# Apri http://localhost:5173
```

---

## 📊 Struttura Progetto

```
empire-builder/
├── src/
│   ├── App.tsx                 # Main game component
│   ├── App.css                 # Styling
│   ├── supabaseClient.ts       # Connessione DB
│   ├── types.ts                # TypeScript types
│   ├── buildings.ts            # Configurazione edifici
│   ├── formatting.ts           # Utilità formattazione
│   ├── main.tsx               # Entry point
│   └── index.css              # Global CSS
├── .env.example               # Template env
├── .gitignore
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

---

## 🔐 Setup Supabase

### 1. Crea Progetto
- https://supabase.com
- Nuovo progetto: "empire-builder"

### 2. Esegui Schema SQL
```
1. SQL Editor in Supabase
2. Copia schema da: supabase_schema.sql
3. Esegui (Run button)
```

### 3. Configura Auth
```
1. Authentication → Sign In / Providers
2. Email: attiva lo switch ✅
3. Settings → Site URL: http://localhost:5173
```

### 4. Prendi API Keys
```
Settings → API
- PROJECT URL
- ANON PUBLIC KEY (sezione "Project API keys")
```

---

## 🎮 Come Giocare

### Login/Signup
```
1. Scrivi email
2. Scrivi password (min 6 caratteri)
3. Clicca "Sign Up" o "Sign In"
```

### Costruisci
```
1. Clicca bottone edificio (Casa, Negozio, ecc)
2. Denaro scende di conseguenza
3. Reddito aumenta ogni 30 sec
```

### Prestige & Reset
```
Quando raggiungi Lv10, Lv20, Lv30...
- Popup mostra scelta strategica
- OPZIONE A: Continua (prestige +)
- OPZIONE B: Resetta (prestige + nuovo tier)
```

---

## ⚖️ Equilibrio Finale

```
Prestige Gain:    -40% (3 vs 5 per Lv10)
Bonus Prestige:   -66% (0.05% vs 0.15%)
Progression:      200+ ore per endgame
Barriere:         Tier-locked (Negozi, Fabbriche)
Anti-Cheat:       Server verifica ogni azione
```

---

## 🚀 Deploy Vercel

```bash
# 1. Push su GitHub (se non fatto)
git push origin main

# 2. Vai su https://vercel.com
# 3. Import project da GitHub

# 4. In Vercel Settings → Environment Variables
# 5. Aggiungi:
#    - REACT_APP_SUPABASE_URL
#    - REACT_APP_SUPABASE_KEY

# 6. Deploy!
```

---

## 📚 Documentazione

Vedi i file nel repo:
- `README_COMPLETE.md` - Setup dettagliato
- `SUPABASE_SETUP_GUIDE.md` - Guida Supabase
- `EQUILIBRIO_PARAMETRI_FINALI.md` - Parametri di gioco
- `PRESTIGE_SEPARATO.md` - Spiegazione prestige system
- `supabase_schema.sql` - Schema database

---

## 🔧 Comandi

```bash
npm run dev      # Dev server (localhost:5173)
npm run build    # Build production
npm run preview  # Anteprima build
```

---

## ⚠️ Variabili Ambiente

Crea `.env.local` nella root:

```
REACT_APP_SUPABASE_URL=https://xxx.supabase.co
REACT_APP_SUPABASE_KEY=eyJ0eXAiOiJKV1QiLCJhbGc...
```

**NON committare `.env.local`!** (già in .gitignore)

---

## 🐛 Troubleshooting

### "Supabase connection failed"
- Controlla che URL e KEY siano giusti
- Verifica che Supabase project sia deployato
- Ricarica browser (F5)

### "Build error"
- Elimina `node_modules` e `dist`
- Copia file mancanti da src/
- Riavvia dev server

### "Sign up non funziona"
- Password > 6 caratteri?
- Email valida?
- Controlla Supabase → Authentication → Users

---

## 📝 License

MIT

---

## 🎯 Status

✅ Game mechanics
✅ Anti-cheat server-side
✅ Prestige system
✅ Database schema
✅ UI React
❌ Multiplayer leaderboard (prossimamente)
❌ Achievements (prossimamente)

---

**Buon divertimento!** 🏙️✨
