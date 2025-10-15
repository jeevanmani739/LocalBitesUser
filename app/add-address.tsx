import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/useAuthStore';

export default function AddAddressScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [label, setLabel] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!user) return;

    if (!label.trim() || !streetAddress.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setSaving(true);

    try {
      if (isDefault) {
        await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
      }

      const { error } = await supabase.from('addresses').insert({
        user_id: user.id,
        label: label.trim(),
        street_address: streetAddress.trim(),
        city: city.trim(),
        state: state.trim(),
        zip_code: zipCode.trim(),
        is_default: isDefault,
      });

      if (error) throw error;

      Alert.alert('Success', 'Address added successfully', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error: any) {
      console.error('Error adding address:', error);
      Alert.alert('Error', error.message || 'Failed to add address');
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={s.title}>Add Address</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s.flex}
      >
        <ScrollView style={s.content} contentContainerStyle={s.scrollContent}>
          <View style={s.inputGroup}>
            <Text style={s.label}>Label *</Text>
            <TextInput
              style={s.input}
              placeholder="e.g., Home, Work, Office"
              value={label}
              onChangeText={setLabel}
              autoCapitalize="words"
            />
          </View>

          <View style={s.inputGroup}>
            <Text style={s.label}>Street Address *</Text>
            <TextInput
              style={s.input}
              placeholder="123 Main Street"
              value={streetAddress}
              onChangeText={setStreetAddress}
              autoCapitalize="words"
            />
          </View>

          <View style={s.inputGroup}>
            <Text style={s.label}>City *</Text>
            <TextInput
              style={s.input}
              placeholder="San Francisco"
              value={city}
              onChangeText={setCity}
              autoCapitalize="words"
            />
          </View>

          <View style={s.row}>
            <View style={[s.inputGroup, s.flex]}>
              <Text style={s.label}>State *</Text>
              <TextInput
                style={s.input}
                placeholder="CA"
                value={state}
                onChangeText={setState}
                autoCapitalize="characters"
                maxLength={2}
              />
            </View>

            <View style={[s.inputGroup, s.flex]}>
              <Text style={s.label}>ZIP Code *</Text>
              <TextInput
                style={s.input}
                placeholder="94105"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
          </View>

          <TouchableOpacity
            style={s.checkboxRow}
            onPress={() => setIsDefault(!isDefault)}
          >
            <View style={[s.checkbox, isDefault && s.checkboxActive]}>
              {isDefault && <View style={s.checkmark} />}
            </View>
            <Text style={s.checkboxLabel}>Set as default address</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={s.footer}>
          <TouchableOpacity
            style={[s.saveBtn, saving && s.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={s.saveBtnText}>{saving ? 'Saving...' : 'Save Address'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  backBtn: { marginRight: 12 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  flex: { flex: 1 },
  content: { flex: 1 },
  scrollContent: { padding: 16 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 12, padding: 12, fontSize: 16 },
  row: { flexDirection: 'row', gap: 12 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#d1d5db', alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { borderColor: '#22c55e', backgroundColor: '#22c55e' },
  checkmark: { width: 12, height: 12, backgroundColor: '#fff', borderRadius: 2 },
  checkboxLabel: { fontSize: 16, color: '#333' },
  footer: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  saveBtn: { backgroundColor: '#22c55e', borderRadius: 12, padding: 16, alignItems: 'center' },
  saveBtnDisabled: { backgroundColor: '#86efac' },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
