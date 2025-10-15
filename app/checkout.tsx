import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Plus } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { Address } from '@/types/database';

export default function CheckoutScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { items, restaurant, getTotal, clearCart } = useCartStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  const subtotal = getTotal();
  const deliveryFee = restaurant?.delivery_fee || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });

      if (error) throw error;

      setAddresses(data || []);
      if (data && data.length > 0) {
        setSelectedAddress(data.find(a => a.is_default) || data[0]);
      }
    } catch (error) {
      console.error('Error loading addresses:', error);
      Alert.alert('Error', 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }

  async function handlePlaceOrder() {
    if (!user || !restaurant || !selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }

    if (items.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }

    Alert.alert(
      'Place Order',
      `Place order for $${total.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: async () => {
            setPlacing(true);

            try {
              const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                  customer_id: user.id,
                  restaurant_id: restaurant.id,
                  delivery_address_id: selectedAddress.id,
                  status: 'pending',
                  subtotal,
                  delivery_fee: deliveryFee,
                  tax,
                  total,
                  special_instructions: specialInstructions.trim() || null,
                })
                .select()
                .single();

              if (orderError) throw orderError;

              const orderItems = items.map(item => ({
                order_id: order.id,
                menu_item_id: item.menu_item.id,
                quantity: item.quantity,
                price: Number(item.menu_item.price),
                special_requests: item.special_requests || null,
              }));

              const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

              if (itemsError) throw itemsError;

              clearCart();

              Alert.alert(
                'Order Placed!',
                'Your order has been placed successfully',
                [
                  {
                    text: 'View Order',
                    onPress: () => router.replace(`/order/${order.id}`)
                  }
                ]
              );
            } catch (error: any) {
              console.error('Error placing order:', error);
              Alert.alert('Error', error.message || 'Failed to place order');
            } finally {
              setPlacing(false);
            }
          }
        }
      ]
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={s.title}>Checkout</Text>
        </View>
        <View style={s.center}>
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      </SafeAreaView>
    );
  }

  if (addresses.length === 0) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={s.title}>Checkout</Text>
        </View>
        <View style={s.center}>
          <MapPin size={64} color="#d1d5db" />
          <Text style={s.emptyText}>No delivery address</Text>
          <Text style={s.subtitle}>Add a delivery address to continue</Text>
          <TouchableOpacity
            style={s.button}
            onPress={() => router.push('/add-address')}
          >
            <Text style={s.buttonText}>Add Address</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.title}>Checkout</Text>
      </View>

      <ScrollView style={s.content}>
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Delivery Address</Text>
            <TouchableOpacity onPress={() => router.push('/addresses')}>
              <Text style={s.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {selectedAddress && (
            <View style={s.addressCard}>
              <MapPin size={20} color="#22c55e" />
              <View style={s.addressInfo}>
                <Text style={s.addressLabel}>{selectedAddress.label}</Text>
                <Text style={s.addressText}>{selectedAddress.street_address}</Text>
                <Text style={s.addressText}>
                  {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zip_code}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Order Summary</Text>
          <View style={s.summaryCard}>
            <Text style={s.restaurantName}>{restaurant?.name}</Text>
            {items.map((item, index) => (
              <View key={item.menu_item.id + index} style={s.orderItem}>
                <View style={s.itemRow}>
                  <Text style={s.itemQty}>{item.quantity}x</Text>
                  <Text style={s.itemName}>{item.menu_item.name}</Text>
                </View>
                <Text style={s.itemPrice}>
                  ${(Number(item.menu_item.price) * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Special Instructions (Optional)</Text>
          <TextInput
            style={s.textArea}
            placeholder="Add any special instructions for the restaurant..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Payment Summary</Text>
          <View style={s.summaryCard}>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Subtotal</Text>
              <Text style={s.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Delivery Fee</Text>
              <Text style={s.summaryValue}>
                {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
              </Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Tax (8%)</Text>
              <Text style={s.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            <View style={[s.summaryRow, s.totalRow]}>
              <Text style={s.totalLabel}>Total</Text>
              <Text style={s.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity
          style={[s.placeOrderBtn, placing && s.placeOrderBtnDisabled]}
          onPress={handlePlaceOrder}
          disabled={placing}
        >
          <Text style={s.placeOrderText}>
            {placing ? 'Placing Order...' : 'Place Order'}
          </Text>
          <Text style={s.placeOrderPrice}>${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn: { marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emptyText: { fontSize: 18, color: '#9ca3af', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  content: { flex: 1 },
  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 12 },
  changeText: { fontSize: 16, color: '#22c55e', fontWeight: '600' },
  addressCard: { flexDirection: 'row', gap: 12, backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  addressInfo: { flex: 1 },
  addressLabel: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  addressText: { fontSize: 14, color: '#666', marginBottom: 2 },
  summaryCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  restaurantName: { fontSize: 16, fontWeight: 'bold', color: '#111', marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 8 },
  itemQty: { fontSize: 14, fontWeight: '600', color: '#22c55e', minWidth: 24 },
  itemName: { fontSize: 14, color: '#333', flex: 1 },
  itemPrice: { fontSize: 14, fontWeight: '500', color: '#111' },
  textArea: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12, padding: 12, fontSize: 16, minHeight: 100 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 16, color: '#111', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#22c55e' },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  placeOrderBtn: { backgroundColor: '#22c55e', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  placeOrderBtnDisabled: { backgroundColor: '#86efac' },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  placeOrderPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
