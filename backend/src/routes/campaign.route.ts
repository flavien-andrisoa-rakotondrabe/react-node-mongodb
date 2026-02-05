import { Router } from 'express';
import { upload } from '@/utils/multer';

import { createCampaign } from '@/controllers/campaign.controller';
import { createCampaignValidation } from '@/validations/campaign.validation';

const router = Router();

router.post(
  '/',
  upload.single('file'),
  createCampaignValidation,
  createCampaign,
);

export default router;
