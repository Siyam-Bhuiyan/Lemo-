import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Screen, SegmentedControl } from '@/components/ui';
import { mockThreads } from '@/data/messages';
import { ThreadCard } from '@/features/messages/components/ThreadCard';
import { TAB_BAR_HEIGHT } from '@/theme';

type Tab = 'active' | 'archived';

export default function MessagesScreen() {
  const [tab, setTab] = useState<Tab>('active');
  const threads = tab === 'active' ? mockThreads : [];

  return (
    <Screen bottomInset={TAB_BAR_HEIGHT + 50}>
      <View style={styles.header}>
        <IconButton icon="filter-variant" size={56} />
        <SegmentedControl
          value={tab}
          onChange={setTab}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'archived', label: 'Archived' },
          ]}
        />
        <IconButton icon="magnify" size={56} />
      </View>
      <View style={styles.list}>
        {threads.map((t, i) => (
          <ThreadCard key={t.id} thread={t} highlighted={i === 0} />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 18 },
  list: { minHeight: 200 },
});
