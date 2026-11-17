import type { LinhaOnibus } from '@/types/linha';
import { linhasExemplo } from '@/data/linhas-exemplo';

export async function buscarLinhas(
  termo: string
): Promise<LinhaOnibus[]> {
  const pesquisa = termo.trim().toLowerCase();

  if (!pesquisa) {
    return [];
  }

  return linhasExemplo.filter((linha) => {
    const informacoes =
      `${linha.lt}-${linha.tl} ${linha.tp} ${linha.ts}`.toLowerCase();

    return informacoes.includes(pesquisa);
  });
}