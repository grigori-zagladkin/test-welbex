import { PostService } from "../services/post.service";

export class PostController {
    async createPost(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
            }
            const { id } = req.userData;
            const { content, media } = req.body;
            const postData = await PostService.createPost(content, media, id);
            res.json(postData);
        } catch (e) {
            next(e);
        }
    }
    async getAllPost(req, res, next) {}

    async getPostById() {}

    async updatePost() {}

    async deletePost() {}
}
