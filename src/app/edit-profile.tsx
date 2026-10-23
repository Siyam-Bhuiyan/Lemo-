import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { BottomActionBar } from '@/components/layout/BottomActionBar';
import { ScreenHeader } from '@/components/layout/ScreenHeader';
import { AppText, Button, Screen, TextField } from '@/components/ui';
import { mockDriver } from '@/data/driver';
import { AvatarPicker } from '@/features/profile/components/AvatarPicker';
import { NameFields } from '@/features/profile/components/NameFields';

export default function EditProfileScreen() {
  const [form, setForm] = useState({ ...mockDriver });
  const set = (key: keyof typeof form) => (value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen bottomInset={120}>
        <ScreenHeader title="My Profile" />
        <AvatarPicker name={`${form.firstName} ${form.lastName}`} />

        <AppText variant="overline" color="textFaint" style={styles.section}>
          Personal Info
        </AppText>

        <View style={styles.fields}>
          <NameFields
            firstName={form.firstName}
            lastName={form.lastName}
            onChangeFirst={set('firstName')}
            onChangeLast={set('lastName')}
          />
          <TextField
            icon="email-outline"
            value={form.email}
            onChangeText={set('email')}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextField
            icon="phone-outline"
            value={form.phone}
            onChangeText={set('phone')}
            keyboardType="phone-pad"
            placeholder="Phone number"
          />
          <TextField
            icon="card-account-details-outline"
            placeholder="Driver License Number"
            value={form.licenseNumber}
            onChangeText={set('licenseNumber')}
          />
          <TextField icon="map-marker-radius-outline" value={form.address} onChangeText={set('address')} />
        </View>
      </Screen>
      <BottomActionBar>
        <Button label="Cancel" variant="danger" style={styles.cancel} onPress={() => router.back()} />
        <Button label="Update Profile" style={styles.primary} onPress={() => router.back()} />
      </BottomActionBar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#000' },
  section: { marginTop: 28, marginBottom: 12, marginLeft: 4 },
  fields: { gap: 12 },
  cancel: { flex: 1 },
  primary: { flex: 1.2 },
});
