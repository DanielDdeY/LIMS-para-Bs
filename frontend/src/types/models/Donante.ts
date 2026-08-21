export type GrupoAbo = 'A' | 'B' | 'AB' | 'O';
export type FactorRh = 'POSITIVO' | 'NEGATIVO';
export type VarianteRh = 'D_DEBIL' | 'D_PARCIAL' | 'NINGUNA' | null;

export interface Donante {
  id?: number;
  tipoDoc: string;
  numDoc: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento: string;
  sexo?: string;
  ubigeo?: string;
  grupoAbo: GrupoAbo;
  factorRh: FactorRh;
  varianteRh?: VarianteRh;
  estadoDiferido: boolean;
  fechaDesbloqueo?: string | null;
  esOcupacionRiesgo: boolean;
}
