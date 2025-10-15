import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, CheckCircle2, XCircle, Truck, Star } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Order, OrderStatus, Address } from '@/types/database';

type OrderDetail = Order & {
  restaurant: { name: string; cuisine_type: string };
  delivery_address: Address;
  order_items: Array<{
    id: string;
    quantity: number;
    price: number;
    special_requests: string | null;
    menu_item: { name: string; description: string | null };
  }>;
};

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();

    const subscription = supabase
      .channel(`order_${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        () => {
          loadOrder();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [id]);

  async function loadOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurant:restaurants(name, cuisine_type),
          delivery_address:addresses(*),
          order_items(
            id,
            quantity,
            price,
            special_requests,
            menu_item:menu_items(name, description)
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setOrder(data as any);
    } catch (error) {
      console.error('Error loading order:', error);
      Alert.alert('Error', 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  }

  function getStatusInfo(status: OrderStatus) {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: '#f59e0b', text: 'Order Pending' };
      case 'confirmed':
        return { icon: CheckCircle2, color: '#3b82f6', text: 'Order Confirmed' };
      case 'preparing':
        return { icon: Clock, color: '#8b5cf6', text: 'Being Prepared' };
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

  function getStatusSteps(status: OrderStatus): number {
    switch (status) {
      case 'pending': return 1;
      case 'confirmed': return 2;
      case 'preparing': return 3;
      case 'out_for_delivery': return 4;
      case 'delivered': return 5;
      default: return 0;
    }
  }

  if (loading || !order) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={s.title}>Order Details</Text>
        </View>
        <View style={s.center}>
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      </SafeAreaView>
    );
  }

  const statusInfo = getStatusInfo(order.status);
  const StatusIcon = statusInfo.icon;
  const currentStep = getStatusSteps(order.status);
  const date = new Date(order.created_at);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.title}>Order Details</Text>
      </View>

      <ScrollView style={s.content}>
        <View style={s.statusCard}>
          <View style={[s.statusIcon, { backgroundColor: `${statusInfo.color}20` }]}>
            <StatusIcon size={32} color={statusInfo.color} />
          </View>
          <Text style={[s.statusTitle, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
          <Text style={s.orderNumber}>Order #{order.id.slice(0, 8)}</Text>
          <Text style={s.orderDate}>
            {date.toLocaleDateString()} at {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>

          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <View style={s.timeline}>
              {['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'].map((step, index) => (
                <View key={step} style={s.timelineItem}>
                  <View
                    style={[
                      s.timelineDot,
                      index < currentStep ? s.timelineDotActive : s.timelineDotInactive,
                    ]}
                  >
                    {index < currentStep && <View style={s.timelineDotInner} />}
                  </View>
                  {index < 4 && (
                    <View
                      style={[
                        s.timelineLine,
                        index < currentStep - 1 ? s.timelineLineActive : s.timelineLineInactive,
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Restaurant</Text>
          <View style={s.card}>
            <Text style={s.restaurantName}>{order.restaurant.name}</Text>
            <Text style={s.cuisineType}>{order.restaurant.cuisine_type}</Text>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Delivery Address</Text>
          <View style={s.card}>
            <View style={s.addressRow}>
              <MapPin size={20} color="#666" />
              <View style={s.addressInfo}>
                <Text style={s.addressLabel}>{order.delivery_address.label}</Text>
                <Text style={s.addressText}>{order.delivery_address.street_address}</Text>
                <Text style={s.addressText}>
                  {order.delivery_address.city}, {order.delivery_address.state} {order.delivery_address.zip_code}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Order Items</Text>
          <View style={s.card}>
            {order.order_items.map((item) => (
              <View key={item.id} style={s.orderItem}>
                <View style={s.itemRow}>
                  <Text style={s.itemQty}>{item.quantity}x</Text>
                  <View style={s.itemDetails}>
                    <Text style={s.itemName}>{item.menu_item.name}</Text>
                    {item.special_requests && (
                      <Text style={s.specialRequests}>{item.special_requests}</Text>
                    )}
                  </View>
                </View>
                <Text style={s.itemPrice}>
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {order.special_instructions && (
          <View style={s.section}>
            <Text style={s.sectionTitle}>Special Instructions</Text>
            <View style={s.card}>
              <Text style={s.instructionsText}>{order.special_instructions}</Text>
            </View>
          </View>
        )}

        <View style={s.section}>
          <Text style={s.sectionTitle}>Payment Summary</Text>
          <View style={s.card}>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Subtotal</Text>
              <Text style={s.summaryValue}>${order.subtotal.toFixed(2)}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Delivery Fee</Text>
              <Text style={s.summaryValue}>
                {order.delivery_fee === 0 ? 'Free' : `$${order.delivery_fee.toFixed(2)}`}
              </Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Tax</Text>
              <Text style={s.summaryValue}>${order.tax.toFixed(2)}</Text>
            </View>
            <View style={[s.summaryRow, s.totalRow]}>
              <Text style={s.totalLabel}>Total</Text>
              <Text style={s.totalValue}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {order.status === 'delivered' && (
          <View style={s.section}>
            <TouchableOpacity
              style={s.reviewBtn}
              onPress={() => router.push(`/review/${order.id}`)}
            >
              <Star size={20} color="#fff" />
              <Text style={s.reviewBtnText}>Leave a Review</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn: { marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  statusCard: { backgroundColor: '#fff', padding: 24, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  statusIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statusTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  orderNumber: { fontSize: 14, color: '#666', marginBottom: 4 },
  orderDate: { fontSize: 14, color: '#9ca3af' },
  timeline: { flexDirection: 'row', alignItems: 'center', marginTop: 24, paddingHorizontal: 20 },
  timelineItem: { flex: 1, alignItems: 'center' },
  timelineDot: { width: 16, height: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  timelineDotActive: { backgroundColor: '#22c55e', borderWidth: 2, borderColor: '#22c55e' },
  timelineDotInactive: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#d1d5db' },
  timelineDotInner: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },
  timelineLine: { position: 'absolute', top: 8, left: '50%', right: '-50%', height: 2 },
  timelineLineActive: { backgroundColor: '#22c55e' },
  timelineLineInactive: { backgroundColor: '#d1d5db' },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#e5e7eb' },
  restaurantName: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  cuisineType: { fontSize: 14, color: '#666' },
  addressRow: { flexDirection: 'row', gap: 12 },
  addressInfo: { flex: 1 },
  addressLabel: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  addressText: { fontSize: 14, color: '#666', marginBottom: 2 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  itemRow: { flexDirection: 'row', flex: 1, gap: 8 },
  itemQty: { fontSize: 14, fontWeight: '600', color: '#22c55e', minWidth: 24 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '500', color: '#111', marginBottom: 2 },
  specialRequests: { fontSize: 12, color: '#666', fontStyle: 'italic' },
  itemPrice: { fontSize: 14, fontWeight: '600', color: '#111' },
  instructionsText: { fontSize: 14, color: '#666', lineHeight: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 16, color: '#111', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#22c55e' },
  reviewBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#22c55e', borderRadius: 12, padding: 16 },
  reviewBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
