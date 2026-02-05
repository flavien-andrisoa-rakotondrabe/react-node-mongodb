import { body, param } from 'express-validator';
import { imageMimeTypes } from '@/lib/constants';

export const getCampaignByIdValidation = [
  param('campaignId')
    .notEmpty()
    .withMessage('campaignId requis')
    .isMongoId()
    .withMessage('campaignId invalide'),
];

export const updateCampaignStatusByIdValidation = [
  param('campaignId')
    .notEmpty()
    .withMessage('campaignId requis')
    .isMongoId()
    .withMessage('campaignId invalide'),
  body('status')
    .trim()
    .notEmpty()
    .withMessage('Le statut est requis')
    .isIn(['active', 'paused', 'finished'])
    .withMessage('Le statut doit être : active, paused ou finished'),
];

export const createCampaignValidation = [
  body('name').trim().notEmpty().withMessage('name required'),
  body('advertiser').trim().notEmpty().withMessage('advertiser required'),
  body('budget').isNumeric().withMessage('budget must be a number').toFloat(),
  body('startDate')
    .trim()
    .notEmpty()
    .withMessage('startDate required')
    .isISO8601()
    .withMessage('Format ISO8601 required')
    .toDate(),
  body('endDate')
    .trim()
    .notEmpty()
    .withMessage('endDate required')
    .isISO8601()
    .withMessage('Format ISO8601 required')
    .toDate()
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('endDate must be after startDate');
      }
      return true;
    }),
  body('file').custom((value, { req }) => {
    if (!req.file) {
      return true;
    }

    if (!imageMimeTypes.includes(req.file.mimetype)) {
      throw new Error('Invalid file type');
    }

    return true;
  }),
];
