
import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function DetalhesLinha() {
  const { id, lt, tl, tp, ts, sl } = useLocalSearchParams<{
    id: string;
    lt?: string;
    tl?: string;
    tp?: string;
    ts?: string;
    sl?: string;
  }>();

  const dadosDisponiveis = Boolean(lt && tl && tp && ts);

  const sentido =
    sl === '1'
      ? 'Terminal principal → Terminal secundário'
      : sl === '2'
        ? 'Terminal secundário → Terminal principal'
        : 'Sentido não informado';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
    >
      <Text style={styles.titulo}>
        Detalhes da linha
      </Text>

      {!dadosDisponiveis ? (
        <Text style={styles.descricao}>
          Informações da linha indisponíveis.
          Volte à Pesquisa e selecione uma linha.
        </Text>
      ) : (
        <>
          <View style={styles.cartao}>
            <Text style={styles.numeroLinha}>
              Linha {lt}-{tl}
            </Text>

            <Text style={styles.identificador}>
              Código SPTrans: {id}
            </Text>

            <Text style={styles.rotulo}>
              Terminal principal
            </Text>
            <Text style={styles.informacao}>{tp}</Text>

            <Text style={styles.rotulo}>
              Terminal secundário
            </Text>
            <Text style={styles.informacao}>{ts}</Text>

            <Text style={styles.rotulo}>
              Sentido de operação
            </Text>
            <Text style={styles.informacao}>{sentido}</Text>
          </View>

          <View style={styles.cartao}>
            <Text style={styles.subtitulo}>
              Previsões de chegada
            </Text>

            <Text style={styles.descricao}>
              As previsões serão exibidas após
              a integração com a API Olho Vivo.
            </Text>
          </View>

          <Pressable
            style={styles.botaoDesabilitado}
            disabled
          >
            <Text style={styles.textoBotao}>
              Adicionar aos favoritos
            </Text>
          </Pressable>

          <Text style={styles.aviso}>
            Funcionalidade disponível após
            a integração com o AsyncStorage.
          </Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  conteudo: {
    padding: 24,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 20,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  numeroLinha: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 6,
  },
  identificador: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginTop: 12,
    marginBottom: 4,
  },
  informacao: {
    fontSize: 16,
    color: '#475569',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 12,
  },
  descricao: {
    fontSize: 15,
    color: '#64748B',
    lineHeight: 23,
  },
  botaoDesabilitado: {
    backgroundColor: '#94A3B8',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  aviso: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
  },
});
