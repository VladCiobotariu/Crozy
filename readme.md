# GHID RULARE LOCALA

## CERINȚE

- un cont azure
- doua subscriptii configurate: ex. Crozy Subscription Non-PROD si Crozy Subscription PROD

> Dacă nu ai un cont Azure, poți crea unul aici: [https://azure.microsoft.com](https://azure.microsoft.com)

---

## 1. Configurarea contului azure

Pentru acest proiect ne va trebui doua organizatii azure, unul pentru resursele propriu zise, si unul pentru azure b2c pe care il folosim pentru autentificare. Mai multe detalii aici: [https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops)

---

## 2. Autentificarea utilizatorilor

Configurarea Azure AD B2C Tenant:
1. Configurarea unei aplicatii, ne va trebui client-id si secret.
2. Configurarea unui user flow, ne va trebui de aici mai multe variabile. Le vom seta in aplicatile noastre.

## 3. Resurse create manual

Majoritatea resurselor vor fi create cu ajutorul codului bicep din folderul "crozy-iac" care contine date despre fiecare resursa, dar ne va trebui mai intai niste variable in secret manager, iar anumite resurse nu le vom crea automat pentru ca ele vor fi create doar o singura data si atat.

1. Vom avea nevoie de un Container Registry
2. Vom avea nevoie de Azure Key Vault pentru secrets.

In secrets vom seta urmatoare variable cu valorile specifice:

'azure-b2c-client-secret-shop-app-prod'
'azure-b2c-client-secret-seller-app-prod'
'next-auth-secret-shop-app'
'next-auth-secret-seller-app'
'netopia-private-key-sandbox'
'netopia-public-key-sandbox'
'netopia-signature-sandbox'

## 4. Pornirea pipeline-urile

In fiecare folder din proiect daca exista un folder "cicd" inseamna ca avem pipeline-uri automate de deployment.
In fisierele de tip variables.yml/yaml vom avea variabilele pentru conectarea resurselor
In pasul 5 vom seta resursele pentru a se conecta. Iar dupa aia putem rula fiecare pipeline.

Pentru usurinta putem porni pipeline-urile pentru front-end-uri. Aceste vor incarca imaginile in container registry.
Sau putem rula comenzi docker pentru a incarca manual in container, dar vom avea de mai multe permisiuni [https://docs.docker.com/reference/cli/docker/image/push/](https://docs.docker.com/reference/cli/docker/image/push/)

Front-endurile au fiecare un Dockerfile in root, putem rula un docker build pentru a crea imaginile.

## 5. Pornirea resurselor automate

Prerequisites: 

1. Azure CLI installed [https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
2. Drepturile necesare pentru crearea tuturor resurselor
3. Valori latest tag in Container registry pentru aplicatile frontend

Utilizand scriptul deploy-env.ps1 din crozy-iac, schimbam valorile subscriptiei non prod daca avem alta valoare setate si il rulam.

## 6. Baza de date local

Pentru a rula baza de date local putem folosi urmatoarea comanda:
```bash
docker run --name crozy-local -e POSTGRES_PASSWORD=azuBIok32 -d -p 5432:5432 postgres
```

Mai apoi putem rula proiectul `Crozy.DbMigration.App` din cadrul folder-ului "crozy-backend". Avem in acest proiect un `config.example.json` 
Noi trebuie sa facem un `config.json` cu datele specifice, trebuie sa avem `create-database`, in campul `action`.

## 7. Variabilele din backend

Se vor trebui mai multe variabile. Acestea au fost create in pasii anteriori. Proiectul `Crozy.GraphQLApi` are variabilele in fisierul:
`local.settings.json`. Noi avem un sample in acelasi folder. Ne putem folosi de el si seta restul de variabile de la baza de date la serviciul de trimis email-uri. Daca nu stim de unde sa luam variabilele din azure ne putem folosi de proiectul `crozy-iac`. In fisierul: `/crozy-iac/system/graphql-api.bicep` la liniile 163-204 avem setate variabilele automat, fie din Key Vault fie iesirile diferitelor module incarcare in azure.

## 8. Interfetele cu utilizatorul

Ele pot fi usor rulate cu ajutorul unui
```bash
npm i && npm run dev
```

Ca si cerinte vom avea doar setarea variabilele in .env.devlopment, avem exemple in aceste fisiere, vom avea nevoie doar de setarea variabilele specifice Azure B2C.

PS: next-js secret se geenereaza asa:
```bash
openssl rand -base64 32
```

Acum avem un proiect complet functional!