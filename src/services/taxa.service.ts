import { IEndereco } from "@models/endereco";
import { clearAddress } from "@util/services/enderecos.util";
import { Service } from ".";
import { ITaxaGetDTO } from "@dtos/taxa/get";
import { Repo } from "@repositories/index";

export class TaxaService extends Service<IEndereco | null> {
  constructor(protected repo: Repo<IEndereco>) {
    super(repo);
  }
  create(item: IEndereco): void {
    throw new Error("Method not implemented.");
  }
  update(itemId: string, item: IEndereco): void {
    throw new Error("Method not implemented.");
  }
  delete(itemId: string): void {
    throw new Error("Method not implemented.");
  }
  async find(dto?: ITaxaGetDTO): Promise<IEndereco | null> {
    const { rua, cep, bairroId } = dto as ITaxaGetDTO;

    if (!rua && !cep && !bairroId) throw new Error("invalid address");

    let addressResponse: IEndereco | undefined;

    const cleanedCep = String(cep).replace(/[^0-9]/, "");

    const allAddresses = (await this.repo.find()) as IEndereco[];

    if (Number(cleanedCep)) {
      addressResponse = allAddresses.find((x) => {
        return x.cep === cleanedCep;
      });
    } else {
      const cleanedAddress = clearAddress(rua ?? "");

      const filteredAddresses = allAddresses
        .sort((a, b) => (a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0))
        .filter((x) =>
          x.rua.replace(/ DO | DA | DE | DI /g, " ").includes(cleanedAddress)
        );

      const addressesInNeighbourhood = allAddresses.filter(
        (x) => x.bairroId === bairroId
      );

      const neighbourhoodMidFee = Number(
        (
          addressesInNeighbourhood.reduce(
            (acc, address) => acc + address.taxa,
            0
          ) / addressesInNeighbourhood.length
        ).toFixed(2)
      );

      const neighbourhoodMaxFee = Number(
        Math.max(...addressesInNeighbourhood.map((x) => x.taxa))
      );

      const filteredAddressWithNeighbourhood = filteredAddresses.find(
        (e) => e.bairroId === bairroId
      );

      const sortAddressesByFee = (a: IEndereco, b: IEndereco) =>
        a.taxa > b.taxa ? 1 : a.taxa < b.taxa ? -1 : 0;

      const nextAddress = addressesInNeighbourhood
        .filter((e) => e.taxa >= neighbourhoodMidFee)
        .sort(sortAddressesByFee)?.[0];

      const previousAddress = addressesInNeighbourhood
        .filter((e) => e.taxa < neighbourhoodMidFee)
        .sort(sortAddressesByFee)
        .reverse()?.[0];

      const isNextAddressClosest = () =>
        (nextAddress?.taxa || 0) - neighbourhoodMidFee <
        neighbourhoodMidFee - (previousAddress?.taxa || 0);

      const closestAddress = isNextAddressClosest()
        ? nextAddress
        : previousAddress;

      const exactlyAddress = filteredAddresses?.[0];

      addressResponse =
        filteredAddressWithNeighbourhood?.taxa ?? 0 > 0
          ? filteredAddressWithNeighbourhood
          : exactlyAddress.taxa > neighbourhoodMaxFee
          ? closestAddress
          : exactlyAddress;
    }
    return addressResponse ?? null;
  }
}
