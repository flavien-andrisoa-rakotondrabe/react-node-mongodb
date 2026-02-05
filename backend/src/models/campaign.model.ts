import { Schema, model } from 'mongoose';
import { CampaignInterface } from '@/types/campaign.type';

const campaignSchema = new Schema<CampaignInterface>(
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

campaignSchema.virtual('files', {
  ref: 'File',
  localField: '_id',
  foreignField: 'campaignId',
  justOne: false,
});

export const CampaignModel = model<CampaignInterface>(
  'Campaign',
  campaignSchema,
);
