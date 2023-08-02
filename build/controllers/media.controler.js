"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaController = void 0;
const database_1 = __importDefault(require("../database"));
const database1_1 = __importDefault(require("../database1"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class MediaController {
    Upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(404).json({ message: 'No se ha encontrado ningún archivo.' });
            }
            const img = req.files.img;
            const p = database1_1.default.promise();
            const rows = yield p.query('SELECT * FROM imagen WHERE urlimg LIKE ?', [`/media/${img.name}`]);
            if (rows.length) {
                const a = Math.random();
                img.mv('./media/' + a + img.name, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(404).json({ message: 'Error al subir el archivo.' });
                    }
                    res.json({ status: 'ok', url: `/media/${a + img.name}` });
                });
            }
            else {
                img.mv('./media/' + img.name, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(404).json({ message: 'Error al subir el archivo.' });
                    }
                    res.json({ status: 'ok', url: `/media/${img.name}` });
                });
            }
        });
    }
    ImageBase64(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('SELECT* FROM imagen WHERE idimagen = ?', [id], (err, result) => {
                if (err)
                    throw err;
                if (result.length) {
                    const imageUrl = `./${result[0].urlimg}`;
                    const mimeType = `image/${path_1.default.extname(result[0].urlimg).split('.').pop()}`;
                    const base64Image = `data:${mimeType};base64,${imageToBase64(imageUrl)}`;
                    return res.json({
                        image: base64Image
                    });
                }
                res.status(404).json({ text: 'Imagen no existe' });
            });
        });
    }
}
function imageToBase64(filePath) {
    try {
        console.log(filePath);
        // Leer el archivo de imagen como un buffer
        const imageBuffer = fs_1.default.readFileSync(filePath);
        // Convertir el buffer a base64
        const base64String = imageBuffer.toString('base64');
        return base64String;
    }
    catch (error) {
        console.error('Error al leer el archivo de imagen:', error);
        return null;
    }
}
exports.mediaController = new MediaController;
