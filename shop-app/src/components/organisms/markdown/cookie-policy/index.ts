export type TableData = {
    name: string;
    provider: string;
    category: string;
    type: string;
    lifespan: string;
    description: string;
}

export const columns : string[] = [
    "Nume", "Furnizor", "Categorie", "Tip", "Durata", "Descriere"
]

export const data: TableData[] = [
    {name: "__Secure-authjs.callback-url", provider: "crozy", category: "Necesar", type: "Sesiune", lifespan: "Până la inchiderea sesiunii", description: "Înregistrează un url pentru redirectarea la log-out a user-ului."},
    {name: "__Host-authjs.csrf-token", provider: "crozy", category: "Necesar", type: "Sesiune", lifespan: "Până la inchiderea sesiunii", description: "Înregistrează token-ul CSRF care este prezent pentru autentificare."},
    {name: "__Secure-authjs.session-token.#", provider: "crozy", category: "Necesar", type: "Persistent", lifespan: "1 lună", description: "Înregistrează token-ul cu care user-ul când este logat accesează funcționalitățile. Poate fi împărțit în două cookie-uri."},
    {name: "ARRAffinity", provider: "crozy", category: "Necesar", type: "Sesiune", lifespan: "Până la inchiderea sesiunii", description: "Asigură ca în timpul sesiuni de navigare, cererile de pagină ale vizitatorului sunt redirecționate către același server. A fost înlocuit de SameSite dar este ținut pentru backwards compatibility."},
    {name: "ARRAffinitySameSite", provider: "crozy", category: "Necesar", type: "Sesiune", lifespan: "Până la inchiderea sesiunii", description: "Asigură ca în timpul sesiuni de navigare, cererile de pagină ale vizitatorului sunt redirecționate către același server."},
    {name: "CookieConsent", provider: "crozy", category: "Necesar", type: "Persistent", lifespan: "1 an", description: "Reține consimţământul utilizatorului pentru utilizarea de cookie-uri."},
] 