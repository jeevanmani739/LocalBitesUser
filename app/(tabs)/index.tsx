import { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Star, Clock } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { Restaurant } from '@/types/database';

export default function HomeScreen() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [searchQuery, restaurants]);

  async function loadRestaurants() {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_open', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      setRestaurants(data || []);
      setFilteredRestaurants(data || []);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  function renderRestaurant({ item }: { item: Restaurant }) {
    return (
      <TouchableOpacity
        style={styles.restaurantCard}
        onPress={() => router.push(`/restaurant/${item.id}`)}
      >
        {item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.restaurantImage} resizeMode="cover" />
        ) : (
          <View style={[styles.restaurantImage, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Text style={styles.restaurantName} numberOfLines={1}>{item.name}</Text>
            <View style={styles.ratingBadge}>
              <Star size={14} color="#22c55e" fill="#22c55e" />
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>

          <Text style={styles.cuisineType} numberOfLines={1}>{item.cuisine_type}</Text>

          <View style={styles.deliveryInfo}>
            <View style={styles.deliveryRow}>
              <Clock size={16} color="#6b7280" />
              <Text style={styles.deliveryText}>{item.delivery_time}</Text>
            </View>

            <Text style={styles.deliveryText}>
              {item.delivery_fee === 0 ? 'Free' : `$${item.delivery_fee.toFixed(2)}`} delivery
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>

        <View style={styles.searchContainer}>
          <Search size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or cuisines"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      ) : filteredRestaurants.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No restaurants found' : 'No restaurants available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 16, paddingBottom: 8 },
  title: { fontSize: 30, fontWeight: 'bold', color: '#111', marginBottom: 16 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16 },
  list: { padding: 16 },
  restaurantCard: { backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#f3f4f6' },
  restaurantImage: { width: '100%', height: 192 },
  placeholderImage: { backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#9ca3af' },
  restaurantInfo: { padding: 16 },
  restaurantHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  restaurantName: { fontSize: 20, fontWeight: 'bold', color: '#111', flex: 1 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0fdf4', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  ratingText: { color: '#15803d', fontWeight: '600', marginLeft: 4 },
  cuisineType: { fontSize: 16, color: '#666', marginBottom: 12 },
  deliveryInfo: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  deliveryText: { fontSize: 14, color: '#666' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 18, color: '#9ca3af', textAlign: 'center' },
});
