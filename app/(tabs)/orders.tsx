import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Receipt, Clock, CheckCircle2, XCircle, Truck } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { Order, OrderStatus } from '@/types/database';

type OrderWithRestaurant = Order & {
  restaurant: { name: string; cuisine_type: string };
};

export default function OrdersScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<OrderWithRestaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
    const subscription = supabase
      .channel('orders_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `customer_id=eq.${user?.id}`,
        },
        () => {
          loadOrders();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  async function loadOrders() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurant:restaurants(name, cuisine_type)
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data as any || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusInfo(status: OrderStatus) {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: '#f59e0b', text: 'Pending' };
      case 'confirmed':
        return { icon: CheckCircle2, color: '#3b82f6', text: 'Confirmed' };
      case 'preparing':
        return { icon: Clock, color: '#8b5cf6', text: 'Preparing' };
      case 'out_for_delivery':
        return { icon: Truck, color: '#22c55e', text: 'Out for Delivery' };
      case 'delivered':
        return { icon: CheckCircle2, color: '#22c55e', text: 'Delivered' };
      case 'cancelled':
        return { icon: XCircle, color: '#ef4444', text: 'Cancelled' };
      default:
        return { icon: Clock, color: '#9ca3af', text: status };
    }
  }

  function renderOrder({ item }: { item: OrderWithRestaurant }) {
    const statusInfo = getStatusInfo(item.status);
    const StatusIcon = statusInfo.icon;
    const date = new Date(item.created_at);

    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => router.push(`/order/${item.id}`)}
      >
        <View style={styles.cardHeader}>
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.restaurant.name}</Text>
            <Text style={styles.cuisineType}>{item.restaurant.cuisine_type}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${statusInfo.color}20` }]}>
            <StatusIcon size={14} color={statusInfo.color} />
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.text}
            </Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.orderLabel}>Order #{item.id.slice(0, 8)}</Text>
            <Text style={styles.orderDate}>
              {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      </SafeAreaView>
    );
  }

  if (orders.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Orders</Text>
        </View>
        <View style={styles.centered}>
          <Receipt size={64} color="#d1d5db" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.subtitle}>Start ordering from your favorite restaurants</Text>
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
        <Text style={styles.title}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#111' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emptyText: { fontSize: 18, color: '#9ca3af', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  list: { padding: 16 },
  orderCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  restaurantInfo: { flex: 1 },
  restaurantName: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  cuisineType: { fontSize: 14, color: '#666' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  cardDivider: { height: 1, backgroundColor: '#e5e7eb', marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  orderLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  orderDate: { fontSize: 12, color: '#9ca3af' },
  orderTotal: { fontSize: 20, fontWeight: 'bold', color: '#22c55e' },
});
