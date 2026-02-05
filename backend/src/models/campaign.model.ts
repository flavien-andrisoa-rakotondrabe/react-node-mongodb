import { Schema, model } from 'mongoose';
import { CampaignStatusType } from '@/types/campaign.type';

const campaignSchema = new Schema<CampaignStatusType>(
  {
    name: { type: String, required: true },
    advertiser: { type: String, required: true },
    budget: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['active', 'paused', 'finished'],
      default: 'active',
    },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const CampaignModel = model<CampaignStatusType>(
  'Campaign',
  campaignSchema,
);
