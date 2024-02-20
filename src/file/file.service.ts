import { Injectable } from '@nestjs/common';
import { FileElementResponse } from './file-element.response';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as sharp from 'sharp';
import { MFile } from './mfile.class';

@Injectable()
export class FileService {
  async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
    const uploadFolder = `${path}/uploads/`;
    await ensureDir(uploadFolder);

    const res: FileElementResponse[] = [];
    for (const file of files) {
      await writeFile(`uploads/${file.originalname}`, file.buffer);
      res.push({
        url: file.originalname,
        name: file.originalname,
      });
    }

    return res;
  }

  converptToWebP(file: Buffer): Promise<Buffer> {
    return sharp(file).resize(500).webp().toBuffer();
  }
}
