import { Request } from 'express';

export const getBaseUrl = (req: Request) => {
  return `${req.protocol}://${req.get('host')}`;
};
