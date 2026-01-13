# 🚀 Déploiement Express - 10 minutes chrono !

## Étape 1 : Créer un compte Vercel (2 min)

1. Va sur **https://vercel.com**
2. Clique sur **"Sign Up"**
3. Connecte-toi avec ton **compte GitHub** (ou crée-en un, c'est gratuit)

---

## Étape 2 : Importer le projet (3 min)

### Option A : Via GitHub (recommandé)

1. Crée un repo GitHub pour ton portfolio :
   ```bash
   cd /Users/noah/.gemini/antigravity/scratch/noah-portfolio
   git init
   git add .
   git commit -m "Initial commit - Portfolio SEO"
   ```
2. Crée un nouveau repo sur github.com
3. Push ton code :
   ```bash
   git remote add origin https://github.com/TON-USERNAME/noah-portfolio.git
   git push -u origin main
   ```
4. Sur Vercel, clique **"Add New Project"** → **Import Git Repository**

### Option B : Upload direct (plus simple)

1. Sur Vercel, clique **"Add New Project"**
2. Choisis **"Upload"** (en bas)
3. Glisse-dépose le dossier `noah-portfolio`
4. Clique **"Deploy"**

---

## Étape 3 : Obtenir ton URL temporaire (1 min)

Vercel te donne une URL gratuite :
```
noah-portfolio-xyz.vercel.app
```

✅ **Ton site est EN LIGNE !**

---

## Étape 4 : Acheter le domaine (5 min)

### Option 1 : OVH (meilleur rapport qualité/prix)

1. Va sur **https://www.ovh.com/fr/domaines/**
2. Cherche `noah-scaillierez.fr`
3. Ajoute au panier → **6,99€/an**
4. Crée un compte et paie

### Option 2 : Ionos (promotion à 1€)

1. Va sur **https://www.ionos.fr/domaines**
2. Cherche `noah-scaillierez.fr`
3. Souvent **1€ la première année** (puis ~10€/an)

---

## Étape 5 : Connecter le domaine à Vercel (5 min)

1. Sur Vercel → Ton projet → **Settings** → **Domains**
2. Ajoute `noah-scaillierez.fr`
3. Vercel te donne les DNS à configurer :
   ```
   Type: A     → 76.76.21.21
   Type: CNAME → cname.vercel-dns.com
   ```
4. Sur OVH/Ionos → Zone DNS → Ajoute ces enregistrements
5. Attends 24-48h pour la propagation

---

## Étape 6 : Soumettre à Google (5 min)

1. Va sur **https://search.google.com/search-console**
2. Connecte-toi avec ton compte Google
3. Clique **"Ajouter une propriété"**
4. Choisis **"Domaine"** → Entre `noah-scaillierez.fr`
5. Google te donne un enregistrement TXT à ajouter dans ta zone DNS
6. Une fois vérifié :
   - Va dans **Sitemaps** → Ajoute `https://noah-scaillierez.fr/sitemap.xml`
   - Va dans **Inspection de l'URL** → Tape `https://noah-scaillierez.fr` → **Demander l'indexation**

---

## ✅ Checklist finale

- [ ] Compte Vercel créé
- [ ] Site déployé sur Vercel
- [ ] URL temporaire fonctionnelle
- [ ] Domaine acheté (~8€)
- [ ] DNS configurés
- [ ] Google Search Console configurée
- [ ] Sitemap soumis
- [ ] Page principale indexée

---

## 🔗 URLs importantes

| Service | URL |
|---------|-----|
| Vercel | https://vercel.com |
| GitHub | https://github.com |
| OVH Domaines | https://www.ovh.com/fr/domaines/ |
| Ionos Domaines | https://www.ionos.fr/domaines |
| Google Search Console | https://search.google.com/search-console |

---

## 📱 En attendant le domaine

Tu peux déjà utiliser l'URL Vercel (`xxx.vercel.app`) pour :
- Ton profil LinkedIn
- Envoyer aux recruteurs
- Postuler aux offres

Le domaine personnalisé rendra tout plus professionnel une fois actif !

---

> **Besoin d'aide ?** Dis-moi où tu es bloqué et je t'aide !
