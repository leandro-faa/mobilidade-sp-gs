
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import { LinhaCard } from '@/components/linha-card';
import { listarFavoritos } from '@/services/favoritos';
import type { LinhaOnibus } from '@/types/linha';

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<LinhaOnibus[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      setCarregando(true);
      setErro(false);

      listarFavoritos()
        .then((dados) => {
          if (ativo) {
            setFavoritos(dados);
          }
        })
        .catch(() => {
          if (ativo) {
            setFavoritos([]);
            setErro(true);
          }
        })
        .finally(() => {
          if (ativo) {
            setCarregando(false);
          }
        });

      return () => {
        ativo = false;
      };
    }, [])
  );

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.conteudo}
      data={favoritos}
      keyExtractor={(item) => String(item.cl)}
      renderItem={({ item }) => (
        <LinhaCard linha={item} />
      )}
      ListHeaderComponent={
        <Text style={styles.titulo}>Minhas linhas favoritas</Text>
      }
      ListEmptyComponent={
        carregando ? (
          <ActivityIndicator color="#2563EB" />
        ) : (
          <Text style={styles.mensagem}>
            {erro
              ? 'Não foi possível carregar os favoritos.'
              : 'Você ainda não possui linhas favoritas.'}
          </Text>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  conteudo: {
    padding: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 20,
  },
  mensagem: {
    fontSize: 16,
    color: '#64748B',
  },
});
