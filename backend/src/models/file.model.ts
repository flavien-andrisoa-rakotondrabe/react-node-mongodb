import { Schema, model } from 'mongoose';
import { FileInterface } from '@/types/file.type';

const fileSchema = new Schema<FileInterface>(
  {
    name: { type: String, required: true },
    originalName: { type: String, default: '' },
    extension: { type: String, required: true },
    url: { type: String, required: true },
    campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', default: null },
  },
  { timestamps: true },
);

export const FileModel = model<FileInterface>('File', fileSchema);
