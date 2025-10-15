import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { Order, Restaurant } from '@/types/database';

type OrderWithRestaurant = Order & {
  restaurant: Restaurant;
};

export default function ReviewScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuthStore();

  const [order, setOrder] = useState<OrderWithRestaurant | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  async function loadOrder() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurant:restaurants(*)
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

  async function handleSubmit() {
    if (!user || !order) return;

    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          customer_id: user.id,
          order_id: order.id,
          restaurant_id: order.restaurant_id,
          rating,
          comment: comment.trim() || null,
        });

      if (error) throw error;

      Alert.alert(
        'Thank You!',
        'Your review has been submitted successfully',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      if (error.code === '23505') {
        Alert.alert('Error', 'You have already reviewed this order');
      } else {
        Alert.alert('Error', error.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !order) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#22c55e" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Leave a Review</Text>
      </View>

      <View className="flex-1 p-4">
        <View className="bg-gray-50 rounded-xl p-4 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {order.restaurant.name}
          </Text>
          <Text className="text-gray-600">
            Order #{order.id.slice(0, 8)}
          </Text>
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            How was your order?
          </Text>
          <View className="flex-row justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                className="p-2"
              >
                <Star
                  size={40}
                  color={star <= rating ? '#22c55e' : '#d1d5db'}
                  fill={star <= rating ? '#22c55e' : 'transparent'}
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text className="text-center text-gray-600 mt-2">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </Text>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">
            Tell us more (Optional)
          </Text>
          <TextInput
            className="w-full px-4 py-3 border border-gray-300 rounded-xl h-32"
            placeholder="Share your experience with this restaurant..."
            value={comment}
            onChangeText={setComment}
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          className={`py-4 rounded-xl items-center ${
            submitting || rating === 0 ? 'bg-gray-300' : 'bg-primary-500'
          }`}
          onPress={handleSubmit}
          disabled={submitting || rating === 0}
        >
          <Text className="text-white font-semibold text-lg">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
