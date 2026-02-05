export interface FileInterface {
  _id: string;
  name: string;
  originalName: string;
  extension: string;
  campaignId: string | null;
  url: string;
  width: number | null;
  height: number | null;
  createdAt: Date;
  updatedAt: Date;
}
