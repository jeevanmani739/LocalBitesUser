import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrdersScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No orders yet</Text>
        <Text style={styles.subtitle}>Start ordering from your favorite restaurants</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#111' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { fontSize: 18, color: '#9ca3af', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
});
