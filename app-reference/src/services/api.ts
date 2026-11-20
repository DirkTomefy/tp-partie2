/*
 * Tous les appels à l'API passent par ce fichier.
 * Les pages n'utilisent jamais fetch() directement.
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
import type { Categorie, Commande, NouvelleCommande, Plat } from '../types/gargote';

export class ErreurApi extends Error {
  constructor(
    message: string,
    public statut: number,
    public details: Record<string, string> = {},
  ) {
    super(message);
  }
}

async function requete(chemin: string, options = {}) {
  const reponse = await fetch(BASE_URL + chemin, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const donnees = reponse.status === 204 ? null : await reponse.json();

  if (!reponse.ok) {
    const erreur = new ErreurApi(donnees?.message ?? `Erreur HTTP ${reponse.status}`, reponse.status, donnees?.erreurs ?? {});
    throw erreur;
  }
  return donnees;
}

export default {
  getCategories() {
    return requete('/categories');
  },

  getPlats(categorieId : number | null = null) {
    return requete(categorieId ? `/plats?categorie=${categorieId}` : '/plats');
  },

  getPlat(id : number) {
    return requete(`/plats/${id}`);
  },

  getCommandes() {
    return requete('/commandes');
  },

  creerCommande(commande: NouvelleCommande) {
    return requete('/commandes', { method: 'POST', body: JSON.stringify(commande) });
  },
};
