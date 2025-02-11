export function calcularTaxaMaquininha(
  valorCombos: number,
  valorCartao: number,
  taxaMaquininha: number,
  valorOutros = 0
) {
  // Se o valor pago no cartão for menor que o total dos combos,
  // a taxa só é aplicada sobre esse valor
  const baseCalculo = Math.min(valorCartao, valorCombos - valorOutros);

  // Calcular a taxa proporcional
  //   const taxaAjustada = baseCalculo * taxaMaquininha;
  const p0 = taxaMaquininha / 100;
  const p1 = p0;
  const p2 = baseCalculo * p1;

  const p3 = baseCalculo * 100;
  const p4 = 100 - taxaMaquininha;

  const p5 = p3 / p4;

  console.log("p555555", Math.ceil(p5));

  const taxaAjustada = Math.ceil(p5) - baseCalculo;

  //   console.clear();

  console.log(
    "baseCalculo",
    baseCalculo,
    "\ntaxaAjustada",
    taxaAjustada,
    "\nvalorCartao",
    valorCartao,
    "\nvalorCombos",
    valorCombos,
    "\np0",
    p0,
    "\np1",
    p1,
    "\np2",
    p2
  );

  return Number(taxaAjustada.toFixed(2));
}

export function subtrairTaxaMaquininha(
  valorCartao: number,
  taxaMaquininha: number
) {
  // Se o valor pago no cartão for menor que o total dos combos,
  // a taxa só é aplicada sobre esse valor
  const baseCalculo = valorCartao;

  // Calcular a taxa proporcional
  //   const taxaAjustada = baseCalculo * taxaMaquininha;
  const p0 = taxaMaquininha / 100;
  const p1 = p0;
  const p2 = baseCalculo * p1;

  const p3 = baseCalculo * 100;
  const p4 = 100 - taxaMaquininha;

  const p5 = p3 / p4;

  console.log("p555555", Math.ceil(p5));

  const taxaAjustada = Math.ceil(p5) - baseCalculo;

  //   console.clear();

  return Number(taxaAjustada.toFixed(2));
}
