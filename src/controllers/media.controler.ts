import { Request, Response } from 'express';
import pool from '../database';
import pool1 from '../database1';
import fileUpload, { UploadedFile } from 'express-fileupload'
import { RowDataPacket, OkPacket } from 'mysql2';
import fs from 'fs';
import path from 'path';

class MediaController {

    public async Upload(req: Request, res: Response): Promise<void>{
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(404).json({ message:'No se ha encontrado ningún archivo.'});
        }
        const img = req.files!.img as UploadedFile;
        const p = pool1.promise();
        const rows = await p.query('SELECT * FROM imagen WHERE urlimg LIKE ?',[`/media/${img.name}`]);
        if(rows.length) {
            const a = Math.random();
            img.mv('./media/' +a+img.name, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({message: 'Error al subir el archivo.'});
                }
                res.json({ status: 'ok', url: `/media/${a+img.name}` });
            });
        }else{
            img.mv('./media/' + img.name, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(404).json({message: 'Error al subir el archivo.'});
                }
                res.json({ status: 'ok', url: `/media/${img.name}` });
            });
        }
    }

    public async ImageBase64(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        await pool.query('SELECT* FROM imagen WHERE idimagen = ?', [ id ], (err, result) => {
            if(err) throw err;
            if(result.length){
                const imageUrl = `./${result[0].urlimg}`;
                const mimeType = `image/${path.extname(result[0].urlimg).split('.').pop()}`;
                const base64Image = `data:${mimeType};base64,${imageToBase64(imageUrl)}`;
                return res.json({
                    image: base64Image
                });
            }
        res.status(404).json({text: 'Imagen no existe'});
        });
    }

    
}

function imageToBase64(filePath: any) {
    try {
        console.log(filePath);
      // Leer el archivo de imagen como un buffer
      const imageBuffer = fs.readFileSync(filePath);
  
      // Convertir el buffer a base64
      const base64String = imageBuffer.toString('base64');
  
      return base64String;
    } catch (error) {
      console.error('Error al leer el archivo de imagen:', error);
      return null;
    }
  }

export const mediaController = new MediaController;