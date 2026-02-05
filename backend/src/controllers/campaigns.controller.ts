import sharp from 'sharp';

import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getBaseUrl } from '@/lib/functions';
import { FileModel } from '@/models/file.model';
import { CampaignModel } from '@/models/campaign.model';
import { saveFileLocally } from '@/lib/fileUpload';

import { FileInterface } from '@/types/file.type';
import {
  CampaignDataInterface,
  CampaignInterface,
} from '@/types/campaign.type';

export const getAll = async (
  req: Request,
  res: Response<
    | { campaigns: CampaignDataInterface[] }
    | { errors: any[] }
    | { error: string }
    | { unknownError: any }
  >,
): Promise<void> => {
  try {
    const campaignsRaw = await CampaignModel.find()
      .populate('files')
      .sort({ updatedAt: -1 });

    const campaigns = campaignsRaw.map((c) =>
      c.toObject(),
    ) as unknown as CampaignDataInterface[];

    res.status(200).json({ campaigns });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

export const getById = async (
  req: Request,
  res: Response<
    | { campaign: CampaignDataInterface }
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

    const { campaignId } = req.params;

    const campaignDoc =
      await CampaignModel.findById(campaignId).populate('files');

    if (!campaignDoc) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    const campaign = campaignDoc.toObject() as unknown as CampaignDataInterface;

    res.status(200).json({ campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

export const updateStatusById = async (
  req: Request,
  res: Response<
    | { campaign: Partial<CampaignDataInterface> }
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

    const { campaignId } = req.params;
    const { status } = req.body;

    const campaign = await CampaignModel.findByIdAndUpdate(
      campaignId,
      { status },
      { new: true, runValidators: true },
    ).select('_id status');

    if (!campaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }

    res.status(200).json({ campaign });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ unknownError: error });
    }
  }
};

export const createCampaign = async (
  req: Request,
  res: Response<
    | { campaign: CampaignDataInterface }
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
      const metadata = await sharp(req.file.buffer).metadata();

      const width = metadata.width ?? null;
      const height = metadata.height ?? null;

      const extension = `.${metadata.format}`;
      const fileName = `campaign-${campaign.id}-${randomUUID()}.${extension}`;

      const relativePath = saveFileLocally(
        req.file,
        'files/images/campaigns',
        fileName,
      );

      const baseUrl = getBaseUrl(req);

      file = await FileModel.create({
        name: fileName,
        extension,
        originalName: req.file.originalname,
        url: `${baseUrl}${relativePath}`,
        width,
        height,
        campaignId: campaign.id,
      });
    }

    const campaignData = (campaign as any).toObject() as CampaignInterface;
    const filesArray = file ? [(file as any).toObject()] : [];

    res.status(200).json({
      campaign: {
        ...campaignData,
        files: filesArray,
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
