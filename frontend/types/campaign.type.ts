import { FileInterface } from '@/types/file.type';

export type CampaignStatusType = 'active' | 'paused' | 'finished';

export interface CampaignInterface {
  _id: string;
  name: string;
  advertiser: string;
  image: string;
  budget: number;
  startDate: Date;
  endDate: Date;
  status: CampaignStatusType;
  impressions: number;
  clicks: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface CampaignDataInterface extends CampaignInterface {
  files: FileInterface[];
}
