import fs from 'fs';
import path from 'path';

export const saveFileLocally = (
  file: Express.Multer.File,
  subFolder: string,
  customName: string,
) => {
  const uploadsBase = path.join(process.cwd(), 'uploads');
  const directoryPath = path.join(uploadsBase, subFolder);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const filePath = path.join(directoryPath, customName);
  fs.writeFileSync(filePath, file.buffer);

  return `/uploads/${subFolder}/${customName}`.replace(/\\/g, '/');
};
