import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';
import { LinhaCard } from '@/components/linha-card';
import type { LinhaOnibus } from '@/types/linha';
export default function FavoritosScreen() {
  const favoritos: LinhaOnibus[] = [];
  return (
    <FlatList
  data={favoritos}
  keyExtractor={(item) => String(item.cl)}
  renderItem={({ item }) => (
    <LinhaCard linha={item} />
  )}
  ListEmptyComponent={
    <Text style={styles.mensagem}>
      Você ainda não possui linhas favoritas.
    </Text>
  }
/>
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