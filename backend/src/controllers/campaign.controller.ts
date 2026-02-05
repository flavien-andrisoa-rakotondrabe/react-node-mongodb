import path from 'path';

import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getBaseUrl } from '@/utils/functions';
import { FileModel } from '@/models/file.model';
import { CampaignModel } from '@/models/campaign.model';
import { saveFileLocally } from '@/utils/fileUpload';

import { FileInterface } from '@/types/file.type';
import { CampaignInterface } from '@/types/campaign.type';

type CreateCampaignResponse = {
  campaign: CampaignInterface & { file: FileInterface | null };
};

export const createCampaign = async (
  req: Request,
  res: Response<
    | CreateCampaignResponse
    | { errors: any[] }
    | { error: string }
    | { unknownError: any }
  >,
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const body = req.body as {
      name: string;
      advertiser: string;
      budget: number;
      startDate: Date;
      endDate: Date;
    };

    const campaign = await CampaignModel.create(body);

    let file: FileInterface | null = null;

    if (req.file) {
      const extension = path.extname(req.file.originalname);
      const fileName = `campaign-${campaign.id}-${randomUUID()}${extension}`;

      const relativePath = saveFileLocally(
        req.file,
        'files/campaign',
        fileName,
      );

      const baseUrl = getBaseUrl(req);

      file = await FileModel.create({
        name: fileName,
        extension,
        originalName: req.file.originalname,
        url: `${baseUrl}${relativePath}`,
        campaignId: campaign.id,
      });
    }

    const campaignData = (campaign as any).toObject() as CampaignInterface;
    const fileData = file ? ((file as any).toObject() as FileInterface) : null;

    res.status(200).json({
      campaign: {
        ...campaignData,
        file: fileData,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};
