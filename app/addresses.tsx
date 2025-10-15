import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Plus, Check } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';
import { Address } from '@/types/database';

export default function AddressesScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

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
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error) {
      console.error('Error loading addresses:', error);
      Alert.alert('Error', 'Failed to load addresses');
    } finally {
      setLoading(false);
    }
  }

  async function setDefaultAddress(addressId: string) {
    if (!user) return;

    try {
      await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);

      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addressId);

      if (error) throw error;

      await loadAddresses();
      Alert.alert('Success', 'Default address updated');
    } catch (error) {
      console.error('Error setting default:', error);
      Alert.alert('Error', 'Failed to update default address');
    }
  }

  async function deleteAddress(addressId: string) {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('addresses')
                .delete()
                .eq('id', addressId);

              if (error) throw error;

              await loadAddresses();
              Alert.alert('Success', 'Address deleted');
            } catch (error) {
              console.error('Error deleting address:', error);
              Alert.alert('Error', 'Failed to delete address');
            }
          }
        }
      ]
    );
  }

  function renderAddress({ item }: { item: Address }) {
    return (
      <View style={s.addressCard}>
        <View style={s.cardHeader}>
          <View style={s.labelRow}>
            <MapPin size={20} color="#22c55e" />
            <Text style={s.label}>{item.label}</Text>
            {item.is_default && (
              <View style={s.defaultBadge}>
                <Text style={s.defaultText}>Default</Text>
              </View>
            )}
          </View>
        </View>

        <Text style={s.address}>{item.street_address}</Text>
        <Text style={s.address}>
          {item.city}, {item.state} {item.zip_code}
        </Text>

        <View style={s.actions}>
          {!item.is_default && (
            <TouchableOpacity
              style={s.actionBtn}
              onPress={() => setDefaultAddress(item.id)}
            >
              <Check size={16} color="#22c55e" />
              <Text style={s.actionText}>Set as Default</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[s.actionBtn, s.deleteBtn]}
            onPress={() => deleteAddress(item.id)}
          >
            <Text style={s.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text style={s.title}>My Addresses</Text>
        </View>
        <View style={s.center}>
          <ActivityIndicator size="large" color="#22c55e" />
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
        <Text style={s.title}>My Addresses</Text>
        <TouchableOpacity onPress={() => router.push('/add-address')} style={s.addBtn}>
          <Plus size={24} color="#22c55e" />
        </TouchableOpacity>
      </View>

      {addresses.length === 0 ? (
        <View style={s.center}>
          <MapPin size={64} color="#d1d5db" />
          <Text style={s.emptyText}>No addresses yet</Text>
          <Text style={s.subtitle}>Add an address to start ordering</Text>
          <TouchableOpacity
            style={s.button}
            onPress={() => router.push('/add-address')}
          >
            <Text style={s.buttonText}>Add Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderAddress}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.list}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn: { marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111', flex: 1 },
  addBtn: { padding: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  emptyText: { fontSize: 18, color: '#9ca3af', marginTop: 16 },
  subtitle: { fontSize: 14, color: '#d1d5db', textAlign: 'center' },
  button: { backgroundColor: '#22c55e', padding: 12, paddingHorizontal: 24, borderRadius: 12, marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  list: { padding: 16 },
  addressCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  cardHeader: { marginBottom: 12 },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#111', flex: 1 },
  defaultBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  defaultText: { color: '#15803d', fontSize: 12, fontWeight: '600' },
  address: { fontSize: 16, color: '#666', marginBottom: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#f0fdf4' },
  actionText: { fontSize: 14, color: '#22c55e', fontWeight: '600' },
  deleteBtn: { backgroundColor: '#fee2e2' },
  deleteText: { fontSize: 14, color: '#ef4444', fontWeight: '600' },
});
