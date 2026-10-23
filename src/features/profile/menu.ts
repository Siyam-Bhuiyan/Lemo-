import { IconName } from '@/components/ui';

export interface MenuItem {
  label: string;
  icon: IconName;
  /** Route to open; omit for screens that are not built yet. */
  href?: '/edit-profile';
}

export interface MenuSectionData {
  title: string;
  items: MenuItem[];
}

export const accountSection: MenuSectionData = {
  title: 'Account',
  items: [
    { label: 'My Profile', icon: 'account-outline', href: '/edit-profile' },
    { label: 'My Vehicle', icon: 'car-estate' },
    { label: 'Documents', icon: 'card-account-details-outline' },
    { label: 'Earnings & Payouts', icon: 'cash-multiple' },
    { label: 'Payout Methods', icon: 'bank-outline' },
    { label: 'Change Password', icon: 'shield-lock-outline' },
  ],
};

export const preferencesSection: MenuSectionData = {
  title: 'Preferences',
  items: [
    { label: 'Journey Preferences', icon: 'tune-variant' },
    { label: 'Availability Schedule', icon: 'calendar-clock-outline' },
    { label: 'Notification Preferences', icon: 'bell-outline' },
    { label: 'Email Preferences', icon: 'email-outline' },
  ],
};

export const supportSection: MenuSectionData = {
  title: 'Support',
  items: [
    { label: 'Help & Support', icon: 'headset' },
    { label: 'FAQs', icon: 'help-circle-outline' },
  ],
};

export const legalSection: MenuSectionData = {
  title: 'Legal',
  items: [
    { label: 'Privacy Policy', icon: 'scale-balance' },
    { label: 'Terms of Service', icon: 'file-document-check-outline' },
    { label: 'Driver Agreement', icon: 'handshake-outline' },
  ],
};
