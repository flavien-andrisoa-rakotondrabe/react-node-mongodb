import { Types } from 'mongoose';

export type CampaignStatusType = 'active' | 'paused' | 'finished';

export interface CampaignInterface {
  _id: Types.ObjectId;
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
