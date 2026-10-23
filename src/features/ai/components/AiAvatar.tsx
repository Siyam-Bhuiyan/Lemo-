import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from '@/components/ui';

export function AiAvatar({ size = 46 }: { size?: number }) {
  return (
    <LinearGradient
      colors={['#6aa7ff', '#3b6fe0']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ width: size, height: size, borderRadius: size / 2, alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon name="account-star-outline" size={size * 0.58} color="#fff" />
    </LinearGradient>
  );
}
