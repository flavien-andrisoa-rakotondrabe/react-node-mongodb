import { body } from 'express-validator';
import { imageMimeTypes } from '@/utils/constants';

export const createCampaignValidation = [
  body('name').trim().notEmpty().withMessage('name required'),
  body('advertiser').trim().notEmpty().withMessage('advertiser required'),
  body('budget').isNumeric().withMessage('budget must be a number').toFloat(),
  body('startDate')
    .trim()
    .notEmpty()
    .withMessage('startDate required')
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .toDate(),
  body('endDate')
    .trim()
    .notEmpty()
    .withMessage('endDate required')
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
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
