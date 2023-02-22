import { IPizzaGrupo, IPizzaSabor } from "@models/pizza";

export function sortFlavoursByName(a: IPizzaSabor, b: IPizzaSabor) {
  return a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0;
}

export function flavourMidValue(sabor: IPizzaSabor) {
  return (
    sabor.valores.reduce((max, curr) => max + curr.valor, 0) /
    sabor.valores.length
  );
}

export function sortFlavoursByMidValue(a: IPizzaSabor, b: IPizzaSabor) {
  const va = flavourMidValue(a);
  const vb = flavourMidValue(b);

  return va > vb ? 1 : vb > va ? -1 : 0;
}
export function groupMidValue(sabores: IPizzaSabor[]) {
  return (
    sabores.reduce((max, curr) => max + flavourMidValue(curr), 0) /
    sabores.length
  );
}

export function sortGroupsByMidValue(a: IPizzaGrupo, b: IPizzaGrupo) {
  const va = groupMidValue(a.sabores as IPizzaSabor[]);
  const vb = groupMidValue(b.sabores as IPizzaSabor[]);

  return va > vb ? 1 : vb > va ? -1 : 0;
}

export function sortGroupsByFlavoursLength(a: IPizzaGrupo, b: IPizzaGrupo) {
  const va = (a.sabores as IPizzaSabor[]).length;
  const vb = (b.sabores as IPizzaSabor[]).length;

  return va > vb ? 1 : vb > va ? -1 : 0;
}
