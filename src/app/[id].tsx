import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalhesLinha() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da linha</Text>

      <Text style={styles.informacao}>
        Identificador: {id ?? 'Não informado'}
      </Text>

      <Text>
        As informações e previsões serão exibidas aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  informacao: {
    fontSize: 18,
    marginBottom: 16,
  },
});