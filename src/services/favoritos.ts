
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { LinhaOnibus } from '@/types/linha';

const CHAVE = '@mobilidade-sp:favoritos';

export async function listarFavoritos(): Promise<LinhaOnibus[]> {
  const dados = await AsyncStorage.getItem(CHAVE);

  if (!dados) {
    return [];
  }

  const favoritos: unknown = JSON.parse(dados);

  if (!Array.isArray(favoritos)) {
    throw new Error('Dados dos favoritos inválidos.');
  }

  return favoritos as LinhaOnibus[];
}

export async function alternarFavorito(
  linha: LinhaOnibus
): Promise<boolean> {
  const favoritos = await listarFavoritos();

  const jaExiste = favoritos.some(
    (favorito) => favorito.cl === linha.cl
  );

  const atualizados = jaExiste
    ? favoritos.filter((favorito) => favorito.cl !== linha.cl)
    : [...favoritos, linha];

  await AsyncStorage.setItem(
    CHAVE,
    JSON.stringify(atualizados)
  );

  return !jaExiste;
}
