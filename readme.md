URL git: [https://github.com/VladCiobotariu/Crozy](https://github.com/VladCiobotariu/Crozy)

# GHID RULARE LOCALĂ

## CERINȚE

- un cont Azure  
- două subscripții configurate: ex. Crozy Subscription Non-PROD și Crozy Subscription PROD

> Dacă nu ai un cont Azure, poți crea unul aici: [https://azure.microsoft.com](https://azure.microsoft.com)

---

## 1. Configurarea contului Azure

Pentru acest proiect ne vor trebui două organizații Azure: una pentru resursele propriu-zise și una pentru Azure B2C, pe care îl folosim pentru autentificare. Mai multe detalii aici:  
[https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops)

---

## 2. Autentificarea utilizatorilor

Configurarea Azure AD B2C Tenant:
1. Configurarea unei aplicații – ne vor trebui `client-id` și `secret`.
2. Configurarea unui user flow – de aici vom extrage mai multe variabile, care vor fi setate în aplicațiile noastre.

---

## 3. Resurse create manual

Majoritatea resurselor vor fi create cu ajutorul codului Bicep din folderul `crozy-iac`, care conține date despre fiecare resursă. Totuși, va trebui mai întâi să setăm niște variabile în Secret Manager, iar anumite resurse nu vor fi create automat, deoarece ele trebuie create o singură dată.

1. Vom avea nevoie de un Container Registry  
2. Vom avea nevoie de Azure Key Vault pentru secrets

În secrets vom seta următoarele variabile cu valorile specifice:

- `azure-b2c-client-secret-shop-app-prod`  
- `azure-b2c-client-secret-seller-app-prod`  
- `next-auth-secret-shop-app`  
- `next-auth-secret-seller-app`  
- `netopia-private-key-sandbox`  
- `netopia-public-key-sandbox`  
- `netopia-signature-sandbox`

---

## 4. Pornirea pipeline-urilor

În fiecare folder din proiect, dacă există un folder `cicd`, înseamnă că avem pipeline-uri automate de deployment.  
În fișierele de tip `variables.yml/yaml` vom avea variabilele pentru conectarea resurselor.  

În pasul 5 vom seta resursele pentru a se conecta, iar după aceea putem rula fiecare pipeline.

Pentru ușurință, putem porni pipeline-urile pentru front-end-uri. Acestea vor încărca imaginile în Container Registry.  
Alternativ, putem rula comenzi `docker` pentru a încărca manual imaginile în container, dar vor fi necesare mai multe permisiuni:  
[https://docs.docker.com/reference/cli/docker/image/push/](https://docs.docker.com/reference/cli/docker/image/push/)

Front-end-urile au fiecare un `Dockerfile` în root. Putem rula un `docker build` pentru a crea imaginile.

---

## 5. Pornirea resurselor automate

**Prerequisites:**

1. Azure CLI instalat:  
   [https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
2. Drepturile necesare pentru crearea tuturor resurselor  
3. Valori `latest tag` în Container Registry pentru aplicațiile frontend

Utilizând scriptul `deploy-env.ps1` din `crozy-iac`, schimbăm valorile subscripției non-PROD (dacă avem alte valori setate) și îl rulăm.

---

## 6. Baza de date local

Pentru a rula baza de date local, putem folosi următoarea comandă:

```bash
docker run --name crozy-local -e POSTGRES_PASSWORD=azuBIok32 -d -p 5432:5432 postgres
```

Mai apoi, putem rula proiectul `Crozy.DbMigration.App` din cadrul folderului `crozy-backend`. Acest proiect conține un fișier `onfig.example.json`.

Trebuie să creăm un fișier `config.json` cu datele specifice, unde să avem `create-database` în câmpul `action`.

⸻

## 7. Variabilele din backend

Va fi nevoie de mai multe variabile – acestea au fost create în pașii anteriori.
Proiectul `Crozy.GraphQLApi` folosește fișierul `local.settings.json`. Există un fișier sample în același folder.

Putem folosi acel fișier ca model și seta variabilele rămase, de la baza de date până la serviciul de trimitere email-uri.
Dacă nu știm de unde să preluăm variabilele din Azure, putem consulta proiectul `crozy-iac`:

- În fișierul `/crozy-iac/system/graphql-api.bicep`, între liniile 163–204, avem setate variabilele automat, fie din Key Vault, fie din ieșirile diferitelor module încărcate în Azure.

⸻

## 8. Pornirea logicii din spate (backend)

Pornirea se va face utilizând funcțiile din IDE-ul specific utilizat, poate fi Visual Studio, Visual Studio Code împreună cu configurarile specifice sau JetBrains Rider. Se va porni proiect `Crozy.GraphQLApi`. Se poate porni și utilizănd comanda `dotent run`.

⸻

## 9. Interfețele cu utilizatorul

Acestea pot fi ușor rulate cu:
```bash
npm i && npm run dev
```

Ca cerințe, trebuie doar să setăm variabilele în `.env.development`.
Există exemple în acele fișiere – trebuie doar să adăugăm variabilele specifice Azure B2C.

PS: Secretul pentru Next.js se generează astfel:
```bash
openssl rand -base64 32
```
