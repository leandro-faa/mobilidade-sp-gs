
import type { LinhaOnibus } from '@/types/linha';

const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function buscarLinhas(
  termo: string
): Promise<LinhaOnibus[]> {
  const pesquisa = termo.trim();

  if (!pesquisa) {
    return [];
  }

  if (!API_URL) {
    throw new Error('Endereço do backend não configurado.');
  }

  const url =
    `${API_URL}/api/linhas?termo=${encodeURIComponent(pesquisa)}`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(
      `Falha ao consultar linhas. HTTP: ${resposta.status}`
    );
  }

  const dados: unknown = await resposta.json();

  if (!Array.isArray(dados)) {
    throw new Error('Formato de resposta inválido.');
  }

  return dados as LinhaOnibus[];
}
