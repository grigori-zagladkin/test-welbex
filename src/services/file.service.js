import { remove } from "fs-extra";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileService {
    async deleteFile(fileName) {
        await remove(`uploads/${fileName}`);
    }
}

export default new FileService();
