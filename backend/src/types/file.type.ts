import { Types } from 'mongoose';

export interface FileInterface {
  _id: Types.ObjectId;
  name: string;
  originalName: string;
  extension: string;
  campaignId: Types.ObjectId | null;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}
