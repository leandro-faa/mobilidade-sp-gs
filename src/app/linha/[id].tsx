
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { buscarPrevisoes } from '@/services/previsoes';
import { alternarFavorito, listarFavoritos } from '@/services/favoritos';
import type { PrevisaoLinha } from '@/types/previsao';
import type { LinhaOnibus } from '@/types/linha';

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

  // Estados das previsões
  const [previsao, setPrevisao] = useState<PrevisaoLinha | null>(null);
  const [carregandoPrevisoes, setCarregandoPrevisoes] = useState(true);
  const [erroPrevisoes, setErroPrevisoes] = useState(false);

  // Estados dos favoritos
  const [favoritado, setFavoritado] = useState(false);
  const [carregandoFavorito, setCarregandoFavorito] = useState(true);
  const [salvandoFavorito, setSalvandoFavorito] = useState(false);
  const [erroFavoritos, setErroFavoritos] = useState('');

  // Consultar previsões da linha
  useEffect(() => {
    let ativo = true;

    async function carregarPrevisoes() {
      setCarregandoPrevisoes(true);
      setErroPrevisoes(false);
      setPrevisao(null);

      try {
        const codigoLinha = Number(id);
        const resultado = await buscarPrevisoes(codigoLinha);

        if (ativo) {
          setPrevisao(resultado);
        }
      } catch (erro) {
        if (ativo) {
          console.error('Erro ao consultar previsões:', erro);
          setErroPrevisoes(true);
        }
      } finally {
        if (ativo) {
          setCarregandoPrevisoes(false);
        }
      }
    }

    void carregarPrevisoes();

    return () => {
      ativo = false;
    };
  }, [id]);

  // Verificar se a linha está nos favoritos
  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      setCarregandoFavorito(true);
      setErroFavoritos('');

      listarFavoritos()
        .then((favoritos) => {
          if (ativo) {
            setFavoritado(
              favoritos.some((linha) => linha.cl === Number(id))
            );
          }
        })
        .catch(() => {
          if (ativo) {
            setErroFavoritos(
              'Não foi possível carregar os favoritos.'
            );
          }
        })
        .finally(() => {
          if (ativo) {
            setCarregandoFavorito(false);
          }
        });

      return () => {
        ativo = false;
      };
    }, [id])
  );

  // Adicionar ou remover a linha dos favoritos
  async function alterarFavorito() {
    if (
      !lt ||
      !tl ||
      !tp ||
      !ts ||
      carregandoFavorito ||
      salvandoFavorito ||
      erroFavoritos
    ) {
      return;
    }

    const codigo = Number(id);
    const numeroVariacao = Number(tl);

    if (
      !Number.isSafeInteger(codigo) ||
      codigo <= 0 ||
      !Number.isFinite(numeroVariacao)
    ) {
      setErroFavoritos('Dados da linha inválidos.');
      return;
    }

    const linha: LinhaOnibus = {
      cl: codigo,
      lt,
      tl: numeroVariacao,
      tp,
      ts,
      sl: sl ? Number(sl) : undefined,
    };

    setSalvandoFavorito(true);
    setErroFavoritos('');

    try {
      const resultado = await alternarFavorito(linha);
      setFavoritado(resultado);
    } catch {
      setErroFavoritos(
        'Não foi possível salvar os favoritos.'
      );
    } finally {
      setSalvandoFavorito(false);
    }
  }

  const paradasComPrevisao =
    previsao?.ps.filter((parada) => parada.vs.length > 0) ?? [];

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
          {/* Informações da linha */}
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
            <Text style={styles.informacao}>
              {sentido}
            </Text>
          </View>

          {/* Previsões de chegada */}
          <View style={styles.cartao}>
            <Text style={styles.subtitulo}>
              Previsões de chegada
            </Text>

            {carregandoPrevisoes ? (
              <ActivityIndicator
                size="small"
                color="#2563EB"
              />
            ) : erroPrevisoes ? (
              <Text style={styles.descricao}>
                Não foi possível consultar as previsões
                desta linha no momento.
              </Text>
            ) : paradasComPrevisao.length === 0 ? (
              <Text style={styles.descricao}>
                Nenhum horário previsto disponível
                nesta consulta.
              </Text>
            ) : (
              <>
                <Text style={styles.referencia}>
                  Horário de referência: {previsao?.hr}
                </Text>

                {paradasComPrevisao.map((parada) => (
                  <View
                    key={parada.cp}
                    style={styles.parada}
                  >
                    <Text style={styles.nomeParada}>
                      {parada.np}
                    </Text>

                    {parada.vs.map((veiculo, indice) => (
                      <Text
                        key={`${veiculo.p}-${indice}`}
                        style={styles.horarioChegada}
                      >
                        Chegada prevista: {veiculo.t}
                      </Text>
                    ))}
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Botão de favoritos */}
          <Pressable
            style={[
              styles.botaoFavorito,
              (carregandoFavorito ||
                salvandoFavorito ||
                Boolean(erroFavoritos)) &&
                styles.botaoIndisponivel,
            ]}
            disabled={
              carregandoFavorito ||
              salvandoFavorito ||
              Boolean(erroFavoritos)
            }
            onPress={() => void alterarFavorito()}
          >
            <Text style={styles.textoBotao}>
              {carregandoFavorito
                ? 'Carregando favoritos...'
                : salvandoFavorito
                  ? 'Salvando...'
                  : favoritado
                    ? 'Remover dos favoritos'
                    : 'Adicionar aos favoritos'}
            </Text>
          </Pressable>

          {erroFavoritos ? (
            <Text style={styles.aviso}>
              {erroFavoritos}
            </Text>
          ) : null}
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
  botaoFavorito: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoIndisponivel: {
    opacity: 0.6,
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
  referencia: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  parada: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingVertical: 14,
  },
  nomeParada: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  horarioChegada: {
    fontSize: 14,
    color: '#2563EB',
    marginBottom: 4,
  },
});
