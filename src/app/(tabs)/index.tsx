
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>Mobilidade SP</Text>

        <Text style={styles.subtitulo}>
          Seu transporte público de forma mais simples.
        </Text>

        <Text style={styles.descricao}>
          Consulte linhas de ônibus de São Paulo,
          acompanhe informações sobre seu transporte
          e acesse suas linhas favoritas.
        </Text>

        <Link href="/pesquisa" style={styles.botao}>
          Pesquisar linhas
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conteudo: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 20,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 25,
    marginBottom: 32,
  },
  botao: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden',
  },
});
