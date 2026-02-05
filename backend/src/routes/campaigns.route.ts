import { Router } from 'express';
import { upload } from '@/lib/multer';

import {
  createCampaign,
  getAll,
  getById,
  updateStatusById,
} from '@/controllers/campaigns.controller';
import {
  createCampaignValidation,
  getCampaignByIdValidation,
  updateCampaignStatusByIdValidation,
} from '@/validations/campaigns.validation';

const router = Router();

router.post(
  '/',
  upload.single('file'),
  createCampaignValidation,
  createCampaign,
);
router.get('/', getAll);
router.get('/:campaignId', getCampaignByIdValidation, getById);
router.patch(
  '/:campaignId',
  updateCampaignStatusByIdValidation,
  updateStatusById,
);

export default router;
