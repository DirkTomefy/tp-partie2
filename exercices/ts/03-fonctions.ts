/*
 * 03 — FONCTIONS TYPÉES
 */
import type { Plat } from './02-interfaces.ts';

// A. Paramètre par défaut.
//    formatPrix(500) -> "500 Ar"      formatPrix(2, '€') -> "2 €"
export function formatPrix(montant: number, devise: string = 'Ar'): string {
  return `${montant} ${devise}`;
  // TODO : ajoutez les paramètres (montant, devise valant 'Ar' par défaut)
}

// B. Paramètre facultatif.
//    Renvoie les plats dont le nom contient « mot » (sans tenir compte des majuscules).
//    Si seulementDisponibles vaut true, ne garde que les plats disponibles.
export function rechercher(plats: Plat[], mot: string, seulementDisponibles: boolean = false): Plat[]{
  return plats.filter(plat => {
    const nomMatch = plat.nom.toLowerCase().includes(mot.toLowerCase());
    const disponibleMatch = !seulementDisponibles || plat.disponible;
    return nomMatch && disponibleMatch;
  });
  // TODO : implémenter la recherche
}

// C. Type union et rétrécissement (narrowing).
//    versNombre('6000.00') -> 6000      versNombre(12) -> 12
//    Utilisez  typeof valeur === 'string'  pour distinguer les deux cas.
export function versNombre(valeur: number | string): number {
  if(typeof valeur === 'string'){
    return Number(valeur);
  }
  return valeur;
  // TODO
}
