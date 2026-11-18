
import type { PrevisaoLinha } from '@/types/previsao';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function buscarPrevisoes(
  codigoLinha: number
): Promise<PrevisaoLinha> {
  if (!Number.isSafeInteger(codigoLinha) || codigoLinha <= 0) {
    throw new Error('Código da linha inválido.');
  }

  if (!API_URL) {
    throw new Error('Endereço do backend não configurado.');
  }

  const url =
    `${API_URL}/api/previsoes?codigoLinha=${codigoLinha}`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(
      `Não foi possível consultar as previsões. HTTP ${resposta.status}`
    );
  }

  const dados: unknown = await resposta.json();

  if (
    typeof dados !== 'object' ||
    dados === null ||
    !('ps' in dados) ||
    !Array.isArray(dados.ps) ||
    !('hr' in dados) ||
    typeof dados.hr !== 'string'
  ) {
    throw new Error('Formato de previsão inválido.');
  }

  return dados as unknown as PrevisaoLinha;
}
