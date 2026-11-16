import { View, Text, StyleSheet } from 'react-native';

export default function FavoritosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Minhas linhas favoritas
      </Text>

      <Text style={styles.mensagem}>
        Você ainda não possui linhas favoritas.
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
  mensagem: {
    fontSize: 16,
    color: '#666666',
  },
});