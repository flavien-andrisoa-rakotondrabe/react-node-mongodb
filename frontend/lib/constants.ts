import { CampaignStatusType } from '@/types/campaign.type';

export const imageMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/svg',
  'image/jfif',
  'image/heif',
];

export const campaignStatus: { label: string; value: CampaignStatusType }[] = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Pause',
    value: 'paused',
  },
  {
    label: 'Fini',
    value: 'finished',
  },
];
