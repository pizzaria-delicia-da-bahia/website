export interface Promo {
  id: string;
  nome: string;
  ativa: boolean;
  dias: (string | Date)[];
  modal?: {
    imagemUrl?: string;
    route?: string;
  };
}
