import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ShoppingBag, Minus, Plus, X, MapPin } from 'lucide-react-native';
import { useCartStore } from '@/store/useCartStore';

export default function CartScreen() {
  const router = useRouter();
  const { items, restaurant, removeItem, updateQuantity, updateSpecialRequests, getTotal, clearCart } = useCartStore();

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

  const subtotal = getTotal();
  const deliveryFee = restaurant?.delivery_fee || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  function handleQuantityChange(itemId: string, newQuantity: number) {
    if (newQuantity === 0) {
      Alert.alert(
        'Remove Item',
        'Remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removeItem(itemId) }
        ]
      );
    } else {
      updateQuantity(itemId, newQuantity);
    }
  }

  function handleCheckout() {
    if (items.length === 0) return;
    router.push('/checkout');
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={() => {
            Alert.alert(
              'Clear Cart',
              'Remove all items from your cart?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: clearCart }
              ]
            );
          }}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {restaurant && (
          <View style={styles.restaurantCard}>
            <MapPin size={20} color="#666" />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine_type}</Text>
            </View>
          </View>
        )}

        <View style={styles.itemsSection}>
          {items.map((item) => (
            <View key={item.menu_item.id} style={styles.cartItem}>
              <Image source={{ uri: item.menu_item.image_url || '' }} style={styles.itemImage} />

              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName}>{item.menu_item.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.menu_item.id)}
                    style={styles.removeBtn}
                  >
                    <X size={18} color="#666" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemPrice}>${Number(item.menu_item.price).toFixed(2)} each</Text>

                {item.special_requests && (
                  <Text style={styles.specialRequests}>{item.special_requests}</Text>
                )}

                <View style={styles.itemFooter}>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => handleQuantityChange(item.menu_item.id, item.quantity - 1)}
                    >
                      <Minus size={16} color="#666" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityBtn}
                      onPress={() => handleQuantityChange(item.menu_item.id, item.quantity + 1)}
                    >
                      <Plus size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemTotal}>
                    ${(Number(item.menu_item.price) * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>
              {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Text style={styles.checkoutPrice}>${total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 30, fontWeight: 'bold', color: '#111' },
  clearText: { fontSize: 16, color: '#ef4444', fontWeight: '600' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emptyText: { fontSize: 18, color: '#9ca3af', textAlign: 'center', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  content: { flex: 1 },
  restaurantCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', margin: 16, marginBottom: 8, padding: 16, borderRadius: 12, gap: 12 },
  restaurantInfo: { flex: 1 },
  restaurantName: { fontSize: 18, fontWeight: 'bold', color: '#111', marginBottom: 4 },
  restaurantCuisine: { fontSize: 14, color: '#666' },
  itemsSection: { paddingHorizontal: 16 },
  cartItem: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12, gap: 12 },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#111', flex: 1 },
  removeBtn: { padding: 4 },
  itemPrice: { fontSize: 14, color: '#666', marginBottom: 4 },
  specialRequests: { fontSize: 12, color: '#666', fontStyle: 'italic', marginBottom: 8 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  quantityBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' },
  quantityText: { fontSize: 16, fontWeight: '600', color: '#111', minWidth: 24, textAlign: 'center' },
  itemTotal: { fontSize: 16, fontWeight: 'bold', color: '#22c55e' },
  summary: { backgroundColor: '#fff', margin: 16, padding: 16, borderRadius: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryValue: { fontSize: 16, color: '#111', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 12, marginTop: 4, marginBottom: 0 },
  totalLabel: { fontSize: 18, fontWeight: 'bold', color: '#111' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#22c55e' },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  checkoutBtn: { backgroundColor: '#22c55e', borderRadius: 12, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  checkoutPrice: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
