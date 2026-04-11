// Shared shape used by both the GitHub-backed featured repos and any
// manually curated projects (private client work that doesn't live on GitHub).
// Kept in /lib so it can be imported from both server and client code without
// dragging server-only logic into the client bundle.

export interface FeaturedRepo {
  id: number;
  name: string;
  description: string;
  url: string | null;
  homepage: string | null;
  stars: number;
  language: string | null;
  languageColor: string;
  topics: string[];
}

// Projects delivered for clients whose source code isn't public on GitHub.
// These are rendered alongside real repos on the /projects page and surfaced
// as highlights in the home career grid.
export const OUT_OF_GITHUB_REPOS: FeaturedRepo[] = [
  {
    id: -1,
    name: "Grupo Boticário – Supplier Portal",
    description:
      "A web application to facilitate communication between suppliers and Grupo Boticário, integrating internal GB platforms with an external CMS for data consumption.",
    url: null,
    homepage: "https://fornecedores.grupoboticario.com.br/",
    stars: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["Next.js", "React", "TypeScript", "CMS"],
  },
  {
    id: -2,
    name: "Unimed Laboratório – Institutional Portal",
    description:
      "The application provides access to news, medical exams, vaccines, unit locations, and enables email-based communication with the public.",
    url: null,
    homepage: "https://www.unimedlab.com.br/",
    stars: 0,
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["Next.js", "React", "TypeScript", "CMS"],
  },
];
