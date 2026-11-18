export interface VeiculoPrevisto {
  p: string;
  t: string;
  a: boolean;
}

export interface ParadaPrevisao {
  cp: number;
  np: string;
  vs: VeiculoPrevisto[];
}

export interface PrevisaoLinha {
  hr: string;
  ps: ParadaPrevisao[];
}