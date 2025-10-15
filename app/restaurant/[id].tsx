import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, Plus } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Restaurant, MenuItem } from '@/types/database';
import { useCartStore } from '@/store/useCartStore';
import AddToCartModal from '@/components/AddToCartModal';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      const [restData, menuData] = await Promise.all([
        supabase.from('restaurants').select('*').eq('id', id).single(),
        supabase.from('menu_items').select('*').eq('restaurant_id', id).eq('is_available', true).order('category')
      ]);
      if (restData.data) setRestaurant(restData.data);
      if (menuData.data) setMenuItems(menuData.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  function openAddToCartModal(item: MenuItem) {
    setSelectedItem(item);
    setModalVisible(true);
  }

  function handleAddToCart(quantity: number, specialRequests: string) {
    if (!restaurant || !selectedItem) return;

    addItem(
      {
        menu_item: selectedItem,
        quantity,
        special_requests: specialRequests || undefined,
      },
      restaurant
    );

    Alert.alert('Added to Cart', `${selectedItem.name} has been added to your cart`);
  }

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  if (loading) {
    return <SafeAreaView style={s.container}><View style={s.center}><ActivityIndicator size="large" color="#22c55e" /></View></SafeAreaView>;
  }

  if (!restaurant) return null;

  return (
    <SafeAreaView style={s.container}>
      <TouchableOpacity style={s.back} onPress={() => router.back()}>
        <View style={s.backCircle}><ArrowLeft size={24} color="#000" /></View>
      </TouchableOpacity>
      <ScrollView>
        <Image source={{ uri: restaurant.image_url || '' }} style={s.hero} />
        <View style={s.content}>
          <View style={s.header}>
            <Text style={s.name}>{restaurant.name}</Text>
            <View style={s.badge}>
              <Star size={16} color="#22c55e" fill="#22c55e" />
              <Text style={s.rating}>{restaurant.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={s.cuisine}>{restaurant.cuisine_type}</Text>
          {restaurant.description && <Text style={s.desc}>{restaurant.description}</Text>}
          {Object.entries(groupedItems).map(([cat, items]) => (
            <View key={cat} style={s.section}>
              <Text style={s.catTitle}>{cat}</Text>
              {items.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={s.item}
                  onPress={() => openAddToCartModal(item)}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: item.image_url || '' }} style={s.img} />
                  <View style={s.info}>
                    <Text style={s.itemName}>{item.name}</Text>
                    {item.description && <Text style={s.itemDesc} numberOfLines={2}>{item.description}</Text>}
                    <View style={s.priceRow}>
                      <Text style={s.price}>${Number(item.price).toFixed(2)}</Text>
                      <View style={s.addBtn}>
                        <Plus size={20} color="#22c55e" />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      <AddToCartModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddToCart}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  back: { position: 'absolute', top: 48, left: 16, zIndex: 10 },
  backCircle: { width: 40, height: 40, backgroundColor: '#fff', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', height: 256 },
  content: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  name: { fontSize: 24, fontWeight: 'bold', color: '#111', flex: 1 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  rating: { color: '#15803d', fontWeight: '600', marginLeft: 4 },
  cuisine: { fontSize: 16, color: '#666', marginBottom: 16 },
  desc: { fontSize: 16, color: '#333', marginBottom: 16 },
  section: { marginBottom: 24 },
  catTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  item: { flexDirection: 'row', backgroundColor: '#f9fafb', borderRadius: 12, padding: 12, marginBottom: 12 },
  img: { width: 96, height: 96, borderRadius: 8 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  itemName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  itemDesc: { fontSize: 14, color: '#666', marginBottom: 8 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 16, fontWeight: 'bold', color: '#22c55e' },
  addBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
});
