
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
import type { LinhaOnibus } from '@/types/linha';
import { buscarLinhas } from '@/services/linhas';


export default function PesquisaScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [linhas, setLinhas] = useState<LinhaOnibus[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [pesquisou, setPesquisou] = useState(false);

    async function pesquisarLinhas() {
      setPesquisou(true);
      setErro('');

      if (!pesquisa.trim()) {
        setLinhas([]);
        setErro('Digite o número ou nome da linha.');
        return;
      }

      setCarregando(true);

      try {
        const resultado = await buscarLinhas(pesquisa);
        setLinhas(resultado);
      } catch {
        setLinhas([]);
        setErro('Não foi possível realizar a pesquisa.');
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
      />
      <Pressable onPress={pesquisarLinhas} style={styles.botaoBusca}>
        <Text style={styles.textoBotao}>Buscar linhas</Text>
</Pressable>

      <Text style={styles.subtitulo}>Linhas disponíveis</Text>
      {carregando && <Text>Buscando linhas...</Text>}
      {erro ? <Text>{erro}</Text> : null}
      <FlatList
        data={linhas}
        keyExtractor={(item) => String(item.cl)}
        ListEmptyComponent={
          !carregando && pesquisou && !erro ? (
            <Text style={styles.descricao}>
              Nenhuma linha encontrada.
    </Text>
  ) : null
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
  botaoBusca: {
  backgroundColor: '#2563EB',
  padding: 14,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 20,
},
textoBotao: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: 'bold',
},
});
