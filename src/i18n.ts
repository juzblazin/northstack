export const langs = ['en', 'fr'] as const
export type Lang = (typeof langs)[number]

export function isLang(v: string): v is Lang {
  return (langs as readonly string[]).includes(v)
}

const fr: Record<string, string> = {
  'Guides': 'Guides',
  'Provinces': 'Provinces',
  'Tools': 'Outils',
  'All guides': 'Tous les guides',
  'All provinces': 'Toutes les provinces',
  'All tools': 'Tous les outils',
  'Free tools': 'Outils gratuits',
  'Check compliance': 'Vérifier la conformité',
  'Resources': 'Ressources',
  'Company': 'Entreprise',
  'Contact': 'Contact',
  'Read guide': 'Lire le guide',
  'Browse': 'Parcourir',
  'Open tool': "Ouvrir l'outil",
  'Quick answer': 'Réponse rapide',
  'FAQ': 'FAQ',
  'Related guides': 'Guides connexes',
  'Latest guides': 'Nouveaux guides',
  'Home': 'Accueil',
  'Back to guides': 'Retour aux guides',
  'min read': 'min de lecture',
  'Estimate your stack cost': "Estimez le coût de votre stack",
  'Check your compliance': 'Vérifiez votre conformité',
  'Join the briefing': "S'abonner à l'infolettre",
  'Subscribe': "S'abonner",
  'Copy checklist': 'Copier la liste',
  'Copied!': 'Copié !',
  'Provincial hub': 'Hub provincial',
  'Quick facts': 'Faits en bref',
  'Your stack': 'Votre stack',
  'Estimated monthly': 'Total mensuel estimé',
  'Team size': "Taille de l'équipe",
  'English': 'Français',
}

const frPages: Record<string, Record<string, string>> = {
  home: {
    kicker: 'Portail de ressources pour PME canadiennes',
    title1: 'Answers for the questions',
    title2: 'Canadian founders.',
    sub: "Des réponses directes et provinciales aux questions fiscales, logicielles et de financement que les PME canadiennes posent vraiment — avec des outils gratuits pour calculer et vérifier.",
    cta1: 'Parcourir les guides',
    cta2: 'Vérifier la conformité',
    pillarsK: 'Piliers de contenu',
    pillarsT: 'Quatre sujets. Zéro jargon.',
    pillarsS: 'Chaque pilier répond à un besoin précis des PME canadiennes — écrit pour être lu en cinq minutes.',
    guidesK: 'Derniers guides',
    guidesT: 'Les guides.',
    provincesK: 'Hubs provinciaux',
    provincesT: 'Les règles changent à la frontière.',
    provincesS: 'Taxes de vente, organismes de paie et subventions sont provinciaux. Ces hubs remettent les règles au clair.',
    toolsK: 'Outils gratuits',
    toolsT: "L'utile bat le téléchargeable.",
    toolsS: 'Pas de courriel requis. Choisissez votre province, vos forfaits, et obtenez un chiffre sur lequel agir.',
    faqK: 'FAQ',
    faqT: 'Questions fréquentes.',
    ctaT: 'Nouveaux guides, dès leur parution.',
    ctaS: 'Un courriel pratique par mois — seuils, subventions, choix de stack. Pas de blabla.',
  },
  provinces: { k: 'Hubs provinciaux', t: 'Les règles changent à la frontière.', s: 'Taxes de vente, organismes de paie et subventions sont provinciaux. Choisissez votre province.' },
  tools: { k: 'Outils gratuits', t: "L'utile bat le téléchargeable.", s: 'Pas de courriel requis — choisissez et calculez.' },
}

export function t(lang: Lang, s: string): string {
  return lang === 'fr' ? (fr[s] ?? s) : s
}

export function tp(lang: Lang, page: keyof typeof frPages, key: string, fallback: string): string {
  return lang === 'fr' ? (frPages[page][key] ?? fallback) : fallback
}
