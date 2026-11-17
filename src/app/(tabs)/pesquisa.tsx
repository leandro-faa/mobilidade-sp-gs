import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function PesquisaScreen() {
  const [pesquisa, setPesquisa] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pesquisar ônibus</Text>

      <TextInput
        style={styles.campo}
        placeholder="Digite o número ou nome da linha"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <Link
        href={{
          pathname: '/linha/[id]',
          params: { id: 'teste-123' },
        }}
>
  Visualizar detalhes de uma linha
</Link>

      <Text>Os resultados aparecerão aqui.</Text>
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
  campo: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
});