import FileService from "../services/file.service.js";

class FileController {
    async createFile(req, res, next) {
        try {
            res.json({
                url: `/uploads/${req.file.originalname}`,
            });
        } catch (e) {
            next(e);
        }
    }

    async deleteFile(req, res, next) {
        try {
            const fileName = req.params.fileName;
            await FileService.deleteFile(fileName);
            res.json({
                message: "success",
            });
        } catch (e) {
            next(e);
        }
    }
}

export default new FileController();
