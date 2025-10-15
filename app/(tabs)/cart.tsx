import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ShoppingBag } from 'lucide-react-native';
import { useCartStore } from '@/store/useCartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items } = useCartStore();

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cart</Text>
        </View>
        <View style={styles.centered}>
          <ShoppingBag size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.subtitle}>Browse restaurants and add items to get started</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.buttonText}>Browse Restaurants</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.emptyText}>Cart items will appear here</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#111' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emptyText: { fontSize: 18, color: '#9ca3af', textAlign: 'center', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
