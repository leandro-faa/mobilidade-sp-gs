
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';

// Dados de exemplo para testar a interface
const linhasExemplo = [
  {
    cl: 1273,
    lt: '8000',
    tl: 10,
    tp: 'PCA. RAMOS DE AZEVEDO',
    ts: 'TERMINAL LAPA',
  },
  {
    cl: 34041,
    lt: '8000',
    tl: 10,
    tp: 'PCA. RAMOS DE AZEVEDO',
    ts: 'TERMINAL LAPA',
  },
];

export default function PesquisaScreen() {
  const [pesquisa, setPesquisa] = useState('');

  // Filtra as linhas conforme o texto digitado
  const linhasFiltradas = linhasExemplo.filter((linha) => {
    const termo = pesquisa.trim().toLowerCase();

    const informacoes =
      `${linha.lt}-${linha.tl} ${linha.tp} ${linha.ts}`.toLowerCase();

    return informacoes.includes(termo);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquisar ônibus</Text>

      <TextInput
        style={styles.campoPesquisa}
        placeholder="Digite o número ou nome da linha"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <Text style={styles.subtitulo}>Linhas disponíveis</Text>

      <FlatList
        data={linhasFiltradas}
        keyExtractor={(item) => String(item.cl)}
        ListEmptyComponent={
          <Text style={styles.descricao}>
            Nenhuma linha encontrada.
          </Text>
        }
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/linha/[id]',
              params: { id: String(item.cl) },
            }}
            asChild
          >
            <Pressable style={styles.cartao}>
              <Text style={styles.numeroLinha}>
                Linha {item.lt}-{item.tl}
              </Text>

              <Text style={styles.descricao}>
                {item.tp} / {item.ts}
              </Text>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F8F9FA',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 20,
  },
  campoPesquisa: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 16,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  numeroLinha: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 6,
  },
  descricao: {
    fontSize: 14,
    color: '#64748B',
  },
});
