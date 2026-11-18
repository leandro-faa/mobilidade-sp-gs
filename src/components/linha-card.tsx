
import { Link } from 'expo-router';
import { Pressable, Text, StyleSheet } from 'react-native';
import type { LinhaOnibus } from '@/types/linha';

type LinhaCardProps = {
  linha: LinhaOnibus;
};

export function LinhaCard({ linha }: LinhaCardProps) {
  return (
    <Link
      href={{
  pathname: '/linha/[id]',
  params: {
    id: String(linha.cl),
    lt: linha.lt,
    tl: String(linha.tl),
    tp: linha.tp,
    ts: linha.ts,
    sl: String(linha.sl ?? ''),
  },
}}
      asChild
    >
      <Pressable style={styles.cartao}>
        <Text style={styles.numeroLinha}>
          Linha {linha.lt}-{linha.tl}
        </Text>

        <Text style={styles.descricao}>
          {linha.tp} / {linha.ts}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
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
