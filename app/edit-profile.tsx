import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { useAuthStore } from '@/store/useAuthStore';
import { updateProfile } from '@/lib/auth';

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, setProfile } = useAuthStore();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
    }
  }, [profile]);

  async function handleSave() {
    if (!profile) return;

    if (!fullName.trim()) {
      Alert.alert('Error', 'Full name is required');
      return;
    }

    setSaving(true);

    try {
      const updated = await updateProfile(profile.id, {
        full_name: fullName.trim(),
        phone: phone.trim() || null,
      });

      setProfile(updated);
      Alert.alert('Success', 'Profile updated successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">Edit Profile</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 p-4">
          <View className="bg-gray-50 rounded-xl p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-1">Email</Text>
            <Text className="text-lg text-gray-900">{profile?.email}</Text>
            <Text className="text-xs text-gray-500 mt-1">
              Email cannot be changed
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </Text>
            <TextInput
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="John Doe"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </Text>
            <TextInput
              className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>

        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity
            className={`py-4 rounded-xl items-center ${
              saving ? 'bg-primary-300' : 'bg-primary-500'
            }`}
            onPress={handleSave}
            disabled={saving}
          >
            <Text className="text-white font-semibold text-lg">
              {saving ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
