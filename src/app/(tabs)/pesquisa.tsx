
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import type { LinhaOnibus } from '@/types/linha';
import { buscarLinhas } from '@/services/linhas';
import { LinhaCard } from '@/components/linha-card';

export default function PesquisaScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [linhas, setLinhas] = useState<LinhaOnibus[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [pesquisou, setPesquisou] = useState(false);

  async function pesquisarLinhas() {
    if (carregando) return;

    const termo = pesquisa.trim();

    setPesquisou(true);
    setErro('');
    setLinhas([]);

    if (!termo) {
      setErro('Digite o número ou nome da linha.');
      return;
    }

    setCarregando(true);

    try {
      const resultado = await buscarLinhas(termo);
      setLinhas(resultado);
    } catch {
      setErro(
        'Não foi possível realizar a pesquisa. Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquisar ônibus</Text>

      <TextInput
        style={styles.campoPesquisa}
        placeholder="Digite o número ou nome da linha"
        value={pesquisa}
        onChangeText={setPesquisa}
        returnKeyType="search"
        onSubmitEditing={pesquisarLinhas}
        editable={!carregando}
      />

      <Pressable
        onPress={pesquisarLinhas}
        disabled={carregando}
        accessibilityRole="button"
        accessibilityState={{ disabled: carregando }}
        style={[
          styles.botaoBusca,
          carregando && styles.botaoDesabilitado,
        ]}
      >
        <Text style={styles.textoBotao}>
          {carregando ? 'Buscando...' : 'Buscar linhas'}
        </Text>
      </Pressable>

      <Text style={styles.subtitulo}>Linhas disponíveis</Text>

      {carregando && (
        <View style={styles.status}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.descricao}>
            Buscando linhas...
          </Text>
        </View>
      )}

      {erro ? (
        <Text style={styles.mensagemErro}>{erro}</Text>
      ) : null}

      {!carregando &&
        !erro &&
        pesquisou &&
        linhas.length > 0 && (
          <Text style={styles.contador}>
            {linhas.length}{' '}
            {linhas.length === 1
              ? 'linha encontrada'
              : 'linhas encontradas'}
          </Text>
        )}

      <FlatList
        data={linhas}
        keyExtractor={(item) => String(item.cl)}
        renderItem={({ item }) => (
          <LinhaCard linha={item} />
        )}
        ListEmptyComponent={
          !carregando && pesquisou && !erro ? (
           <Text style={styles.descricao}>
              Nenhuma linha encontrada.
           </Text>
        ) : undefined
}
        keyboardShouldPersistTaps="handled"
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
    fontSize: 16,
  },
  botaoBusca: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  botaoDesabilitado: {
    backgroundColor: '#94A3B8',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 16,
  },
  descricao: {
    fontSize: 14,
    color: '#64748B',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  mensagemErro: {
    fontSize: 14,
    color: '#DC2626',
    marginBottom: 16,
  },
  contador: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 12,
  },
});
